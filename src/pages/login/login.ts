import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,  NavParams } from 'ionic-angular';
import { AuthProviders, AuthMethods, AngularFire, FirebaseAuthState } from 'angularfire2';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';


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
  public loginForm:FormGroup;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire,
  public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authProvider: AuthProvider,
   public formBuilder: FormBuilder, public authservice: AuthProvider) {
  
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, 
        EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), 
        Validators.required])]
    });

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }


  register(){
    this.navCtrl.push(RegisterPage);
  }



  /*login(){
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
  }*/

  

  login(){
    this.showLoading();
    this.authservice.loginUser(this.email, this.password).then((res: any) => {
      if (!res.code){
        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      }else
        alert(res);
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
