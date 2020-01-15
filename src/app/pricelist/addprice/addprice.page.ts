import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GlobalsService } from '../../globals.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-addprice',
  templateUrl: './addprice.page.html',
  styleUrls: ['./addprice.page.scss'],
})
export class AddpricePage implements OnInit {

	newtype: any;
	newtitle: String;
	newdetail: String;
	newprice: any;

	customActionSheetOptions: any = {
		header: 'Colors',
		subHeader: 'Select your favorite color'
	};

	pricetypeerror:boolean;
	addpriceerror:boolean = false;
	pricetypes: any;
	httpresult: any;

  constructor(
  	public global: GlobalsService,
  	public http: HttpClient,
  	public router: Router,
  	public navCtrl: NavController
	) { }

  ngOnInit() {
  	this.getpricetypes();
  }

  getpricetypes(){
  	let url = this.global.api + "select/pricetypes";
  	let post = {
  		'app_token': this.global.logintoken,
  		'usertype': this.global.usertype,
  		'userID': this.global.userdata.id
  	}
  	
  	this.httpresult = this.http.post(
  		url,
  		post,
  		{
  			responseType: 'json'
  		}	
  	);
  	console.log("TARIK DATA");
  	
  	this.httpresult.subscribe(
  		data => {
  			console.log(data);
  			if (data != null) {
  				if (data instanceof Array) {
  					this.pricetypes = data;
  					this.pricetypeerror = false;
  					if(data.length>1){
  						this.newtype = data[0].id;

							console.log(data.length);
  					}
  				} else {
  					console.log("ERROR OUTPUT FROM " + url);
  					this.pricetypeerror = true;
  					this.router.navigateByUrl('');
  				}
  			}
  		}
  	);
  }

  addpriceclicked(){
		let typeID = this.newtype;
		let title = this.newtitle;
		let detail = this.newdetail==null?"":this.newdetail;
		let price = this.newprice;

		console.log(typeID);
		console.log(title);
		console.log(detail);
		console.log(price);

		let url = this.global.api + "insert/pricelists";
		let post = {
			'app_token': this.global.logintoken,
			'usertype': this.global.usertype,
			'userID': this.global.userdata.id,
			'typeID': typeID,
			'title': title,
			'detail': detail,
			'price': price
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
						//this.datas = data;
						this.addpriceerror = false;

						console.log('hasil disini');
						console.log(data);
						//this.router.navigateByUrl('tabs/full/(pricelist:pricelist)');

						//this.navCtrl.navigateRoot('tabs/full/(pricelist:pricelist)');

						//this.navCtrl.navigateBack();
					} else {
						console.log("ERROR OUTPUT FROM " + url);
						this.addpriceerror = true;
					}
				}
			}
		);
  }

}
