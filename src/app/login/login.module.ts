import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';

const routes: Routes = [
	{
		path: '',
		component: LoginPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		IonicModule,
		RouterModule.forChild(routes),
		IonicStorageModule
	],
	declarations: [LoginPage],
	providers: [
		HttpClient
	]
})
export class LoginPageModule {}
