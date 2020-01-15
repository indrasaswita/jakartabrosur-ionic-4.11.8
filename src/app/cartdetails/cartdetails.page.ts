import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import { GlobalsService } from '../globals.service';

@Component({
	selector: 'app-cartdetails',
	templateUrl: './cartdetails.page.html',
	styleUrls: ['./cartdetails.page.scss'],
})
export class CartdetailsPage implements OnInit {

	data:any;

	constructor(
		private global: GlobalsService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) { 
		this.activatedRoute.queryParams.subscribe(params => {
			if (params && params.special) {
				this.data = JSON.parse(params.special);
				console.log(this.data);
			}
		});
	}

	ngOnInit() {

	}
	
	ngOnDestroy(){
		console.log("CARTDETAILS.page.ts destroyed");
	}
	
	konfirmasi(input){
		let navigationExtras: NavigationExtras = {
			queryParams:{
				special: JSON.stringify(input)
			}
		};
		this.router.navigate(['confirmationbyemployee'], navigationExtras);
		console.log(input);
		
	}
	
	suratjalan(input){
		let navigationExtras: NavigationExtras = {
			queryParams:{
				special: JSON.stringify(input)
			}
		};
		this.router.navigate(['cetaksuratjalan'], navigationExtras);
		console.log(input);
	}

}
