import { Component, ChangeDetectionStrategy, Input, NgZone } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Login } from '../login/login';
import { myService } from '../../providers/myService/myService';
import { roomPage } from '../room/room';
import { Camera } from 'ionic-native';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'createRoom',
  templateUrl: 'createRoom.html'
})
export class createRoomPage {

  title: any;
  idRoom: number;
  descripcion: any;
  image: any;
  my_data=[];

  private imageSrc: string;
  constructor(public navCtrl: NavController, private _myservice: myService) {

  }

  createRoom(){
    let room = {
      Title: this.title,
      pin: this.idRoom,
      Content: this.descripcion,
      open: true,
    }
    
    
    this._myservice.addRoom(room);
    console.log("despues de crear room"+" "+this.title+" "+this.idRoom+" "+this.descripcion);
    this.navCtrl.pop();
    //this._myservice.addRoom(room).subscribe(datos => this.my_data=datos);
  

  
	  }

    close(){
      this.navCtrl.pop();
    }

  }
  
