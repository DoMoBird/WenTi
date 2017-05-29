import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Login } from '../login/login';
import { myService } from '../../providers/myService/myService';
import { roomPage } from '../room/room';
import { createQuestionPage } from '../createQuestion/createQuestion';
import { createRoomPage } from '../createRoom/createRoom';


@Component({
  selector: 'MyWentis',
  templateUrl: 'MyWenTis.html'
})
export class MyWenTisPage {

	datos_recuperados: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private _myservice: myService) {
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

	viewList(item){

		for(var p in this.datos_recuperados) {
			if(this.datos_recuperados[p].pin == item){
			this.navCtrl.push(roomPage, this.datos_recuperados[p]);
		}
		}
	}

	startQuestion(item){
		this._myservice.openRoom(0).subscribe(c => this.datos_recuperados=c);
		for(var p in this.datos_recuperados) {
			if(this.datos_recuperados[p].pin == item){
			this.navCtrl.push(roomPage, this.datos_recuperados[p]);
		}
		}
	}

	newRoom(){
		this.navCtrl.push(createRoomPage);
	}

}