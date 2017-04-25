import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';
import { myService } from '../../providers/myService/myService';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	datos_recuperados = [];

  constructor(public navCtrl: NavController, private _myservice: myService) {
  	/*window.localStorage.removeItem('currentuser');
  	if (!this.isLoggedin()){
  		console.log('You are not loggerd in');
  		this.navCtrl.push(Login);
  	}
  }

  isLoggedin() {
  	if (window.localStorage.getItem('currentuser')){
  		return true;
  	}*/
  }

	ngOnInit(): void{
		console.log("entramos en el init");
		this._myservice.getDatos().subscribe(c => this.datos_recuperados=c);
	}

}
