import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,  NavParams } from 'ionic-angular';
import { myService } from '../../providers/myService/myService';
import { roomPage } from '../room/room';



@Component({
  selector: 'page-studentLogin',
  templateUrl: 'studentLogin.html',
})
export class studentLoginPage{


    public grupo = '';
    public pin = '';
    public room_datos: any;
    public item = '';
    public loading: Loading;

    constructor(public nav: NavController, private _myservice: myService,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController){
    }

    ngOnInit(): void{
		console.log("entramos en el init");
		this._myservice.getRoomList().subscribe(c => this.room_datos=c);
	}

    roomEnter(){
     
      for ( var p in this.room_datos ){

        if(this.room_datos[p].pin == this.pin && this.room_datos[p].open==true){
          
          console.log("encontramos pin igual en elemento "+p+" y recuperamos "+this.room_datos[p].pin);
          this.nav.push(roomPage, {
            room_datos: this.room_datos[p],
            key: this.room_datos[p].$key,
            grupo: this.grupo
          });
        }

      }


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
