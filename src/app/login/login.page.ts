import { Component, OnInit, ElementRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GlobalsService } from '../globals.service';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';


// @ViewChild('login_btn') inputEl: ElementRef;

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	username: String = '';
	password: String = '';
	result: Observable<any>;
	loginresultstring: String = "";
	loginerror: boolean = true;
	subscription: any;

	constructor(
		public global: GlobalsService,
		private auth: AuthenticationService,
		public http: HttpClient,
		public router: Router,
		public navCtrl: NavController,
		public platform: Platform
	) { 
		//constructor
		this.username = "employee@test.com";
		this.password = "password";
		this.global.logintoken = "$2y$10$yLK5sCjIeWdGRGA8gFjnpuUiBblJn9AP0A/TVTJculb2Ttbe4PBSq";
	}

	ngOnInit() {
		
		
		//this.storage.clear('USER_INFO');
		
		var self = this;
		this.auth.cek_token(function(data){
			self.loginerror = false;
			
			if(self.global.usertype == "EM"){
				self.navCtrl.navigateForward('confirmationbyemployee?sid=1');
				// comment dulu biar cepet
				// self.router.navigateByUrl('tabs/full/(home:home)');
				// end
				self.loginresultstring = '<i class=\'fas fa-check fa-fw\'></i> Employee Logged-in, Success..';
			}
		}, function(error){
			self.loginerror = true;
			self.global.loginloading = false;
			self.loginresultstring = 'Please re-login..';
			// kosongin passwod set user name dari storage
			console.log(error);
		});
		
	}


	ionViewDidEnter() {
		this.subscription = this.platform.backButton.subscribe(() => {
			navigator['app'].exitApp();
		});
	}


	login_clicked() {
		if(this.global.loginloading == false) {
			this.global.loginloading = true;
		
			let onesignalID = this.global.onesignalID;
			let url = this.global.api+'login';
			let post = {
				'onesignalID': onesignalID,
				'username': this.username,
				'password': this.password
			};
		
			//console.log(url);
		
			//this.authService.login();
		
				this.result = this.http.post(url,
					post,
					{
						responseType: 'json'
					}
				);
				if(this.result != null){
					this.result.subscribe(data=>{
						if (data != null) {
							if(data[0]=='1'){
								this.global.logintoken = data[1];
								this.global.userdata = data[2];
								this.global.usertype = data[3];
								this.loginerror = false;
								
								var dummy_response = {
									onesignalID : this.global.onesignalID,
									app_token : this.global.logintoken
								};
								//this.storage.set('USER_INFO', dummy_response).then((response) => { });
								

								if(this.global.usertype == "EM"){
									this.router.navigateByUrl('tabs/p/home');
									this.loginresultstring = "<i class='fas fa-check fa-fw'></i> Employee Logged-in, Success..";
								}else if(this.global.usertype == "CU"){
									//CUSTOMER ROLE
									//this.router.navigateByUrl('');
									console.log("CUSTOMER RESTICTION");
									this.loginresultstring = "<i class='fas fa-check fa-fw'></i> Customer Logged-in, Cannot go inside..";
									this.global.loginloading = false;
								}
							}else{
								this.loginerror = true;
								console.log('STATUS ERROR');
								console.log(data);
								this.loginresultstring = data[1];
							}
						}else{
							this.loginerror = true;
							console.log('NO DATA RECEIVED');
						}
						this.global.loginloading = false;
					}, error=>{
						this.global.loginloading = false;
						console.log(error);
					});
				} else {
					this.loginerror = true;
					console.log("CANNOT LOGIN, error in result = null");
				}
			}else{
				console.log("STILL on log-in loading API, please wait..");
			}
		}

}
