import { Component } from '@angular/core';
//import { AlertController } from 'ionic-angular';
import { Platform, AlertController } from '@ionic/angular';
import { NavController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { GlobalsService }  from './globals.service';
import { AuthenticationService } from "./services/authentication.service";
import {Storage} from "@ionic/storage";

@Component({
  selector: '	app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  myid = '';
  
  
  constructor(
    private platform: Platform,
    private oneSignal: OneSignal,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertCtrl: AlertController,
    public global: GlobalsService,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private router: Router,
    private storage: Storage,
    private auth: AuthenticationService,
  ) {
    console.log("INITIALIZE APP on app.component.ts");
    this.initializeApp();
  }
  
  initializeApp() {
    this.platform.resume.subscribe(()=>{
      this.onResume();
    });
    
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
      
      //error gara2 update jadi "@ionic-native/splash-screen": "5.0.0-beta.21",
      
      if(this.platform.is('cordova')){
        console.log('this is corodva platform and detected');
        this.setupPush();
      }else{
        //KALO BUKAN DI HP masuk kemari
        this.global.onesignalID = '699af28f-ae7c-4132-9b54-8cf86d6b0c5e'; // hp septi oppo
        
        console.log("BUKAN DI HP, masuk ek onesignal ID SEPTI : 699af28f-ae7c-4132-9b54-8cf86d6b0c5e")
      }
      console.log('THIS platforms:');
      console.log(this.platform.platforms());
      
      // this.authenticationService.authState.subscribe(state => {
      //   if(state) {
      //     this.router.navigate(['tabs']);
      //   } else {
      //     this.router.navigate(['']);
      //   }
      // })
    });
  }
  
  async onResume(){
    this.global.loginloading = false;
    var self = this;
    this.auth.cek_token(function(data){
      self.global.loginerror = false;
      
      if(self.global.usertype == "EM"){
        self.router.navigateByUrl('tabs/full/(home:home)');
      }
    }, function(){
      self.router.navigateByUrl('');
    });
  }
  
  async setupPush(){
    this.oneSignal.startInit('a64fd1d6-473a-4181-9f27-b14bc0bdd2d7');
    
    this.oneSignal.getIds().then(id=>{
      this.myid = id.userId;
      this.global.onesignalID = id.userId;
    });
    
    
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      console.log('DATA receive: ' + data);
    });
    
    this.oneSignal.handleNotificationOpened().subscribe(data =>{
      console.log('DATA opened a push: ' + data);
      let message = data.notification.payload.body;
      let title = data.notification.payload.title;
      
      console.log(title + " , "+message);
      
      /*let alert = await this.alertCtrl
        .create({
          header: title,
          subHeader: "Jakarta Brosur App",
          message: message,
          buttons: ['OK']
      });
      await alert.present();*/
    });
    
    this.oneSignal.endInit();
  }
  
  gotoCartsActivity(){
    this.menuCtrl.close();
    this.navCtrl.navigateForward("carts");
  }
  
  gotoSalesActivity() {
    this.menuCtrl.close();
    this.navCtrl.navigateForward("sales");
  }
  
  gotoExpensepricelist() {
    this.menuCtrl.close();
    this.navCtrl.navigateForward("pricelist");
  }
  
  gotoEmployeeActivity(){
    this.menuCtrl.close();
    this.navCtrl.navigateForward("employee");
  }
  
  gotoCustomerActivity(){
    this.menuCtrl.close();
    this.navCtrl.navigateForward("customer");
  }
  
  gotoCustomerPayment(){
    this.menuCtrl.close();
    this.navCtrl.navigateForward("customerpayment");
  }
  
  gotoCustomerSales(){
    this.menuCtrl.close();
    this.navCtrl.navigateForward("customersales");
  }
  
  gotoNewCustomer() {
    this.menuCtrl.close();
    this.navCtrl.navigateForward("addnewcustomer");
  }
  
  doLogout() {
    this.menuCtrl.close();
    this.storage.remove('USER_INFO').then(() => {
      console.log(this.global.loginloading);
      this.global.loginloading = false;
      this.router.navigate(['']);
      //this.authState.next(false);
    });
  }
}
