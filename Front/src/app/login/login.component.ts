import { Component, OnInit } from '@angular/core';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioSocial: SocialUser | undefined;
  estaLoggeado: boolean | undefined;

  constructor(private socialAuthService: SocialAuthService) { }

  ngOnInit(): void 
  {
    this.socialAuthService.authState.subscribe((user) => {
      this.usuarioSocial = user;
      this.estaLoggeado = user != null && user != undefined;
    });
  }

  loggearseFacebook() 
  {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  cerrarSesion()
  {
    this.socialAuthService.signOut();
  }

}
