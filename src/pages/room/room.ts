import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,  NavParams } from 'ionic-angular';
import { myService } from '../../providers/myService/myService';
import { questionCheckbox } from '../question_checkbox/question';

@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class roomPage{


    public name = '';
    room_datos: any;
    public iterm: any;

    constructor(public nav: NavController, private _myservice: myService, public navP: NavParams){
        this.iterm = navP.get('item');

        //this.pin = navP.data;
        this.room_datos = navP.data;
        console.log("tengo un pin "+this.room_datos.pin);
    } 

    startQuestion($event, preguntas, current:number){
      if(this.room_datos.Preguntas[current].tipo == "checkbox")
        this.nav.push(questionCheckbox, {preguntas: this.room_datos.Preguntas, index: current});
      
    }

   


}