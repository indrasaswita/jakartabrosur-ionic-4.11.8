import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {GlobalsService} from '../globals.service';
import {MenuController, NavController, Platform} from '@ionic/angular';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  
  data: Observable<any>;
  
  subscription: any;
  tab: string = '';
  result: Observable<any>;
  
  constructor(
    public navCtrl: NavController,
    public global: GlobalsService,
    public http: HttpClient,
    public router: Router,
    public menuCtrl: MenuController,
    public platform: Platform
  ){
  
  }
  
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }
  
  navMaster(){
    this.getPapers();
    this.getExpensepricelists();
    
    
    this.menuCtrl.enable(true, "menu-master");
    this.menuCtrl.enable(false, "menu-alluser");
    this.menuCtrl.enable(false, "menu-notification");
    this.menuCtrl.enable(false, "menu-salelist");
    this.menuCtrl.enable(false, "menu-calculation");
    //this.menuCtrl.enable(false, "menu-whatsapp");
  }
  
  navAlluser(){
    this.getEmployees();
    this.getCustomers();
    this.getCustomerpayment();
    this.getRoles();
    //this.getcustomersales() -> masuk ke payment, soalnya cuma seleksi data
    
    this.menuCtrl.enable(false, "menu-master");
    this.menuCtrl.enable(true, "menu-alluser");
    this.menuCtrl.enable(false, "menu-notification");
    this.menuCtrl.enable(false, "menu-salelist");
    this.menuCtrl.enable(false, "menu-calculation");
    //this.menuCtrl.enable(false, "menu-whatsapp");
  }
  
  navNotification(){
    this.menuCtrl.enable(false, "menu-master");
    this.menuCtrl.enable(false, "menu-alluser");
    this.menuCtrl.enable(true, "menu-notification");
    this.menuCtrl.enable(false, "menu-salelist");
    this.menuCtrl.enable(false, "menu-calculation");
    //this.menuCtrl.enable(false, "menu-whatsapp");
  }
  
  /*
    navWhatsapp(){
      this.menuCtrl.enable(false, "menu-master");
      this.menuCtrl.enable(false, "menu-alluser");
      this.menuCtrl.enable(false, "menu-notification");
      this.menuCtrl.enable(false, "menu-salelist");
      this.menuCtrl.enable(false, "menu-calculation");
      this.menuCtrl.enable(true, "menu-whatsapp");
    }
  */
  
  navSalelist(){
    this.menuCtrl.enable(false, "menu-master");
    this.menuCtrl.enable(false, "menu-alluser");
    this.menuCtrl.enable(false, "menu-notification");
    this.menuCtrl.enable(true, "menu-salelist");
    this.menuCtrl.enable(false, "menu-calculation");
  }
  
  navUser(){
    this.menuCtrl.enable(false, "menu-master");
    this.menuCtrl.enable(false, "menu-alluser");
    this.menuCtrl.enable(false, "menu-notification");
    this.menuCtrl.enable(false, "menu-salelist");
    this.menuCtrl.enable(true, "menu-user");
    //this.menuCtrl.enable(false, "menu-whatsapp");
  }
  
  getExpensepricelists(){
    if(!this.global.expensepricesdownloading){
      this.global.expensepricesdownloading = true;
      let url = this.global.api+"select/pricelists";
      let post = {
        'app_token': this.global.logintoken,
        'usertype': this.global.usertype,
        'userID': this.global.userdata.id
      }
      
      this.result = this.http.post(
        url,
        post,
        {
          responseType: 'json'
        }
      );
      
      if(this.result != null){
        this.result.subscribe(
          data => {
            if (data != null) {
              if (data instanceof Object) {
                this.global.expenseprices = data;
              } else {
                console.log("ERROR OUTPUT FROM " + url);
                this.global.expenseprices = [];
                this.router.navigateByUrl('');
              }
            }else{
              this.global.expenseprices = [];
            }
            this.global.expensepricesdownloading = false;
          }
        );
      }
    }
  }
  
  getEmployees() {
    if (!this.global.employeesdownloading){
      this.global.employeesdownloading = true;
      var url = this.global.api + 'select/employees';
      let post = {
        'app_token': this.global.logintoken,
        'usertype': this.global.usertype,
        'userID': this.global.userdata.id
      };
      this.result = this.http.post(
        url,
        post,
        {
          responseType: 'json'
        }
      );
      if (this.result != null) {
        this.result.subscribe(data => {
          if (data != null) {
            if (data instanceof Array) {
              this.global.employees = data;
            } else {
              this.global.employees = [];
              this.router.navigateByUrl('');
            }
          } else {
            this.global.employees = [];
            console.log("ERROR NO DATA from " + url);
          }
          
          this.global.employeesdownloading = false;
        });
      }
    }
  }
  
  getCustomers() {
    if (!this.global.customersdownloading) {
      this.global.customersdownloading = true;
      var url = this.global.api + 'select/customers';
      let post = {
        'app_token': this.global.logintoken,
        'usertype': this.global.usertype,
        'userID': this.global.userdata.id
      };
      this.result = this.http.post(
        url,
        post,
        {
          responseType: 'json'
        }
      );
      if (this.result != null) {
        this.result.subscribe(data => {
          if (data != null) {
            if (data instanceof Array) {
              this.global.customers = data;
            } else {
              this.global.customers = [];
              this.router.navigateByUrl('');
            }
          } else {
            this.global.customers = [];
            console.log("ERROR NO DATA from " + url);
          }
          
          this.global.customersdownloading = false;
        });
      }
    }
  }
  
  getCustomerpayment() {
    if (!this.global.customerpaymentdownloading){
      this.global.customerpaymentdownloading = true;
      var url = this.global.api + 'select/customerpayment';
      let post = {
        'app_token': this.global.logintoken,
        'usertype': this.global.usertype,
        'userID': this.global.userdata.id
      };
      this.result = this.http.post(
        url,
        post,
        {
          responseType: 'json'
        }
      );
      if (this.result != null) {
        this.result.subscribe(data => {
          if (data != null) {
            if (data instanceof Array) {
              this.global.customerpayment = data;
            } else {
              this.global.customerpayment = [];
              this.router.navigateByUrl('');
            }
          } else {
            this.global.customerpayment = [];
            console.log("ERROR NO DATA from " + url);
          }
          
          this.getCustomersales();
          this.global.customerpaymentdownloading = false;
        });
      }
    }
  }
  
  getCustomersales() {
    this.global.customersalesdownloading = true;
    if(this.global.customerpayment != null){
      this.global.customersales = this.global.customerpayment;
      console.log(this.global.customersalesdownloading + '-' + ' loading');
      //udah langsung ke clone kalo di angular 6, ga perlu di clone lagi
    }else{
      this.global.customersales = [];
    }
    
    this.global.customersalesdownloading = false;
  }
  
  getRoles() {
    if (!this.global.rolesdownloading){
      this.global.rolesdownloading = true;
      var url = this.global.api + 'select/roles';
      let post = {
        'app_token': this.global.logintoken,
        'usertype': this.global.usertype,
        'userID': this.global.userdata.id
      };
      this.result = this.http.post(
        url,
        post,
        {
          responseType: 'json'
        }
      );
      if (this.result != null) {
        this.result.subscribe(data => {
          if (data != null) {
            if (data instanceof Array) {
              this.global.roles = data;
            } else {
              this.global.roles = [];
              this.router.navigateByUrl('');
            }
          } else {
            this.global.roles = [];
            console.log("ERROR NO DATA from " + url);
          }
          this.global.rolesdownloading = false;
        });
      }
    }
  }
  
  getPapers() {
    if (!this.global.papersdownloading){
      this.global.papersdownloading = true;
      var url = this.global.api + 'select/papers';
      let post = {
        'app_token': this.global.logintoken,
        'usertype': this.global.usertype,
        'userID': this.global.userdata.id
      };
      this.result = this.http.post(
        url,
        post,
        {
          responseType: 'json'
        }
      );
      if (this.result != null) {
        this.result.subscribe(data => {
          if (data != null) {
            if (data instanceof Array) {
              this.global.papers = data;
            } else {
              this.global.papers = [];
              this.router.navigateByUrl('');
            }
          } else {
            this.global.papers = [];
            console.log("ERROR NO DATA from " + url);
          }
          
          this.global.papersdownloading = false;
        }, error => {
          this.global.papersdownloading = false;
          console.log(error);
        });
      }
    }
  }
  
}
