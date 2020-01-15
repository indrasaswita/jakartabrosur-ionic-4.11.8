import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { SalelistPage } from './salelist.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(
      [
        {
          path: '',
          component: SalelistPage
        }
      ]
    )
  ],
  declarations: [SalelistPage],
  providers: [
    HttpClient
  ]
})
export class SalelistPageModule {}
