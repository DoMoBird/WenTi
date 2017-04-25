import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { MyWenTisPage } from '../pages/MyWenTis/MyWenTis';
import { mainLoginPage } from '../pages/mainLogin/mainLogin';
import { myService } from '../providers/myService/myService';

import {FIREBASE_PROVIDERS,
  defaultFirebase,
  AngularFire,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig} from 'angularfire2';


@Component({
  templateUrl: 'app.html',
  /*providers: [
    FIREBASE_PROVIDERS,
    defaultFirebase({
      apiKey: "AIzaSyA6bZBIuC4UsF6HmXIkuXdWDPWNZWBBiL0",
      authDomain: "wentibd.firebaseapp.com",
      databaseURL: "https://wentibd.firebaseio.com/",
       storageBucket: "wentibd.appspot.com"
    })
  ]*/
  providers: [
    myService
    
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = mainLoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
       { title: 'MyWenTis', component: MyWenTisPage }
    ];

  }

  


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
