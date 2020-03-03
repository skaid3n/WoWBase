import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-armory',
  templateUrl: './armory.page.html',
  styleUrls: ['./armory.page.scss'],
})
export class ArmoryPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToInicio() {
    this.router.navigate(["/"]);
  }

  navigateToArmory() {
    this.router.navigate(["/armory/"]);
  }

  navigateToInformacion() {
    this.router.navigate(["/informacion/"]);
  }

  navigateToUbicacion() {
    this.router.navigate(["/ubicacion/"]);
  }

}
