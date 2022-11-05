import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { PerfilComponent } from './perfil/perfil.component';
import { LandingComponent } from './landing/landing.component';
import { CreadoresComponent } from './creadores/creadores.component';
import { HttpClientModule } from '@angular/common/http';
import { FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { AuthGuard } from './login/guards/auth.guard';
import { BuscadorComponent } from './buscador/buscador.component';
import { FormsModule } from '@angular/forms';
import { PostComponent } from './home/post/post.component';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'perfil/:id', component: PerfilComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'landing', component: LandingComponent },
  { path: 'creadores', component: CreadoresComponent },
  { path: 'buscador', component: BuscadorComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    PerfilComponent,
    LandingComponent,
    CreadoresComponent,
    BuscadorComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatNativeDateModule,
    MatButtonModule,
    HttpClientModule,
    SocialLoginModule,
    FormsModule,
    MatFormFieldModule
  ],
  providers: [
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '836988727472126'
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
