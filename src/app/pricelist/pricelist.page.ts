import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GlobalsService } from '../globals.service';
import { Router } from '@angular/router';
/*import { AddpricePage } from '../pricelist/addprice/addprice.page';*/
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.page.html',
  styleUrls: ['./pricelist.page.scss']
})
export class PricelistPage implements OnInit {

	result: Observable<any>;

  constructor(
  	public router: Router,
  	public global: GlobalsService,
  	public http: HttpClient,
  	public navCtrl: NavController
	) { 
  	this.global.expenseprices = [];
  }

  ngOnInit() {
  	//this.getpricelists();
		
  }

  gotoaddprice(){
		//this.router.navigateByUrl('popup/addprice');
		this.navCtrl.navigateForward('popup/addprice');
  }

  refresh(event){
		setTimeout(() => {
			this.global.expenseprices = [];
			this.getPrices();
			event.target.complete();
		}, 2000);
  }

  getPrices(){
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
  							this.global.expenseprices = [];
  							console.log("ERROR OUTPUT FROM " + url);
  							this.router.navigateByUrl('');
  						}
  					}
  				}
  			);
  		}
  	}


}
