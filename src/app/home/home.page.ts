import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Personajes } from '../personajes';
import { Router } from "@angular/router";

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
    idPersonajeSelec: string;

   

  constructor(private firestoreService: FirestoreService, private router: Router) {
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
  selecPersonaje(personajeSelec) {
    console.log("Personaje seleccionado: ");
    console.log(personajeSelec);
    this.idPersonajeSelec = personajeSelec.id;
    this.personajeEditando.nombre = personajeSelec.data.nombre;
    this.personajeEditando.sexo = personajeSelec.data.sexo;
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("personajes", this.idPersonajeSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaPersonajes();
      // Limpiar datos de pantalla
      this.personajeEditando = {} as Personajes;
    })
  }

  clicBotonModificar() {
    this.firestoreService.actualizar("personajes", this.idPersonajeSelec, this.personajeEditando).then(() => {
      // Actualizar la lista completa
      this.obtenerListaPersonajes();
      // Limpiar datos de pantalla
      this.personajeEditando = {} as Personajes;
    })
  }
  navigateToEspecifico(selecPersonaje) {
    this.router.navigate(["/especifico/" + selecPersonaje.id]);
  }

  
}



