import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,  NavParams } from 'ionic-angular';
import { myService } from '../../providers/myService/myService';
import { Chart } from 'chart.js';
import * as firebase from 'firebase';


@Component({
  selector: 'profile',
  templateUrl: 'profile.html',
})
export class profilePage{

 room: any;
 roomNumber =0;
    
 
    constructor(public navCtrl: NavController, public _myservice: myService) {
        


    }

    ngOnInit(): void{
        this._myservice.getRoomList().subscribe(Rooms => {
			this.room=Rooms
    });
 
   
    
    }

}