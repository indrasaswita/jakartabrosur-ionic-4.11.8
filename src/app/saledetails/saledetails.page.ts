import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-saledetails',
  templateUrl: './saledetails.page.html',
  styleUrls: ['./saledetails.page.scss'],
})
export class SaledetailsPage implements OnInit {

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

	toggleCartheader(input) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				special: JSON.stringify(input)
			}
		};
		this.router.navigate(['cartdetails'], navigationExtras);
	}

}
