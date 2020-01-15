import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CartdetailsPage } from './cartdetails.page';

const routes: Routes = [
  {
    path: '',
    component: CartdetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CartdetailsPage]
})
export class CartdetailsPageModule {}
