import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,  NavParams } from 'ionic-angular';
import { Login } from '../login/login';
import { studentLoginPage } from '../studentLogin/studentLogin';



@Component({
  selector: 'page-mainLogin',
  templateUrl: 'mainLogin.html',
})
export class mainLoginPage{


    constructor(public nav: NavController){}

    teacher(){
        this.nav.push(Login);
    }

      student(){
        this.nav.push(studentLoginPage);
    }


}