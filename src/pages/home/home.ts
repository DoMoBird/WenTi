import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';
import { myService } from '../../providers/myService/myService';
import { roomPage } from '../room/room';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	datos_recuperados: any;
	datos2: any;

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
		//this._myservice.getRoomList().subscribe(c => this.datos_recuperados=c);
		
    
	}

	viewList(item){

		for(var p in this.datos_recuperados) {
			if(this.datos_recuperados[p].pin == item){
			this.navCtrl.push(roomPage, this.datos_recuperados[p]);
		}
		}
	}

	startQuestion(item){
		this._myservice.openRoom(0).subscribe(c => this.datos2=c);
		for(var p in this.datos_recuperados) {
			if(this.datos_recuperados[p].pin == item){
			//this.navCtrl.push(roomPage, this.datos_recuperados[p],);
			this.navCtrl.push(roomPage, {
				roomDatos: this.datos_recuperados[p],
				index: p
			})
		}
		}
	}

}
