import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Personajes } from '../personajes';
import { FirestoreService } from '../firestore.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

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

  userEmail: String = "";
	userUID: String = "";
	isLogged: boolean

  personajeEditando: Personajes; 


  constructor(private activatedRoute: ActivatedRoute, 
    private firestoreService: FirestoreService,
    private router: Router,
	public alertController: AlertController,
	private loadingController: LoadingController,
	private toastController: ToastController,
	private imagePicker: ImagePicker,
	private socialSharing: SocialSharing,
	private authService: AuthService,
	public afAuth: AngularFireAuth) {
		this.personajeEditando = {} as Personajes;
		this.id = this.activatedRoute.snapshot.paramMap.get("id");
		this.firestoreService.consultarPorId("personajes", this.id).subscribe((resultado) => {
		// Preguntar si se hay encontrado un document con ese ID
		if(resultado.payload.data() != null) {
			this.document.id = resultado.payload.id
			this.document.data = resultado.payload.data();
		} else {
			// No se ha encontrado un document con ese ID. Vaciar los datos
			this.document.data = {} as Personajes;
		} 
		});
	}

  ngOnInit() {
  }
  
  clicBotonBorrar() {
    this.firestoreService.borrar("personajes", this.id).then(() => {
      // Limpiar datos de pantalla
      this.document.data = {} as Personajes;
    })
    this.navigateToInicio();
  }
  
  clicBotonInsertar() {
    this.firestoreService.insertar("personajes", this.document.data).then(() => {
		// Insertar Personaje
      console.log('Personaje creado.');
      this.document.data = {} as Personajes;
    }, (error) => {
      console.error(error);
    });
  }

  clicBotonModificar() {
    this.firestoreService.actualizar("personajes", this.id, this.document.data).then(() => {
      // Modificar Personaje
      this.document.data = {} as Personajes;
      this.navigateToInicio();
    })
  }

  navigateToInicio() {
    this.router.navigate(["/"]);
  }


  async alertaInsertar() {
		const alert = await this.alertController.create({
			header: 'Confirmar',
			message: '¿Quieres añadir el personaje <strong>'+ this.document.data.nombre +'</strong>?',
			buttons: [
				{
					text: 'Descartar',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
						this.navigateToInicio();
					}
				},
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
					}
				},
				{
					text: 'Guardar',
					handler: () => {
						console.log('Confirm Okay');
						this.clicBotonInsertar();
						this.navigateToInicio();
					}
				}
			]
		});

		await alert.present();
  }

  async alertaModificar() {
		const alert = await this.alertController.create({
			header: 'Confirmar',
			message: '¿Quieres confirmar los cambios en el personaje <strong>'+ this.document.data.nombre +'</strong>?',
			buttons: [
				{
					text: 'Descartar',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
						this.navigateToInicio();
					}
				},
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
					}
				},
				{
					text: 'Guardar',
					handler: () => {
						console.log('Confirm Okay');
						this.clicBotonModificar();
						this.navigateToInicio();
					}
				}
			]
		});

		await alert.present();
  }


  	async alertaBorrar() {
		const alert = await this.alertController.create({
			header: 'Confirmar',
			message: '¿Quieres borrar el personaje <strong>'+ this.document.data.nombre +'</strong>?',
			buttons: [
				{
					text: 'Descartar',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
						this.navigateToInicio();
					}
				},
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
					}
				},
				{
					text: 'Borrar',
					handler: () => {
						console.log('Confirm Okay');
						this.clicBotonBorrar();
						this.navigateToInicio();
					}
				}
			]
		});

		await alert.present();
	}
	async uploadImagePicker() {
		const loading = await this.loadingController.create({
			message: 'Esperando...'
		});
		const toast = await this.toastController.create({
			message: 'Imagen subida con éxito.',
			duration: 3000
		});
		// Comprobar si la aplicación tiene permisos de lectura
		this.imagePicker.hasReadPermission().then(
			(result) => {
				// Si no tiene permiso de lectura se solicita al usuario
				if (result == false) {
					this.imagePicker.requestReadPermission();
				}
				else {
					// Abrir selector de imágenes (ImagePicker)
					this.imagePicker.getPictures({
						maximumImagesCount: 1,  // Permitir sólo 1 imagen
						outputType: 1           // 1 = Base64
					}).then(
						(results) => {  // Contiene las mágenes seleccionadas
							// Alamacenara las imagenes
							let nombreCarpeta = "imagenes";
							// Recorrer todas las imágenes que haya seleccionado el usuario
							//  aunque realmente sólo será 1 como se ha indicado en las opciones
							for (var i = 0; i < results.length; i++) {
								// Mostrar el mensaje de espera
								loading.present();
								// Asignar la fecha y hora a cada imagen como nombre   
								let nombreImagen = `${new Date().getTime()}`;
								// Llamar al método que sube la imagen al Storage
								this.firestoreService.uploadImage(nombreCarpeta, nombreImagen, results[i])
									.then(snapshot => {
										snapshot.ref.getDownloadURL()
											.then(downloadURL => {
												// En la variable downloadURL se tiene la dirección de descarga de la imagen
												console.log("downloadURL:" + downloadURL);
												this.document.data.foto = downloadURL;
												// Mostrar el mensaje de finalización de la subida
												toast.present();
												// Ocultar mensaje de espera
												loading.dismiss();
											})
									})
							}
						},
						(err) => {
							console.log(err)
						}
					);
				}
			}, (err) => {
				console.log(err);
			});
	}

	async deleteFile(fileURL) {
		const toast = await this.toastController.create({
			message: 'Archivo borrado con éxito.',
			duration: 3000
		});
		this.firestoreService.deleteFileFromURL(fileURL)
			.then(() => {
				toast.present();
			}, (err) => {
				console.log(err);
			});
	}

	componerMsg(){
		var msg = 'El personaje ' + this.document.data.nombre + ' ha desbloqueado el nivel ' + this.document.data.nivel;
		return msg;

	}

	regularShare(){
		let msg = this.componerMsg();
		this.socialSharing.share(msg, null, null, null);
	}

	whatsappShare(){
		let msg = this.componerMsg();
		this.socialSharing.shareViaWhatsApp(msg, null, null);
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


}


