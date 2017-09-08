import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,  NavParams } from 'ionic-angular';
import { myService } from '../../providers/myService/myService';
import { studentLoginPage } from '../studentLogin/studentLogin';
import { roomPage } from '../room/room';
import * as firebase from 'firebase';

@Component({
  selector: 'questions',
  templateUrl: 'questions.html',
})
export class questions{

     questions: any;
     roomDatos: any;
     key: any;
     input: any;
     grupo: any;
     public checkbox: any;
     //public checkboxAnswer: any[];
     questionKey: any;
     index: any;
     respuesta=[];

    constructor(public nav: NavController, private _myservice: myService, public navP: NavParams, public alertCtrl: AlertController){

        //obtenemos el data de question de room page
        this.roomDatos = this.navP.get('room_datos');
        this.checkbox = this.navP.get('checkboxQuestion');
        this.index = this.navP.get('index');
        //this.checkboxAnswer = this.navP.get('checkboxAnswer');
        this.key = this.navP.get('key');
        //recibir desde room el nombre del grupo de student
        this.grupo = this.navP.get('grupo');
        console.log("el path de room_datos es "+this.roomDatos.path);
        console.log("el title de checkbox es "+this.checkbox.type);
        //console.log("el checkboxAnswer es "+this.checkboxAnswer);
        console.log("the key is "+this.key);
        console.log("el questionKey es "+this.checkbox[this.index].$key);

        console.log("la longitud es "+this.checkbox.length);
        console.log("el index es "+this.index);
        
    }

    
    

     ngOnInit(): void{
        //obtener la lista de questions
       this._myservice.getQuestionList(this.key).subscribe(pregunta => { 
           this.questions = pregunta 
           //recorrer la lista de questions
           for(var p in this.questions){
               //if(this.questions[p].type == "checkbox"){this.checkbox = this.questions[p];}
        
           }

           console.log("el tipo de checkbox es "+this.checkbox.type);
           
           
           console.log("el valor de questions es"+this.questions);
        });
        
}

nextQuestion(){

    let response = {
        id_room: this.key,
        id_question: this.checkbox[this.index].$key,
        grupo: this.grupo,
        title: this.checkbox[this.index].title,
        type: this.checkbox[this.index].type,
        result: this.respuesta || this.input
    }

     let res_input ={
        id_room: this.key,
        id_question: this.checkbox[this.index].$key,
        grupo: this.grupo,
        title: this.checkbox[this.index].title,
        type: this.checkbox[this.index].type,
        result: this.input
    }

    if(this.checkbox[this.index].type=="checkbox" || this.checkbox[this.index].type=="radio"){
    this._myservice.addResult(response, this.key, this.grupo);
    }else
    this._myservice.addResult(res_input, this.key, this.grupo);
    // pasamos a la siguiente cuestion
    let j = this.index +1;
        this.nav.push(questions,{
        room_datos: this.roomDatos,
        checkboxQuestion: this.checkbox,
        key: this.key,
        index: j,
        grupo: this.grupo

      });
}

finishQuestion(){
    
    let response = {
        id_room: this.key,
        id_question: this.checkbox[this.index].$key,
        grupo: this.grupo,
        title: this.checkbox[this.index].title,
        type: this.checkbox[this.index].type,
        result: this.respuesta
    }

    let res_input ={
        id_room: this.key,
        id_question: this.checkbox[this.index].$key,
        grupo: this.grupo,
        title: this.checkbox[this.index].title,
        type: this.checkbox[this.index].type,
        result: this.input
    }
    // para finalizar la encuesta.
    this.showAlert();
    if(this.checkbox[this.index].type=="checkbox" || this.checkbox[this.index].type=="radio"){
    this._myservice.addResult(response, this.key, this.grupo);
    }else
    this._myservice.addResult(res_input, this.key, this.grupo);
       this.nav.setRoot(studentLoginPage,{
            room_datos: this.roomDatos,
            key: this.key,
            grupo: this.grupo
        });
        console.log("finalizamos");
}

showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Finalizada !',
      subTitle: 'Gracias por contestar la encuesta!',
      buttons: ['OK']
    });
    alert.present();
  }

onModelChangeCheckbox($event, resp){
    let index =this.respuesta.indexOf(resp);
    if(index==-1){
    this.respuesta.push(resp);
    console.log("inserto");
    }else{
    this.respuesta.splice(index, 1);
    console.log("quito");
    }
    console.log("la respueta es "+this.respuesta);
}

onModelChangeRadio($event, resp){
    if(this.respuesta.length>0){
        this.respuesta.splice(0,1);
    }
    this.respuesta.push(resp);
    console.log("la respueta es "+this.respuesta);
}




}