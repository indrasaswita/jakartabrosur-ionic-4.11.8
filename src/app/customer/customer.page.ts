import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GlobalsService } from '../globals.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
	selector: 'app-customer',
	templateUrl: './customer.page.html',
	styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

	private customers: any;
	private httpresult: Observable<any>;
	private customererror: boolean;
	private groups: any = [];
	private laststate: any = "";

	constructor(
		public global: GlobalsService,
		public http: HttpClient,
		public router: Router
	) {
		this.customers = null;
	}

	ngOnInit() {
		//console.log('customer mulai');
		//this.getgroups();
	}

	ionViewWillEnter(){
		this.getcustomerdata();
	}

	ngOnEnter(){
		//console.log("OnEnter on contact.page.ts");
	}
	ionSelected(){
		//console.log("KUCING MEONG");
	}

	getcustomerdata(){
		this.customers = null;

		if(!this.global.loadingshow) {
			this.global.loadingshow = true;
			let url = this.global.api + "select/customers";

			console.log(this.global.logintoken);

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
					if (data != null) {
						if (data instanceof Array) {
							data.forEach((item, index) => {
								item.show = true;
							})
							this.customers = data;
							console.log(this.customers);
							this.hideallcustomerdetail();
							this.customers.forEach(($ii, $i) => {
								$ii.showcustomerbankacc = false;
								$ii.showcustomerdetail = false;
								$ii.created_at = this.global.makeDateTime($ii.created_at);
								if ($ii.updated_at != null) {
									$ii.updated_at = this.global.makeDateTime($ii.updated_at);
								}
							});

							if(this.laststate!=null){
								if(this.laststate.customerID!=null){
									this.customers.forEach(($ii, $i)=>{
										console.log($ii.id+" -> "+this.laststate.customerID);
										if($ii.id == this.laststate.customerID){
											if(this.laststate.detailtab=="customerbankacc") {
												$ii.showdetail = true;
												$ii.showcustomerbankacc = true;
												$ii.showcustomerdetail = false;
												console.log("bacnkacc");
											}else if(this.laststate.detailtab=="customerdetail") {
												$ii.showdetail = true;
												$ii.showcustomerdetail = true;
												$ii.showcustomerbankacc = false;
												console.log("detail");
											}
										}
									});
								}
							}

							this.customererror = false;
						} else {
							console.log('ERROR OUTPUT FROM ' + url);
							this.customererror = true;
							this.router.navigateByUrl('');
						}
					}
					this.global.loadingshow = false;
				}, error => {
					this.global.loadingshow = false;
				}
			);
		}
	}

	hideallcustomerdetail(){
		this.customers.forEach(($ii, $i)=>{
			$ii.showdetail = false;
		});
	}

	showdetail(customer){
		let temp = customer.showdetail;
		this.hideallcustomerdetail();
		if(temp == false){
			customer.showdetail = true;
		}
		if(!customer.showcustomerbankacc
			&& !customer.showcustomerdetail){
			//DEFAULT KALO BELOM ADA YANG DI PILIH SEBELUMNYA
			customer.showcustomerdetail = true;
		}

	}

	showcustomerbankacc(customer){
		customer.showcustomerbankacc = true;
		customer.showcustomerdetail = false;
	}

	showcustomerdetail(customer){
		customer.showcustomerdetail = true;
		customer.showcustomerbankacc = false;
	}

	goeditcustomerbankacc(customer, bankacc){
		this.laststate = {
			"customerID": customer.id,
			"detailtab": "customerbankacc"
		};

		let navigationExtras: NavigationExtras = {
			queryParams: {
				special: JSON.stringify(bankacc)
			}
		};
		this.router.navigate(['editcustomerbankacc'], navigationExtras);
	}
}
