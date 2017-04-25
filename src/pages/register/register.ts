import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,  NavParams } from 'ionic-angular';
import { AuthProviders, AuthMethods, AngularFire, FirebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage{
  user = {email: '', password:''};
  public loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire,
  public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  /*register(){
    this.showLoading();
    
    this.angfire.auth.createUser(this.user).then((authData) =>{
      setTimeout(() =>{
        this.loading.dismiss();
      });
      let prompt = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'Your new Account was created',
        buttons: ['OK']
      });
      prompt.present();
    }).catch((error)=>{
      this.showError(error);
    });
    
  }*/

   showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
 
  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let prompt = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
  }
}