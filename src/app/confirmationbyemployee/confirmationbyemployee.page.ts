import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalsService } from "../globals.service";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import * as moment from 'moment';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AlertController } from "@ionic/angular";

@Component({
	selector: 'app-confirmationbyemployee',
	templateUrl: './confirmationbyemployee.page.html',
	styleUrls: ['./confirmationbyemployee.page.scss'],
})
export class ConfirmationbyemployeePage implements OnInit {
	
	httpresult : Observable<any>;
	result: Observable<any>;
	urlrefresh: string = 'http://localhost/jakartabrosur/public/API/admin/compaccs/1/bca/refresh';
	urlread: string = 'http://localhost/jakartabrosur/public/API/admin/compaccs/1/bca/read';
	
	private paydialogstatus: string = "";
	private paydialogshow: boolean = false;
	private mutationtableshow: boolean = false;
	private showsalestypes: string = "paid";
	private showsalesloading: boolean = false;
	private showsaleserrormessage: string = "";
	
	private salesheaderID: any;
	private paydialog: any;
	private salesnotverifs: any = [];
	private salesnopayments: any = [];
	private companybankaccs: any = [];
	private salespayment: any = [];
	private custbankaccs: any = [];
	private newcustbanksacc: any = [];
	private companybankaccmutation: any = [];
	private note: any;
	private ammount: any;
	private selectedcompanybank: any;
	private selectedsalesheaderindex: number = -1;
	accountno: any = [];
	//bank: any = '';
	accname: any;
	salesID: any;
	//id: any;
	myDate: any;
	customerbankmutationID : number = 0;
	customerbankaccID: any = '';
	paymentID: any = '';
	//ishidden: boolean = false;
	
	constructor(
		private global: GlobalsService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private http: HttpClient,
		private datePicker: DatePicker,
		private alertController: AlertController
	) {
		
		
		this.activatedRoute.queryParams.subscribe(params => {
			this.salesheaderID = JSON.parse(params.sid);
		});
	}

	ngOnInit() {
		if(this.salesheaderID != null){
			this.setshowsalestype('paid');
		}
		this.getcompanybankaccount();
		this.getusedcurl(0);
	}
	
	getcustomeracc(input){
		let url = this.global.api+"select/getsalespaymentbycartid";
		let post = {
			'app_token': this.global.logintoken,
			'usertype': this.global.usertype,
			'userID': this.global.userdata.id,
			'cartID' : input
		};
		
		this.result = this.http.post(
			url,
			post,
			{
				responseType: 'json'
			}
		);
		
		this.result.subscribe(
			response => {
				if(response != null){
					if(response instanceof Object){
						this.global.customeracc = response;
						
						this.global.customeracc.salespayment.forEach((item, index) => {
							item.myDate = this.global.makeDate(item.myDate);
						})
						console.log(this.global.customeracc);
					}
					else{
						console.log('ERROR OUTPUT FROM ' + url);
						this.router.navigateByUrl('');
					}
				}
			}
		);
	}
	
