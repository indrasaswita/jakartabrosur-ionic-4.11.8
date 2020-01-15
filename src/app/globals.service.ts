import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
	public onesignalID : any = null;
	public logintoken: any = null;
	public userdata: any = null;
	public usertype: string = null;
	public api: string = null;


	public expenseprices: any = [];
	public employees: any = [];
	public customers: any = [];
	public customerpayment: any = [];
	public customersales: any = [];
	public roles: any = [];
	public papers: any = [];
	public customeracc: any = null;
	public curls: any = [];
	//public custbankaccs: any = [];
	public salespaymentverif: any = [];
	public loginerror: boolean = false;

	public loginloading: boolean = false;
	public employeesdownloading: boolean = false;
	public customersdownloading: boolean = false;
	public customerpaymentdownloading: boolean = false;
	public customersalesdownloading: boolean = false;
	public rolesdownloading: boolean = false;
	public expensepricesdownloading: boolean = false;
	public papersdownloading: boolean = false;
	public curldownloading: boolean = false;

	public errormessage: string = "TEST";
	public errormessageshow: boolean = false;
	public loadingshow: boolean = false;

	private httpresult: Observable<any>;

  constructor(
		private http: HttpClient,
		private router: Router
	) {
		this.userdata = {
			'name': "[ not set ]"
		};
		this.api = "http://www.jakartabrosur.com/API/io/";
		this.api = "http://localhost/jakartabrosur/public/API/io/";
  }
  
	makeDate = function($input){
		if ($input == null) return null;
		if ($input == 'null') return null;
		let temp = $input.split(' ')[0];
		temp = temp.split('-');
		return new Date(temp[0], temp[1]-1, temp[2]);
	}
	
	makeDateTime = function($input){
		if ($input == null) return null;
		if ($input == 'null') return null;
		if ($input == '') return null;
		let temp = $input.split(' ')[0];
		temp = temp.split('-');
		let temp2 = $input.split(' ')[1];
		temp2 = temp2.split(':');
		return new Date(temp[0], temp[1]-1, temp[2], temp2[0], temp2[1], temp2[2]);
	}

	zeroFill = function ( number, width )
	{
		if (number == null) return "null";
		width -= number.toString().length;
		if ( width > 0 )
		{
			return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
		}
		return number + ""; // always return a string
	}

	singkatText = function(text, totalhuruf, simbolakhir)
	{
		let hasil = "";

		if(text == null || totalhuruf == null || simbolakhir == null)
			return '-';
		else {
			if (simbolakhir == '') {
				hasil = this.singkatText0(text, totalhuruf);
			} else {
				if (text.length > totalhuruf) {
					let indexSimbol = text.lastIndexOf(simbolakhir) - 2;
					let panjangAkhir = text.length - indexSimbol;
					let panjangDepan = (totalhuruf - panjangAkhir < 5 ? 5 : totalhuruf - panjangAkhir);
					let depan = text.substring(0, panjangDepan);
					let belakang = text.substring(indexSimbol);
					let hasil = depan + "..." + belakang;
				} else {
					hasil = text;
				}
			}

			if (hasil.length > totalhuruf + 3) {
				hasil = this.singkatText0(text, totalhuruf);
			}

			return hasil;
		}
	}

	singkatText0 = function(text, totalhuruf)
	{
		if(text==null)
			return '-';
		if(text.length > totalhuruf)
		{
			let depan = text.substring(0, totalhuruf);
			return depan+"...";
		}
		else
		{
			return text;
		}
	}

	showerror(error){
  	let self = this;
		this.errormessage = error;
		self.errormessageshow = true;
  	setTimeout(function(){
			self.errormessageshow = false;
		}, 5000);
	}

	hideerror(){
  	this.errormessageshow = false;
	}

	dopost(url:string, whendone, whenfailed, postdata=null){
		if(!this.loadingshow) {
			this.loadingshow = true;

			let post = {
				'app_token': this.logintoken,
				'usertype': this.usertype,
				'userID': this.userdata.id
			};

			if(postdata != null){
				Object.assign(post, postdata);
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
							if(whendone instanceof Function)
								whendone(data);
						} else {
							console.log('ERROR OUTPUT FROM ' + url);
							this.router.navigateByUrl('');
							if(whendone instanceof Function)
								whenfailed();
						}
					}
					this.loadingshow = false;
				}, error => {
					console.log(error);
					this.loadingshow = false;
					if(whendone instanceof Function)
						whenfailed(error);
				}
			);
		}
	}


}
