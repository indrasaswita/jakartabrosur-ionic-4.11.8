import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditcustomerbankaccPage } from './editcustomerbankacc.page';

const routes: Routes = [
  {
    path: '',
    component: EditcustomerbankaccPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [EditcustomerbankaccPage]
})
export class EditcustomerbankaccPageModule {}
