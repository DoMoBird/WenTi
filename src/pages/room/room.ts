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
    datos_recuperados: any;

    constructor(public nav: NavController, private _myservice: myService, public navP: NavParams){
        //this.iterm = navP.get('item');

        //this.pin = navP.data;
        this.room_datos = navP.data;
        console.log("tengo un pin "+this.room_datos.pin);
    } 

    startQuestion($event, preguntas, current:number){

      console.log("current-> "+current);
      console.log(this.room_datos.Preguntas[current].tipo);

   
      if(this.room_datos.open=="true"){
        this.nav.push(questionCheckbox, {
          preguntas: this.room_datos.Preguntas, 
          index: current, //index vale 0 porque empezamos por la 1a pregunta
          respuestas : [
            0,0,0
          ]
       });
      
    }
  }

    cerrar($event){
      this._myservice.closeRoom(0).subscribe(c => this.datos_recuperados=c);
    }

   


}