import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
//import { Platform, ToastController } from "ionic-angular";
//import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";
import {GlobalsService} from "../globals.service";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {Platform, ToastController} from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	authState = new BehaviorSubject(false);
	constructor(
		private router: Router,
		private storage: Storage,
		private global: GlobalsService,
		private platform: Platform,
		private toastController: ToastController,
		private http: HttpClient
	) {
		this.platform.ready().then(() => {
			//this.ifLoggedIn();
		});
	}
	
	cek_token(whendone, whenfailed=null){
		if(this.global.loginloading == false){
			this.global.loginloading = true;
			
			this.storage.get('USER_INFO').then((response) => {
				if(response){
					let onesignalID = this.global.onesignalID;
					let url = this.global.api + 'cektoken';
					
					let post = response;
					
					var result = this.http.post(url,
						post,
						{
							responseType: 'json'
						}
					);
					if (result != null) {
						result.subscribe(data => {
							if (data != null) {
								console.log(data);
								if (data[0] == '1') {
									this.global.logintoken = data[1];
									this.global.userdata = data[2];
									this.global.usertype = data[3];
									
									whendone(data);
								}
							} else {
								this.global.loginloading = false;
								if(typeof whenfailed === 'function')
									whenfailed();
								//return berupa null
							}
						}, error => {
							console.log(error);
							if(typeof whenfailed === 'function')
								whenfailed();
							//kalo return error dari server
						});
					}
				}else{
					this.global.loginloading = false;
					if(typeof whenfailed === 'function')
						whenfailed();
					//kalo misalnya udah logout, jadi user info udah di delete jadi udah kosong, jadi gak ada response (response = null)
				}
			});
			
			
			
			
		}
	}
	
	// ifLoggedIn(){
	//   this.storage.get('USER_INFO').then((response) => {
	//     if(response){
	//       this.authState.next(true);
	//     }
	//   });
	// }
	//
	// login(){
	//   var dummy_response = {
	//     username : 'employee@test.com',
	//     password : 'password'
	//   };
	//   this.storage.set('USER_INFO', dummy_response).then((response) => {
	//     this.router.navigate(['tabs']);
	//     this.authState.next(true);
	//   });
	// }
	//
	// logout(){
	//   this.storage.remove('USER_INFO').then(() => {
	//     this.router.navigate(['']);
	//     this.authState.next(false);
	//   });
	// }
	//
	isAuthenticated(){
	  return this.authState.value;
	}
}
