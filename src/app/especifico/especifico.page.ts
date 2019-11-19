import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-especifico',
  templateUrl: './especifico.page.html',
  styleUrls: ['./especifico.page.scss'],
})
export class EspecificoPage implements OnInit {
  id = null;


  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }

}


