import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddnewcustomerPage } from './addnewcustomer.page';
import { HttpClient, HttpClientModule } from "@angular/common/http";

const routes: Routes = [
	{
		path: '',
		component: AddnewcustomerPage
	}
];

// @ts-ignore
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		IonicModule,
		RouterModule.forChild(routes)
	],
	declarations: [AddnewcustomerPage],
	providers: [
		HttpClient,
		//HttpHandler // ga boleh pake
	]
})
export class AddnewcustomerPageModule {}
