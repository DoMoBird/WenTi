import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Login } from '../login/login';
import { myService } from '../../providers/myService/myService';
import { roomPage } from '../room/room';


@Component({
  selector: 'createRoom',
  templateUrl: 'createRoom.html'
})
export class createRoomPage {

    constructor(public navCtrl: NavController){
        
    }
}