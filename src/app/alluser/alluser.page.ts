import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.page.html',
  styleUrls: ['./alluser.page.scss'],
})
export class AlluserPage implements OnInit {

  constructor(
  	public navCtrl: NavController,
  	public menuCtrl: MenuController,
  	public global: GlobalsService
	) { }

  ngOnInit() {
  }

  toggleMenu(){
  	this.menuCtrl.toggle();
  }

}
