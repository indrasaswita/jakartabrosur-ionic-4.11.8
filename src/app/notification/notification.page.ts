import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GlobalsService } from '../globals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

	notifications: any;
	httpresult: Observable<any>;
	notiferror: boolean;

  constructor(
		public global: GlobalsService,
		public http: HttpClient,
		public router: Router
	) { 
		this.notifications = null;
	}

  ngOnInit() {
		this.getnotificationdata();
  }

  notifclicked(notifid){
  	let url = this.global.api + "update/notifications";

  	this.updatenotification(notifid);
  }

  updatenotification(notifid){
  	let url = this.global.api + "update/notifications";
  	let post = {
  		'app_token': this.global.logintoken,
  		'usertype': this.global.usertype,
  		'userID': this.global.userdata.id,
  		'notifID': notifid
  	}

  	this.httpresult = this.http.post(
  		url,
  		post,
  		{
  			responseType: 'json'
  		}	
		);

		this.httpresult.subscribe(
			data => {
				if (data != null) {
					if (data instanceof Array) {
						this.notifications = data;
						this.notiferror = false;
					} else {
						console.log("ERROR OUTPUT FROM " + url);
						this.notiferror = true;
					}
				}
			}
		);
  }

  getnotificationdata(){
		this.notifications = null;
		let url = this.global.api + "select/notifications";

		let post = {
			'app_token': this.global.logintoken,
			'usertype': this.global.usertype,
			'userID': this.global.userdata.id
		};

		this.httpresult = this.http.post(
			url,
			post,
			{
				responseType: 'json'
			}
		);

		this.httpresult.subscribe(
			data => {
				if(data != null){
					if(data instanceof Array){
						this.notifications = data;
						this.notiferror = false;
					}else{
						console.log("ERROR OUTPUT FROM " + url);
						this.notiferror = true;
						this.router.navigateByUrl('');
					}
				}
			}
		);
  }



}
