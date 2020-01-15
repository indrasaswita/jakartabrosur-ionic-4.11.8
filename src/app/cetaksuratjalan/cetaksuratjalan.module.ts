import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CetaksuratjalanPage } from './cetaksuratjalan.page';

const routes: Routes = [
  {
    path: '',
    component: CetaksuratjalanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CetaksuratjalanPage]
})
export class CetaksuratjalanPageModule {}
