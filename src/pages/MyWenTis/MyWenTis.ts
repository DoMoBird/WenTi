import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Login } from '../login/login';
import { myService } from '../../providers/myService/myService';
import { roomPage } from '../room/room';
import { createQuestionPage } from '../createQuestion/createQuestion';
import { createRoomPage } from '../createRoom/createRoom';
import * as firebase from 'firebase';
import { } from '@angular/router';

@Component({
  selector: 'MyWentis',
  templateUrl: 'MyWenTis.html'
})
export class MyWenTisPage {

	datos_recuperados: any;
	imageUrl:any;
	datos_detail: any;
	roomImg: any;
	

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

	ngOnInit(){
		console.log("entramos en el init");
		this._myservice.getRoomList().subscribe(Rooms => {
			this.datos_recuperados=Rooms
			console.log("el datos_recuperados es "+ this.datos_recuperados);
				
	})

	

	/*for(var img in this.datos_recuperados.path){
				console.log("el img es"+""+this.datos_recuperados[img]);
				let storageRef = firebase.storage().ref();
				storageRef.child(img).getDownloadURL().then((url) => {
				this.imageUrl = url
			}).catch((error) =>{
				console.log(error);
			})
			}
	
			/*let storageRef = firebase.storage().ref();
			let spaceRef = storageRef.child(this.datos_recuperados.path);
			storageRef.child(this.datos_recuperados.path).getDownloadURL().then((url) => {
				this.imageUrl = url
			}).catch((error) =>{
				console.log(error);
			})*/
			

		
	}

	viewRoom(item){

		for(var p in this.datos_recuperados) {
			if(this.datos_recuperados[p].pin == item){
			console.log("el valor de p es "+p);
			console.log("dentro del for"+this.datos_recuperados[p].pin);
			console.log("la imagen es", this.datos_recuperados[p].path);
			//this._myservice.changeImgURL(this.datos_recuperados[p], this.imageUrl);
			this.navCtrl.push(roomPage, {
				room_datos: this.datos_recuperados[p],
				indice: p,
				key: this.datos_recuperados[p].$key
			});
		}
	}
	
	
	}

	startQuestion(item){
		//this._myservice.openRoom(0).subscribe(c => this.datos_recuperados=c);
		/*for(var p in this.datos_recuperados) {
			if(this.datos_recuperados[p].pin == item){
			this.navCtrl.push(roomPage, this.datos_recuperados[p]);
		}
	}*/
	
	let storageRef = firebase.database().ref().child('Rooms');
	storageRef.on('value', function(snapshot){
		let valor_room = snapshot.val();
		if(valor_room.pin==item){
			this.navCtrl.push(roomPage, valor_room);
		}
	})
	}

	newRoom(){
		this.navCtrl.push(createRoomPage);
	}

}