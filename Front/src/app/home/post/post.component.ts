import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import Swal from 'sweetalert2';
import { HomeService } from '../home.service';
import { Post } from '../post';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  nuevoPost: Post = new Post();
  fotoSeleccionada: File;


  constructor(public modalService: ModalService, public homeService: HomeService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    
    this.nuevoPost.usuario = this.loginService.usuario;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.nuevoPost.fecha = `${yyyy}-${mm}-${dd}`;
    if (this.nuevoPost.usuario == undefined || this.nuevoPost.usuario == null)
      this.router.navigate(['/login']);
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error seleccionar imagen', 'El archivo debe ser un tipo imagen', 'error');
      this.fotoSeleccionada = null;
      return;
    }
    this.getBase64(this.fotoSeleccionada);
  }

  subirPost() {
    if (!this.fotoSeleccionada && 
      (this.nuevoPost.contenido == null || this.nuevoPost.contenido == '' || this.nuevoPost.contenido == undefined)) 
    {
      Swal.fire('Error', 'Debe seleccionar una foto', 'error');
    } 
    else 
    {
      console.log(this.nuevoPost);
      let postSubir = 
      {
        idusr: this.nuevoPost.usuario.idusr,
        fecha: this.nuevoPost.fecha,
        contenido: this.nuevoPost.contenido,
        img: this.nuevoPost.img
      };
      this.homeService.crearPost(postSubir).subscribe(response => 
      {
        Swal.fire('Perfecto!', 'Has realizado el post correctamente', 'success')
        this.nuevoPost.contenido = '';
        window.location.reload();
        this.cerrarModal()
      },
      e => 
      {
        console.log("Se ha producido un error.");
      })
    }
  }

  
  cerrarModal() 
  {
    this.modalService.cerrarModal();
  }

//   getBase64(file: File, callback) : string | ArrayBuffer{
//     var reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//       return reader.result;
//     };
//     reader.onerror = function (error) {
//       return '';
//     };
//     return reader.result;
//  }

 getBase64(file: File){
  const observable = new Observable((subscriber: Subscriber<any>) => {
    this.readFile(file, subscriber);
  })
  
  observable.subscribe((d) => {
    this.nuevoPost.img = d;
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
