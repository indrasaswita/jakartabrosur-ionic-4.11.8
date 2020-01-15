import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PricelistPage } from './pricelist.page';
import { HttpClientModule, HttpClient } from '@angular/common/http';
/*import { AddpricePage } from '../pricelist/addprice/addprice.page';*/

const routes: Routes = [
  {
    path: '',
    component: PricelistPage
  }/*,
  {
    path: '/addprice',
    component: AddpricePage
  }*/
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PricelistPage],
  providers: [
    HttpClient
  ]
})
export class PricelistPageModule {}
