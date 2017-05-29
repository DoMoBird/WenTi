import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,  NavParams } from 'ionic-angular';
import { myService } from '../../providers/myService/myService';
import { roomPage } from '../room/room';

@Component({
  selector: 'questionCheckbox',
  templateUrl: 'question.html',
})
export class questionCheckbox{

    public item: any;
    public preguntas: any[];
    public respuestas: any[];
    public indice: number;
    public tipo: any;

    constructor(public nav: NavController, private _myservice: myService, public navP: NavParams){
        this.item = navP.get('item');
        //this.pin = navP.data;
        this.preguntas = navP.get('preguntas');
        this.indice = navP.get('index');
        this.respuestas = navP.get('respuestas');
        //this.tipo = navP.get('tipo');
        console.log("he recuperado en "+this.indice);
        console.log("Al entrar en question "+this.respuestas[0]+" "+this.respuestas[1]);
    } 

    nextQuestion($event){
        console.log("indice vale "+this.indice+" y length "+this.preguntas.length);
        if(this.indice == this.preguntas.length-1){
            console.log("ntro en el if");
            //guardamos las respuestas con el put
            this.nav.push(roomPage);
        }
        let i = this.indice +1;
        this.nav.push(questionCheckbox, {
          preguntas: this.preguntas, 
          index: i, //incrementamos index para que pase a la siguiente pregunta
          respuestas : this.respuestas
       });
        console.log("Al salir "+this.respuestas[0]+" "+this.respuestas[1]);
        
    }

    onModelChange($event,texto): void{
        console.log("he seleccionado "+texto);
        this.respuestas[this.indice]=texto;
    }

   


}