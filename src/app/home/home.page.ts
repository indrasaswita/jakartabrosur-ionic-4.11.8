import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

//import { LocalNotifications } from '@ionic-native/local-notifications';

import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  data: Observable<any>;
  tab: string = '';
  
  

  constructor(
      public global: GlobalsService,
      public http: HttpClient,
      public navCtrl: NavController,
      //public localNotifications: LocalNotifications
  )
  {
    //this.tab = 'carts';

    /*this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      trigger: {
        at: new Date(Date.now())
      },
      led: 'FF0000',
      sound: null
    });*/
  }

  navSales(){
  	this.navCtrl.navigateForward("sales");
  }
  navPrice(){
  	this.navCtrl.navigateForward("prices");
  }
  navContact(){
  	this.navCtrl.navigateForward("contact");
  }
  navNotif(){
  	this.navCtrl.navigateForward("notif");
  }
  navCust(){
  	this.navCtrl.navigateForward("customer");
  }

}
