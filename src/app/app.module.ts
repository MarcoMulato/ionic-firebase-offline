import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';
import { AddComponent } from './modals/add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Network } from '@ionic-native/network/ngx';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyB44h1zhgzNYAyNX00DozBsTggnrQQ_1Hc",
  authDomain: "persons-b842f.firebaseapp.com",
  databaseURL: "https://persons-b842f.firebaseio.com",
  projectId: "persons-b842f",
  storageBucket: "persons-b842f.appspot.com",
  messagingSenderId: "1088451140724"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [AppComponent,AddComponent],
  entryComponents: [AddComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,  
    IonicStorageModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Network
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
