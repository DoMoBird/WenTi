import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,  NavParams } from 'ionic-angular';

@Component({
  selector: 'page-MyWenTis',
  templateUrl: 'MyWenTis.html',
})
export class MyWenTisPage{


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }
}