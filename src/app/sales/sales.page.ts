import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
	
	private sales: any = [];
	private lastsalesloadid: number = 0;
	private lastsalesid: number = 0;
	
  constructor(
  	private global: GlobalsService,
  	private router: Router,
	) { }

  ngOnInit() {
		this.sales = [];
  	console.log(this.sales);
  }
  
  ngOnDestroy(){
  	console.log("Sales.page.ts destroyed");
	}
	
	
	ionViewWillEnter(){
		this.getsaledata();
	}
	
	getsaledata(event=null){
		let url = this.global.api + "select/allsales";
		let self = this;
		
		this.global.dopost(url, function(data){
			if(data[1].length>0) {
				data[1].forEach(($ii, $i) => {
					$ii.showdetail = false;
					$ii.created_at = self.global.makeDateTime($ii.created_at);
				});
				
				if(self.sales.length>0)
					self.sales = self.sales.concat(data[1]);
				else
					self.sales = data[1];
				
				if(self.lastsalesloadid == 0){
					self.lastsalesid = self.sales[0].id;
				}
				self.lastsalesloadid = self.sales[self.sales.length-1].id;
				
				if(data[0]==2){
					event.target.disabled = true;
				}
			}
		}, function(error){
		
		}, {
			"lastid": self.lastsalesid,
			"lastload": self.lastsalesloadid,
			"limit": 21
		})
	}
	
	doloaddata(event){
		setTimeout(() => {
			console.log('Done');
			this.getsaledata(event);
			event.target.complete();
			
			// App logic to determine if all data is loaded
			// and disable the infinite scroll
			/*if (this.sales[this.sales.length-1].id == 1) {
				event.target.disabled = true;
			}*/
		}, 500);
	}


  toggleSaleheader(input){
  	let navigationExtras:NavigationExtras = {
  		queryParams: {
  			special: JSON.stringify(input)
  		}
  	};

  	this.router.navigate(['saledetails'], navigationExtras);
  }

}
