import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Personajes } from '../personajes';
import { Router } from "@angular/router";

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})

export class HomePage {
  quotes: any;

  personajeEditando: Personajes; 
    
  arrayColeccionPersonajes: any = [{
    id: "",
    data: {} as Personajes}];

  idPersonajeSelec: string;

  userEmail: String = "";
  userUID: String = ""; 
  isLogged: boolean;

  private  apiUrl :string = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10";

  constructor(private firestoreService: FirestoreService, private router: Router, private socialSharing: SocialSharing,
    private authService: AuthService, public afAuth: AngularFireAuth, private toastController: ToastController) {
    // Crear un personaje vacío
    this.personajeEditando = {} as Personajes;


    this.obtenerListaPersonajes();
    
  } 

  navigateToEspecifico(id) {
    this.router.navigate(["/especifico/" + id]);
  }

  navigateToConfigurador() {
    this.router.navigate(["/configurador/"]);
  }

  navigateToInformacion() {
    this.router.navigate(["/informacion/"]);
  }

  navigateToAbout() {
    this.router.navigate(["/about/"]);
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
    console.log(this.idPersonajeSelec);
    this.personajeEditando.nombre = personajeSelec.data.nombre;
    this.personajeEditando.sexo = personajeSelec.data.sexo;
    this.personajeEditando.nivel = personajeSelec.data.nivel;
    this.personajeEditando.raza = personajeSelec.data.raza;
    this.personajeEditando.clase = personajeSelec.data.clase;
    this.personajeEditando.foto = personajeSelec.data.foto;
  }

  ionViewDidEnter() {
		this.isLogged = false;
		this.afAuth.user.subscribe(user => {
		  if(user){
			this.userEmail = user.email;
			this.userUID = user.uid;
			this.isLogged = true;
		  }
		})
  }
  
  async logout(){
		const toast = await this.toastController.create({
			message: 'Sesion Cerrada',
			duration: 3000
		});

		this.authService.doLogout()
		.then(res => {
		  this.userEmail = "";
		  this.userUID = "";
		  this.isLogged = false;
		  console.log(this.userEmail);
		  toast.present();
		}, err => console.log(err));
    }
    
    navigateToLogin() {
      this.router.navigate(["/login/"]);
    }


}
  




