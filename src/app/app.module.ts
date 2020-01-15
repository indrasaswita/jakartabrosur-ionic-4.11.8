import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {IonicModule, IonicRouteStrategy, Platform, ToastController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {DatePicker} from '@ionic-native/date-picker/ngx';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthenticationService} from './services/authentication.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    BarcodeScanner,
    DatePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //{ provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthGuardService,
    AuthenticationService,
    Platform,
    ToastController
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
