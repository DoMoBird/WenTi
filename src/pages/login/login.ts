import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,  NavParams } from 'ionic-angular';
import { AuthProviders, AuthMethods, AngularFire, FirebaseAuthState } from 'angularfire2';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login{
  

	email: any;
	password: any;
  public loading: Loading;
  /*loader: any;
  user = {email: '', password: ''};*/

  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire,
  public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }


  register(){
    this.navCtrl.push(RegisterPage);
  }

   /*login() {
    this.showLoading()
 
    this.angfire.auth.login(this.user, {
      provider: AuthProviders.Password,
        method: AuthMethods.Password
    }).then((authData) => {
      this.loader.dismiss();
      this.navCtrl.setRoot(HomePage);
    }).catch((error) => {
      console.log(error);
    });
  }*/

  login(){
    this.showLoading();
  	this.angfire.auth.login({
      
      email: this.email,
      password: this.password
},
    {  
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then((response)=> {
      console.log('login success' + JSON.stringify(response));
      let currentuser = {
        email: response.auth.email,
        picture: response.auth.photoURL
      };
      window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
      this.loading.dismiss();
      this.navCtrl.push(HomePage);
    }).catch((error)=> {
      console.log(error);
    })
  }



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
