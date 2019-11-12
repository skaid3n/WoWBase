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

  constructor(private firestoreService: FirestoreService) {
    // Crear una tarea vacía
    this.personajeEditando = {} as Personajes;
}
clicBotonInsertar() {
  this.firestoreService.insertar("personajes", this.personajeEditando).then(() => {
    console.log('Personaje creado correctamente!');
    this.personajeEditando= {} as Personajes;
  }, (error) => {
    console.error(error);
  });
}
}