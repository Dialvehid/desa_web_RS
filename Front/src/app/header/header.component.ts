import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  //Aqui iria la url de la imagen de la red social
  titulo: string = "SpaceTime";

  ngOnInit(): void {
  }

}
