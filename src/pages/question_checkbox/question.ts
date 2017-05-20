import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,  NavParams } from 'ionic-angular';
import { myService } from '../../providers/myService/myService';

@Component({
  selector: 'questionCheckbox',
  templateUrl: 'question.html',
})
export class questionCheckbox{

    public item: any;
    public preguntas: any;
    public indice: number;

    constructor(public nav: NavController, private _myservice: myService, public navP: NavParams){
        this.item = navP.get('item');
        //this.pin = navP.data;
        this.preguntas = navP.get('preguntas');
        this.indice = navP.get('index');
        console.log("he recuperado en "+this.indice);
    } 

    nextQuestion($event, preguntas, indice:number){
        this.nav.push(questionCheckbox, indice+1)
        
    }

   


}