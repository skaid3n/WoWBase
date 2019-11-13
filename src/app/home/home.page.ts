import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Personajes } from '../personajes';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  personajeEditando: Personajes; 
    
  arrayColeccionPersonajes: any = [{
    id: "",
    data: {} as Personajes}];

   

  constructor(private firestoreService: FirestoreService) {
    // Crear un personaje vacío
    this.personajeEditando = {} as Personajes;
    this.obtenerListaPersonajes();
  } 
  clicBotonInsertar() {
    this.firestoreService.insertar("personajes", this.personajeEditando).then(() => {
      console.log('Personaje creado correctamente!');
      this.personajeEditando= {} as Personajes;
    }, (error) => {
      console.error(error);
    });
  }
  obtenerListaPersonajes(){
    this.firestoreService.consultar("personajes").subscribe((resultadoConsultaPersonajes) => {
      this.arrayColeccionPersonajes = [];
      resultadoConsultaPersonajes.forEach((datosPersonajes: any) => {
        this.arrayColeccionPersonajes.push({
          id: datosPersonajes.payload.doc.id,
          data: datosPersonajes.payload.doc.data()
        });
      })
    });
  }
  
}



