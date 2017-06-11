import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,  NavParams, ToastController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
//import * as firebase from 'firebase';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage{
  newuser = {email: '', password:'', userName:''};
  public loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire,
  public loadingCtrl: LoadingController, public alertCtrl: AlertController,
   public authservice: AuthProvider, public toastCtrl: ToastController ) {
  }

  

  register(){
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.userName == '') {
      toaster.setMessage('All fields are required dude');
      toaster.present();
    }
    else if (this.newuser.password.length < 7) {
      toaster.setMessage('Password is not strong. Try giving more than six characters');
      toaster.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Please wait'
      });
      loader.present();
      this.authservice.signupUser(this.newuser).then((res: any) => {
        loader.dismiss();
        if (res.success)
          this.navCtrl.setRoot(HomePage);
        else
          alert('Error' + res);
      })
    }
  }

  goback(){
    this.navCtrl.pop();
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