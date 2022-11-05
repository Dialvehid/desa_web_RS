import { Component, OnInit } from '@angular/core';
import { Post } from './post';
import { HomeService } from './home.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { ModalService } from './post/modal.service';
import { Usuario } from '../login/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private loginService: LoginService, private router: Router, private modalService: ModalService) { }
  titulo: string = "SpaceTime";
  posts: Post[] = [];
  usuario: Usuario;
  nuevoPost: Post = new Post();

  ngOnInit(): void 
  {
    this.homeService.getPosts().subscribe(x => {
      console.log(x);
      
      this.posts = x.posts as Post[];
    });
    
    this.usuario = this.loginService.usuario as Usuario;
    console.log(this.usuario);
    
  }

  darLikePost(idusr1: number, idpst1: number)
  {
    console.log("like jeje");
    
    let post = {
      idusr: idusr1,
      idpst: idpst1
    }
    this.homeService.darLikePost(post).subscribe(response => 
      {
        window.location.reload();
      },
      e => 
      {
        console.log("Se ha producido un error.");
      })
  }



  cerrarSesion()
  {
    console.log("cerrando sesion");
    
    this.loginService.cerrarSesion();
    this.router.navigate(['/login']);
  }

  abrirModal(){
    this.modalService.abrirModal();
  }

}
