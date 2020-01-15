import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GlobalsService } from '../globals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salelist',
  templateUrl: './salelist.page.html',
  styleUrls: ['./salelist.page.scss'],
})
export class SalelistPage implements OnInit {

	
	tab: string = '';
	constructor(
		public global: GlobalsService,
		public http: HttpClient,
		public router: Router
	) {
		this.tab = 'carts';
		//this.getData(this.tab);
	}

	ngOnInit() {
		//this.global.cartsdownloading = true;
	}
	



	setTab(value: string) {
		if (value != this.tab) {
			this.tab = value;
		}
	}


}
