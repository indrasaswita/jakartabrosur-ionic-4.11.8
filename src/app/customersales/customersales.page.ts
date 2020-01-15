import { Component, OnInit } from '@angular/core';
import {GlobalsService} from "../globals.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BarcodeScannerOptions} from "@ionic-native/barcode-scanner/ngx";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";

@Component({
	selector: 'app-customersales',
	templateUrl: './customersales.page.html',
	styleUrls: ['./customersales.page.scss'],
})
export class CustomersalesPage implements OnInit {
	customers: any;

	constructor(
		public global: GlobalsService,
		public http: HttpClient,
		public router: Router,
		private barcodeScanner: BarcodeScanner
	) {
		this.customers = null;
	}

	ngOnInit() {
		this.getcustomersalesdata();
	}
	
	getcustomersalesdata(){
		this.customers = null;
	}
	
	goToBarcodeScan() {
		const options: BarcodeScannerOptions = {
			preferFrontCamera: false,
			showFlipCameraButton: false,
			showTorchButton: true,
			torchOn: false,
			prompt: 'Place a barcode inside the scan area',
			resultDisplayDuration: 500,
			formats: 'QR_CODE,PDF_417 ',
			orientation: 'portrait',
		};
		
		console.log("abcdefg");
		
		this.barcodeScanner.scan().then(barcodeData => {
			console.log(barcodeData);
			if(barcodeData.cancelled){
				console.log("Cancel by user");
			}else{
				console.log(barcodeData.format+": "+barcodeData.text);
			}
		}).catch(err => {
			console.log('Error', err);
		});
		
		
		/*this.barcodeScanner.scan().then(barcodeData => {
			console.log("TAI KUDA");
		});*/
		
		/*this.barcode.scan(options).then(barcodeData => {
			console.log('Barcodgloe data', barcodeData);
			this.scannedData = barcodeData;

		}).catch(err => {
			console.log('Error', err);
		});*/
	}
	
	
	// goToCreateCode() {
	// 	// 	this.barcodeCtrl.encode(this.barcodeCtrl.Encode.TEXT_TYPE, this.encodeData).then((encodedData) => {
	// 	// 		console.log(encodedData);
	// 	// 		this.encodedData = encodedData;
	// 	// 	}, (err) => {
	// 	// 		console.log('Error occured : ' + err);
	// 	// 	});
	// 	// }

}
