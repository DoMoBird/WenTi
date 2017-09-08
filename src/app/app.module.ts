import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/Auth';
import * as firebase from 'firebase';
import {AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { mainLoginPage } from '../pages/mainLogin/mainLogin';
import { studentLoginPage } from '../pages/studentLogin/studentLogin';
import { Login } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MyWenTisPage } from '../pages/MyWenTis/MyWenTis';
import { roomPage } from '../pages/room/room';
import { profilePage } from '../pages/profile/profile';
import { questionCheckbox } from '../pages/question_checkbox/question';
import { HttpModule } from '@angular/http';
//import { ChartsModule } from 'ng2-charts/charts/charts';
import { Chart } from 'chart.js';
import { createQuestionPage } from '../pages/createQuestion/createQuestion';
import { createRoomPage } from '../pages/createRoom/createRoom';
import { AuthProvider } from '../providers/auth/auth';
import { config } from './app.firebaseconfig';
import { questions } from '../pages/questions/questions';
import { resultadoTotalPage } from '../pages/resultadoTotal/resultadoTotal';
import { resultadoPage } from '../pages/resultado/resultado';
//graficos
import { ChartsModule } from 'ng2-charts';


/*import { myService } from '../providers/myService/myService';*/

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';




  // Initialize Firebase
 

  /*const config = {
    apiKey: "AIzaSyA6bZBIuC4UsF6HmXIkuXdWDPWNZWBBiL0",
    authDomain: "wentibd.firebaseapp.com",
    databaseURL: "https://wentibd.firebaseio.com",
    projectId: "wentibd",
    storageBucket: "wentibd.appspot.com",
    messagingSenderId: "411517629942"
  };*/
  


@NgModule({
  declarations: [
    MyApp, HomePage, ListPage, Login, RegisterPage, MyWenTisPage, mainLoginPage, studentLoginPage, roomPage, questionCheckbox,
     profilePage,createQuestionPage, createRoomPage, questions, resultadoPage, resultadoTotalPage
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    HttpModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, HomePage, ListPage, Login, RegisterPage, MyWenTisPage, mainLoginPage, studentLoginPage, roomPage, questionCheckbox,
    profilePage, createQuestionPage, createRoomPage, questions, resultadoPage, resultadoTotalPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth
    
  ]
})
export class AppModule {}
