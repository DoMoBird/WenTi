import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,  NavParams } from 'ionic-angular';
import { myService } from '../../providers/myService/myService';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html',
})
export class profilePage{

    constructor(public nav: NavController, private _myservice: myService){

    }




}