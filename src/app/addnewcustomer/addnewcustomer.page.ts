	import { Component, OnInit } from '@angular/core';
	import { Router } from '@angular/router';
	import { GlobalsService } from '../globals.service';
	import { HttpClient } from "@angular/common/http";
	import { Observable } from "rxjs/Observable";
	import { NavController , Platform } from "@ionic/angular";
	
	@Component({
		selector: 'app-addnewcustomer',
		templateUrl: './addnewcustomer.page.html',
		styleUrls: ['./addnewcustomer.page.scss'],
	})
	export class AddnewcustomerPage implements OnInit {
		private email: any;
		name: String = "";
		telp1: any;
		telp2: any;
		telp3: any;
		title: any;
		mr : any;
		mrs: any;
		ms : any;
		result: Observable<any>;
		checkBoxList:any;
		
		constructor(
			public global: GlobalsService,
			public http: HttpClient,
			public router: Router,
			public navCtrl: NavController,
			public platform: Platform
		) {
		
		}
	
		ngOnInit() {
			this.name = "";
			this.email = "";
			this.telp1 = "";
			this.telp2 = "";
			this.telp3 = "";
			this.checkBoxList = [
				{
					value:"Mr.",
					isChecked:false
				},{
					value:"Mrs.",
					isChecked:false
				},{
					value:"Ms.",
					isChecked:false
				}
			];
		}
		
		register_clicked(){
			let url = this.global.api+'register';
			let post = {
				'email'	: this.email,
				'name'	: this.name,
				'telp1'	: this.telp1,
				'telp2'	: this.telp2,
				'telp3'	: this.telp3,
				'title'	: this.title,
			};
			
			//console.log(post);
			this.result = this.http.post(url,
				post,
				{
					responseType: 'json'
				}
			);
			if(this.result != null){
				this.result.subscribe(data=>{
					if (data != null) {
						console.log(data);
					} else {
						console.log("EMAIL NULL");
					}
				});
			}
			else{
				console.log("error");
			}
		}
		
		checkEvent(item){
			if(item && this.checkBoxList!=null){
				this.checkBoxList.filter(r => r.value != item.value).forEach(r => {
					r.isChecked = false;
					this.title = item.value;
				});
			}
		}
	}
