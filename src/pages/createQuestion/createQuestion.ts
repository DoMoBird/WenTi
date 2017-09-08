import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';
import { myService } from '../../providers/myService/myService';
import { roomPage } from '../room/room';


@Component({
  selector: 'createQuestion',
  templateUrl: 'createQuestion.html'
})
export class createQuestionPage {

    typeQuestion: any;
    question: any;
    answer1: any;
    answer2: any;
    answer3: any;
    answer4: any;
    key: any;
    options=[ 
       {resp: ""}
      ];
    option=[ 
       {respSelect: ""}
      ];


    constructor(public navCtrl: NavController, public _myservice: myService, public navP: NavParams){
          this.key = this.navP.get('key');
    }

    createQuestion(){
      //el JSON de la cuestion
      let question ={
        type: this.typeQuestion,
        title: this.question,
        answer: this.options
      }
      let questionSelect={
        type: this.typeQuestion,
        title: this.question,
        answer: this.options,
        answerOptions: this.option
      }
        //Para el caso cuando la cuestion es de tipo select
        if(this.typeQuestion=="select"){ 
          this._myservice.addQuestion(questionSelect, this.key);
          this.navCtrl.pop();
        }else{
        this._myservice.addQuestion(question, this.key);
        this.navCtrl.pop();
        }
      
    }

    close(){
      this.navCtrl.pop();
    }

    onModelChange(event): void{

      console.log("cambiamos la selección a "+this.typeQuestion);

    }

    addOption(event): void{
      console.log("entramos en add optino");
      this.options.push({resp: ""});
      this.option.push({respSelect: ""});
    }

}