import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Personajes } from '../personajes';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-especifico',
  templateUrl: './especifico.page.html',
  styleUrls: ['./especifico.page.scss'],
})
export class EspecificoPage implements OnInit {
  id = null;

  document: any = {
    id: "",
    data: {} as Personajes
  };
  idPersonajeSelec: string;
  personajeEditando: Personajes; 


  constructor(private activatedRoute: ActivatedRoute, private firestoreService: FirestoreService) {

    this.personajeEditando = {} as Personajes;
   }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.firestoreService.consultarPorId("personajes", this.id).subscribe((resultado) => {
      // Preguntar si se hay encontrado un document con ese ID
      if(resultado.payload.data() != null) {
        this.document.id = resultado.payload.id
        this.document.data = resultado.payload.data();
        // Como ejemplo, mostrar el título de la tarea en consola
        console.log(this.document.data.titulo);
      } else {
        // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
        this.document.data = {} as Personajes;
      } 
    });
  }
  
  clicBotonBorrar() {
    this.firestoreService.borrar("personajes", this.id).then(() => {
      // Limpiar datos de pantalla
      this.personajeEditando = {} as Personajes;
    })
  }

  clicBotonModificar() {
    this.firestoreService.actualizar("personajes", this.id, this.personajeEditando).then(() => {

      // Limpiar datos de pantalla
      this.personajeEditando = {} as Personajes;
    })
  }


}


