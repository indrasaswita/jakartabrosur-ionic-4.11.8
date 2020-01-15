import { IonicModule, NavController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HomePage } from './home.page';
import { Observable } from 'rxjs/Observable';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(
      [
        {
          path: '',
          component: HomePage
        }
      ]
    )
  ],
  declarations: [HomePage],
  providers: [
    HttpClient
  ]
})

export class HomePageModule {



}
