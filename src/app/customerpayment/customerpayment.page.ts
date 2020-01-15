import { Component, OnInit } from '@angular/core';
import {GlobalsService} from "../globals.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
	selector: 'app-customerpayment',
	templateUrl: './customerpayment.page.html',
	styleUrls: ['./customerpayment.page.scss'],
})
export class CustomerpaymentPage implements OnInit {
    customers: any;
		httpresult: Observable<any>;
		customererror: boolean;

	constructor(
		public global: GlobalsService,
    public http: HttpClient,
    public router: Router
	) {
	  this.customers = null;
  }

	ngOnInit() {
		this.getcustomerpayment();
	}
	
	getcustomerpayment(){
	  this.customers = null;
	  let url = this.global.api+"select/customerpayment";
	  
	  let post = {
	  	'app_token' : this.global.logintoken,
			'usertype'	: this.global.usertype,
			'userID'		: this.global.userdata.id
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
	  				this.customers = data;
	  				this.customererror = false;
					}else{
	  				this.customererror = true;
	  				this.router.navigateByUrl('');
					}
				}
			}
		);
	}

}
