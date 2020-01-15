import { Component, OnInit } from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';
//import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }
  
  ionViewDidLoad(){
    console.log('ionViewDidLoad modalpage');
  }
}
