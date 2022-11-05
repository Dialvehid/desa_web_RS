import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginService } from '../login/login.service';
import { Usuario } from '../login/usuario';
import { PerfilService } from './perfil.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  titulo: string = "SpaceTime";
  usuario: Usuario;
  puedeEditar: boolean = false;
  usuarioEditado: Usuario = new Usuario();
  fotoSeleccionada: File;

  constructor(private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute, 
    private perfilService: PerfilService) { }
  
  ngOnInit(): void {
    let usuarioLoggeado = this.loginService.usuario;
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      
      let idUsuario = params['id'];
      console.log(idUsuario);
      
      if (idUsuario)
      {
        this.perfilService.ObtenerDatosUsuario(idUsuario).subscribe((user) => {
          console.log(user);
          
          this.usuario = user[0] as Usuario;
          this.usuarioEditado = user[0] as Usuario;
          
          if (usuarioLoggeado.idusr == this.usuario.idusr)
            this.puedeEditar = true;

          console.log(this.usuario);
  
          if (this.usuario == undefined || this.usuario == null)
            this.router.navigate(['/login']);
        })
      }
      else
      {
        Swal.fire('Error', 'No se ha encontrado el usuario buscado...', 'error')
        this.router.navigate(['/login']);
      }
    })
  }

  actualizarUsuario(){

    

    console.log(this.usuarioEditado);
    this.perfilService.EditarDatosUsuario(this.usuarioEditado).subscribe(x => {
      console.log(x);
      this.usuarioEditado.nombre = '';
      this.usuarioEditado.apodo = '';
      this.usuarioEditado.fechanac = '';
      this.usuarioEditado.correo = '';
      this.usuarioEditado.pswd = '';
      Swal.fire('Usuario creado', 'Usuario creado exitosamente!', 'success');
      window.location.reload();
    }, e => {
      if (e.status == 0)
        Swal.fire('Error', 'No se ha podido obtener respuesta del servidor, intentalo mas tarde', 'error');
    });
  }

  seleccionarFoto(event)
  {
    var datePipe = new DatePipe('en-US');
    let newDate = datePipe.transform('Tue, 07 Nov 2000 00:00:00 GMT', 'yyyy-MM-dd');
    this.usuarioEditado.fechanac = newDate;
    console.log(this.usuarioEditado);
    

    this.fotoSeleccionada = event.target.files[0];
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error seleccionar imagen', 'El archivo debe ser un tipo imagen', 'error');
      this.fotoSeleccionada = null;
      return;
    }
    this.getBase64(this.fotoSeleccionada);
  }

  getBase64(file: File){
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    })
    
    observable.subscribe((d) => {
      this.usuarioEditado.img = d;
    })
  }

  readFile(file: File, subscriber: Subscriber<any>){
    const filereader = new FileReader();
  
    filereader.readAsDataURL(file);
  
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    }
  
    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    }
  }



}