	async showselectcustomerbank($activecustomerbankaccs){
		console.log('alert');
		let inputs = [];
		let abc = $activecustomerbankaccs;
		abc.forEach(($ii, i) => {
			if($ii.bank.alias!=''){
				inputs.push({
					type: 'radio',
					label: $ii.bank.alias + '-' + $ii.accname + '-' + $ii.accno,
					value: $ii.id
				});
			}
			else{
				inputs.push({
					type: 'radio',
					label: $ii.bank.bankname + '-' + $ii.accname + '-' + $ii.accno,
					value: $ii.id
				});
			}
		});
		
		let normal = "<div class='confirm-bankacc'>";
		abc.forEach(($ii, $i)=>{
			normal += "<div class='check-wrapper' (click)='selectcustomerbankacc()'>" +
				"<div class=\"check\">\n" +
				"\t<label class=\"custom-checkbox\">\n" +
				"\t\t<input type=\"checkbox\" ng-model=\"allchecked\" ng-click=\"checkAll()\">\n" +
				"\t\t<span class=\"checkmark\"></span>\n" +
				"\t</label>\n" +
				"</div>"+
				"<div class='text'>" +
				"\t"+ $ii.bank.bankname + '-' + $ii.accname + '-' + $ii.accno +
				"</div>"+
			"</div>";
		});
		normal += '</div';
		
		const alert = await this.alertController.create({
			header: "Customer Bank Account",
			message: normal,
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
					}
				}, {
					text: 'Ok',
					handler: () => {
						console.log('Confirm Ok');
					}
				}
			]
		});
		
		alert.present();
	}
	
	getcompanybankaccount(){
		let url = this.global.api+"select/getcompanybankaccount";
		let post = {
			'app_token': this.global.logintoken,
			'usertype': this.global.usertype,
			'userID': this.global.userdata.id
		};
		
		this.result = this.http.post(
			url,
			post,
			{
				responseType:'json'
			}
		);
		
		this.result.subscribe(
			response => {
				if(response != null){
					if(response instanceof Array){
						this.companybankaccs = response;
					}
					else{
						console.log("not Array");
					}
				}
				else{
					console.log("kosong");
					this.router.navigateByUrl('');
				}
			}
		);
	}
	
	onchangecustomerbank($selectedcustomerbank){
		let text = $selectedcustomerbank.detail.text.split("-");
		console.log($selectedcustomerbank.detail);
		console.log('masuk onchange');
		this.paydialog.custbankaccname = text[1];
		this.paydialog.custbankaccno = text[2];
	}
	
	onchangecompanybank($selectedcompanybank){
		console.log($selectedcompanybank);
		let text = $selectedcompanybank.detail.text.split("-");
		this.paydialog.compbankaccname = text[1];
		this.paydialog.companybankaccno = text[2];
	}
	
	getbcarefresh(){
		console.log(this.paydialog);
		if(!this.global.curldownloading)
		{
			this.global.curls = [];
			this.global.curldownloading = true;
			var yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
			console.log(yesterday);
			let post = {
				'app_token': this.global.logintoken,
				'usertype': this.global.usertype,
				'userID': this.global.userdata.id
			};
			this.result = this.http.post(
				this.urlrefresh,
				post,
				{
					responseType: 'json'
				}
			);
			
			this.result.subscribe(
				response =>{
					if(response != null){
						if(response instanceof Array){
							console.log(response);
							response.forEach((item, index) =>{
								if(item.mutationNote.includes('CR')){
									var dates = moment(item.mutationDate).format("YYYY-MM-DD");
									console.log(dates);
									if(yesterday<=dates){
										item.curlshow = false;
										let count = item.mutationNote.split(";");
										item.name = count[count.length-2];
										this.global.curls.push(item);
									}
								}
							})
							console.log(this.global.curls);
							this.global.curldownloading = false;
							console.log("sampai sini refresh");
						}
						else{
							this.global.curldownloading = true;
							console.log('ERROR OUTPUT');
							this.router.navigateByUrl('');
						}
					}
				}
			);
		}
	}
	
	getbcaread(){
		console.log(this.paydialog);
		if(!this.global.curldownloading){
			this.global.curls = [];
			this.global.curldownloading = true;
			var yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
			this.result = this.http.get(this.urlread,
				{
				responseType: 'json'
				}
			);
			
			this.result.subscribe(
				response =>{
					if(response != null){
						if(response instanceof Array){
							response.forEach((item, index) =>{
								if(item.mutationNote.includes('CR')){
									item.curlshow = false;
									let count = item.mutationNote.split(";");
									item.name = count[count.length-2];
									var dates = moment(item.mutationDate).format("YYYY-MM-DD");
									if(dates>=yesterday){
										this.global.curls.push(item);
									}
								}
							})
							this.global.curldownloading = false;
							console.log("sampai sini read");
						}
						else{
							this.global.curldownloading = true;
							console.log('ERROR OUTPUT');
							this.router.navigateByUrl('');
						}
					}
				}
			);
		}
	}
	
	konfirmasipembayaran($paydialog){
		console.log('konfirmasi pembayaran');
		console.log('index: ' + this.selectedsalesheaderindex);
		let url = this.global.api + "insert/insertverif";
		if(this.paydialogstatus != 'nopayment'){
			this.paymentID = '';
		}
		
		let post = {
			'app_token'								: this.global.logintoken,
			'usertype'								: this.global.usertype,
			'userID'									: this.global.userdata.id,
			'salesID'									: $paydialog.salesID,
			'paymentID'								: this.paymentID,
			'ammount'									: $paydialog.ammount,
			'paydate'									: this.myDate,
			'customerID'							: $paydialog.customerID,
			'customerbankmutationID'	: this.customerbankmutationID,
			'customerbankaccID'				: this.customerbankaccID,
			'companybankaccID'				: this.selectedcompanybank,
			'statuspembayaran'				: this.paydialogstatus
		};
		
		this.result = this.http.post(
			url,
			post,
			{
				responseType: 'json'
			}
		);

		this.result.subscribe(
			response => {
				if(response != null){
					if(response instanceof Object){
						console.log(response);
						if(this.paydialogstatus == 'nopayment'){
							console.log('masuk no payment');
							this.salesnotverifs.splice(0, 0, response);
							this.salesnopayments.splice(this.selectedsalesheaderindex-1, 1);
							//this.salesnotverifs.push(response);
							console.log('splice no payment');
						}
						else if(this.paydialogstatus == 'notverif'){
							console.log('masuk notverif');
							this.salesnotverifs[this.selectedsalesheaderindex-1] = response;
							console.log('response not verif');
						}
					}
					alert('data berhasil disimpan');
				}
				else{
					alert('data gagal disimpan');
				}
			}
		);
	}
	
	// selectedaccount(event){
	// 	//console.log(event.target.value);
	// 	let val = event.target.value.split('-');
	// 	this.accname = val[1];
	// 	//this.bank = val[2];
	// }
	
	showDatepicker(){
		this.datePicker.show({
			date: new Date(),
			mode: 'date',
			androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
			okText:"OK",
			todayText:"Set Today"
		}).then(
			date => {
				this.myDate = date.getDate()+"/"+date.toLocaleString('default', { month: 'medium' })+"/"+date.getFullYear();
			},
			err => console.log('Error occurred while getting date: ', err)
		);
	}
	
	selecteddetail(input){
		this.getusedcurl(input.id);
		let a = input.mutationNote.split(";");
		let count = a.length;
		this.ammount = input.mutationAmmount;
		this.accname = a[count-2];
		this.myDate = moment(input.mutationDate).format('YYYY-MM-DD');
		this.customerbankmutationID = input.id;
	}
	
	hideallsalespayment(){
		if(this.salesnotverifs!=null) {
			this.salesnotverifs.forEach(($ii, i) => {
				$ii.salespaymentshow = false;
			});
		}
		if(this.salesnopayments!=null) {
			this.salesnopayments.forEach(($ii, i) => {
				$ii.salespaymentshow = false;
			});
		}
	}
	
	showsalespayment($item){
		this.hideallsalespayment();
		this.salesnotverifs.forEach(($ii, i) => {
			if($ii.id == $item.id)
				$ii.salespaymentshow = true;
		});
	}
	
	showdetailcurl($item){
		let $temp = $item.curlshow;
		this.global.curls.forEach(($ii, i) => {
			$ii.curlshow = false;
		});
		if($temp == false){
			$item.curlshow = true;
		}
	}
	
	showmutation(){
		this.getbcaread();
		this.mutationtableshow = true;
	}
	
	hidemutation(){
		this.mutationtableshow = false;
	}
	
	selectedmutation($curl){
		this.customerbankmutationID = $curl.id;
		this.paydialog.ammount = $curl.mutationAmmount;
		this.myDate = moment($curl.mutationDate).format('YYYY-MM-DD');
		this.mutationtableshow = false;
	}
	
	setshowsalestype(input){
		var self = this;
		this.paydialogstatus = '';
		this.paydialogshow = false;
		if(input == 'paid'){
			this.getsalesnotverif(function (){
				self.showsalestypes = input;
			}, function (errormessage) {
				self.showsalestypes = '';
				self.showsaleserrormessage = errormessage;
			});
		} else if(input=='nopayment'){
			this.getsalesnopayment(function (){
				self.showsalestypes = input;
			}, function (errormessage) {
				self.showsalestypes = '';
				self.showsaleserrormessage = errormessage;
			});
		}
	}
	
	showpaydialog($header, $selectedheaderindex, $payment) {
		console.log($header);
		this.selectedsalesheaderindex = $selectedheaderindex;
		
		if($payment != null){
			//brarti yang di klik adalah row pembayaran dari salesheader.salespayment
			this.paydialog = {
				"ammount": $payment.ammount,
				"paydate": $payment.created_at,
				"customerbankmutationID": null,
				"paymentID": $payment.id,
				"salesID": $payment.salesID,
				"customerID": $payment.customerID
			};
			if ($payment.salespaymentverif == null) {
				this.paydialogstatus = "notverif";
				this.paydialog.custbankname = $payment.customeracc.bank.bankname;
				this.paydialog.custbankaccname = $payment.customeracc.accname;
				this.paydialog.custbankaccno = $payment.customeracc.accno;
				this.paydialog.compbankname = $payment.companyacc.bank.bankname;
				this.paydialog.compbankaccname = $payment.companyacc.accname;
				this.paydialog.compbankaccno = $payment.companyacc.accno;
				this.paydialog.companybankalias = $payment.companyacc.bank.alias;
			} else {
				this.paydialogstatus = "verified";
				this.paydialog = {
					"custbankname": $payment.customeracc.bank.bankname,
					"custbankaccname": $payment.customeracc.accname,
					"custbankaccno": $payment.customeracc.accno,
					"compbankname": $payment.companyacc.bank.bankname,
					"compbankaccname": $payment.companyacc.accname,
					"compbankaccno": $payment.companyacc.accno,
					"companybankalias": $payment.companyacc.bank.alias
				};
				this.paydialog.verifdate = $payment.salespaymentverif.veriftime;
				this.paydialog.verifemployee = $payment.salespaymentverif.employee.name;
			}
		}else{
			//jika belum ada pemabaran, maka salesheader.salespayment masih kosong, sehingga dikirimnya null
		}
		
		this.paydialogshow = true;
	}
	
	shownopaymentdialog($nopayment){
		console.log($nopayment);
		console.log('no payment');
		this.hideallsalespayment();
		//this.custbankaccs = $nopayment.customer.customerbankacc;
		if($nopayment.salespayment==null) {
			this.paydialog = {
				"totalprice"			: $nopayment.totalprice,
				"salestime"				: $nopayment.created_at,
				"customerID" 			: $nopayment.customerID,
				"custbankaccname" : '',
				"custbankaccno"		: '',
				"custbankname"		: '',
				"ammount"					: 0,
				"salesID"					: $nopayment.id
			};
			this.paydialogstatus = "nopayment";
			$nopayment.salespaymentshow = true;
		}else{
			$nopayment.salespaymentshow = true;
		}
	}
	
	getsalesnotverif(whendone, whenfailed) {
		if (!this.showsalesloading) {
			this.showsalesloading = true;
			
			let url = this.global.api + "select/getpendingpayment";
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
			
			this.result.subscribe(
				response => {
					if (response != null) {
						this.salesnotverifs = response;
						this.salesnotverifs.forEach(($ii, $i) => {
							$ii.totalprice = 0;
							$ii.salespaymentshow = false;
							$ii.salesdetail.forEach(($jj, $j) => {
								$ii.totalprice += $jj.cartheader.printprice;
								$ii.totalprice += $jj.cartheader.deliveryprice;
								$ii.totalprice += $jj.cartheader.discount;
							});
						});
						if (whendone instanceof Function) {
							console.log(this.salesnotverifs);
							whendone();
						}
					} else {
						this.salesnotverifs = null;
						console.log('Data sales payment verif belum ada');
						if (whenfailed instanceof Function) {
							whenfailed('data return = null');
						}
					}
					this.showsalesloading = false;
				}, error => {
					if (whenfailed instanceof Function) {
						whenfailed('data return error');
					}
					this.showsalesloading = false;
				}
			);
		}
	}
	
	getsalesnopayment(whendone, whenfailed) {
		if(!this.showsalesloading){
			this.showsalesloading = true;
			
			let url = this.global.api + "select/getsalesnopayment";
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
			
			this.result.subscribe(
				response => {
					if (response != null) {
						this.salesnopayments = response;
						this.salesnopayments.forEach(($ii, $i) => {
							$ii.totalprice = 0;
							$ii.salespaymentshow = false;
							$ii.salesdetail.forEach(($jj, $j) => {
								$ii.totalprice += $jj.cartheader.printprice;
								$ii.totalprice += $jj.cartheader.deliveryprice;
								$ii.totalprice += $jj.cartheader.discount;
							});
						});
						if (whendone instanceof Function) {
							console.log(this.salesnopayments);
							whendone();
						}
					} else {
						console.log('data payment tidak ada/kosong');
						if (whenfailed instanceof Function) {
							whenfailed('data return = null');
						}
					}
					this.showsalesloading = false;
				}, error => {
					if (whenfailed instanceof Function) {
						whenfailed('data return error');
					}
					this.showsalesloading = false;
				}
			);
			
		}
	}
	
	insertcustomerbankacc(){
		console.log(this.paydialog.custbankaccname + 'name');
		let post = {
			'app_token' 							: this.global.logintoken,
			'usertype'								: this.global.usertype,
			'userID'									: this.global.userdata.id,
			//'customerID'							: $paydialog.customerID,
			//'bankID'									: this.bankID,
			'custaccname'							: this.accname,
			'custaccno'								: this.accountno
		};
		
		// this.ajaxinsert(post, function(response){
		// 	//whendone
		// 	this.custbankaccs = response;
		// }, function(errorstring, errordata=null){
		// 	//whenfailed
		// 	if(errorstring != ""){
		// 		this.errormessage = errorstring;
		// 	}
		// 	if(errordata != null){
		// 		console.log(errordata);
		// 	}
		// });
	}
	
	ajaxinsert(post, whendone, whenfailed){
		let url = this.global.api+"";
		
		this.result = this.http.post(
			url,
			post,
			{
				responseType: 'json'
			}
		);
		
		this.result.subscribe(
			response =>{
				if(response != null){
					if(response instanceof Array){
						whendone(response);
					}else{
						whenfailed("Hasil bukan berupa array");
					}
				}
				else{
					whenfailed("Data kosong.");
				}
			}, error => {
				whenfailed("Error", error);
			}
		);
	}
	
	getusedcurl(input){
		let url = this.global.api+"select/usedcurl";
		let post = {
			'app_token' 							: this.global.logintoken,
			'usertype'								: this.global.usertype,
			'userID'									: this.global.userdata.id
		};
		
		this.result = this.http.post(
			url,
			post,
			{
				responseType: 'json'
			}
		);
		
		this.result.subscribe(
			response =>{
				if(response != null){
					if(response instanceof Array){
						this.companybankaccmutation = [];
						this.companybankaccmutation = response;
						response.forEach((item, index)=>{
							if(this.companybankaccmutation[index].customerbankmutationID == input){
								alert('data sudah pernah dipilih');
							}
							else{
								console.log(this.companybankaccmutation[index].customerbankmutationID);
							}
						})
					}
					else{
						console.log('data mutasi bukan array');
					}
				}
				else{
					console.log('data mutasi masih kosong');
				}
			}
		);
	}
	
	
}
