import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfirmationbyemployeePage } from './confirmationbyemployee.page';
import {AlertController} from "@ionic/angular";

const routes: Routes = [
  {
    path: '',
    component: ConfirmationbyemployeePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfirmationbyemployeePage],
  providers: [
    AlertController
  ]
})
export class ConfirmationbyemployeePageModule {}
