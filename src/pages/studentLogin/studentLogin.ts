import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,  NavParams } from 'ionic-angular';
import { myService } from '../../providers/myService/myService';
import { roomPage } from '../room/room';



@Component({
  selector: 'page-studentLogin',
  templateUrl: 'studentLogin.html',
})
export class studentLoginPage{


    public name = '';
    public pin = '';
    public room_datos: any;
    public item = '';

    constructor(public nav: NavController, private _myservice: myService){
    }

    ngOnInit(): void{
		console.log("entramos en el init");
		this._myservice.getDatos().subscribe(c => this.room_datos=c);
	}

    roomEnter(/*$event, pregunta, val: string*/){

      for ( var p in this.room_datos ){

        if(this.room_datos[p].pin == this.pin){
          console.log("encontramos pin igual en elemento "+p+" y recuperamos "+this.room_datos[p].pin);
          this.nav.push(roomPage, this.room_datos[p]);
        }

      }

      
      

    }
}
