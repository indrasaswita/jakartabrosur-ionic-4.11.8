import { Component, OnInit } from '@angular/core';
import {GlobalsService} from "../globals.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Location} from "@angular/common";



class Port {
  public id: number;
  public bankname: string;
}


@Component({
  selector: 'app-editcustomerbankacc',
  templateUrl: './editcustomerbankacc.page.html',
  styleUrls: ['./editcustomerbankacc.page.scss'],
})
export class EditcustomerbankaccPage implements OnInit {

  private customerbankacc: any = null;
  private bankserror: boolean = false;
  private banks: any = [];
  private httpresult: Observable<any>;
  private selectedbank: any = null;
  private customerbankloading: boolean = false;

  constructor(
    private global: GlobalsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.customerbankacc = JSON.parse(params.special);
        this.getbankdata();
      }
    });
  }

  ngOnInit() {
  }

  customerbankaccOptions: any = {
    header: 'Daftar Bank'
  };

  getbankdata(){
    this.banks = null;
    let url = this.global.api + "select/banks";
    let self = this;

    this.global.dopost(url, function(data){
      self.banks = data;

      let temp = 0;
      self.banks.forEach(($ii, $i) => {
        if ($ii.id == self.customerbankacc.bank.id) {
          temp = $ii.id;
        }
      });
      self.customerbankacc.bankID = 0;

      let self2 = self;
      setTimeout(function () {
        self2.customerbankacc.bankID = temp;
      }, 20);

      self.bankserror = false;
    }, function(error){
      self.bankserror = true;
    });
  }

  updatecustomerbankacc(bankacc){

    let post = {
      "id": bankacc.id,
      "accname": bankacc.accname,
      "accno": bankacc.accno,
      "acclocation": bankacc.acclocation,
      "bankID": bankacc.bankID,
    };
    let url = this.global.api+"update/customerbankacc";
    let this2 = this;

    this.global.dopost(url, function(data){
      if(data[0] == 1){
        //return ke page sebelomnya.
        let self = this2;
        setTimeout(function(){
          self.location.back();
        }, 3000);
      }else{
        console.log("error: "+data);
      }
      this2.global.showerror(data[1]);
    }, function(error){
      if(error.status != 200) {
        console.log("error from editcustomerbankacc.page.ts");
        this2.global.showerror("error");
      } else {
        console.log("Hasil Bukan JSON / Preflight Req.");
      }
    }, post);

  }

}
