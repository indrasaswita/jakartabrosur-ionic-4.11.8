import { Component, OnInit } from '@angular/core';
import {GlobalsService} from "../globals.service";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(
    private global: GlobalsService,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
  }
  
  toggleMenu(){
    this.menuCtrl.toggle();
  }

}
