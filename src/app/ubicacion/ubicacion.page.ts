import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Map,tileLayer,marker} from 'leaflet';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage implements OnInit {
  map:Map;
  newMarker:any;
  address:string[];

  constructor(private router: Router) { }
    ionViewDidEnter(){
      this.loadMap();
    }

   loadMap() { //Función que cargara el mapa 
               //en la ubicación seleccionada por coordenadas
    this.map = new Map("mapId").setView([36.679701, -5.444874], 15);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY- SA</a>' })
      .addTo(this.map); 
      
      this.newMarker = marker([36.679701, -5.444874], {draggable: true}).addTo(this.map);
  }

  ngOnInit() {
  }

  //Enrutamiento
  navigateToInicio() {
    this.router.navigate(["/"]);
  }
  //Enrutamiento
  navigateToArmory() {
    this.router.navigate(["/armory/"]);
  }
  //Enrutamiento
  navigateToInformacion() {
    this.router.navigate(["/informacion/"]);
  }
  //Enrutamiento
  navigateToUbicacion() {
    this.router.navigate(["/ubicacion/"]);
  }

}