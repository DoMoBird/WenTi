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
    datos_recuperados: any;
    valor: string="";
    emociones: string[] = ["","","","","",""];
    checkbox: boolean[] = [false,false,false,false,false,false];
    input: string="";
    resultados_anteriores: string="";
    responses = [];

    constructor(public nav: NavController, private _myservice: myService, public navP: NavParams){
        this.item = navP.get('item');
        //this.pin = navP.data;
        this.preguntas = navP.get('preguntas');
        this.indice = navP.get('index');
        this.respuestas = navP.get('respuestas');
        this.resultados_anteriores = navP.get('resultado');


        console.log("respuestas anteriores "+this.resultados_anteriores);
        //this.tipo = navP.get('tipo');
        console.log("he recuperado en "+this.indice);
        console.log("Al entrar en question "+this.respuestas[0]+" "+this.respuestas[1]);
    } 

    ngOnInit(): void{
        this._myservice.getResponses(0).subscribe(r => this.responses=r);
    }

    saveAnswers(): string{
        var e;
        
        if (this.preguntas[this.indice].encuesta.tipo == "select"){
        console.log("los valores son de triste y contento son: "+this.emociones[0]+" "
        +this.emociones[1]+" "
        +this.emociones[2]+" "
        +this.emociones[3]+" "
        +this.emociones[4]+" "
        +this.emociones[5]);

        if(this.indice>0)
        e = {
                "pregunta": this.indice,
                "respuestas": [
                {"triste": this.emociones[0]},
                {"feliz": this.emociones[1]},
                {"abatido": this.emociones[2]},
                {"activo": this.emociones[3]},
                {"miserable": this.emociones[4]},
                {"alegre": this.emociones[5]}
                ]
            };
        
        else
         e = {
                "pregunta": this.indice,
                "respuestas": [
                {"triste": this.emociones[0]},
                {"feliz": this.emociones[1]},
                {"abatido": this.emociones[2]},
                {"activo": this.emociones[3]},
                {"miserable": this.emociones[4]},
                {"alegre": this.emociones[5]}
                ]
            };

        }

        if (this.preguntas[this.indice].encuesta.tipo == "checkbox"){

        if(this.indice>0)    
        e = {
                "pregunta": this.indice,
                "respuestas": [
                {"triste": this.checkbox[0]},
                {"feliz": this.checkbox[1]},
                {"abatido": this.checkbox[2]},
                {"activo": this.checkbox[3]},
                {"miserable": this.checkbox[4]},
                {"alegre": this.checkbox[5]}
                ]
            };

        else
        e = {
                "pregunta": this.indice,
                "respuestas": [
                {"triste": this.checkbox[0]},
                {"feliz": this.checkbox[1]},
                {"abatido": this.checkbox[2]},
                {"activo": this.checkbox[3]},
                {"miserable": this.checkbox[4]},
                {"alegre": this.checkbox[5]}
                ]
            };
        
    
        }

         if (this.preguntas[this.indice].encuesta.tipo == "respuesta corta"){

        if(this.indice>0)//OJO, ESTO DEBERÍA SER >0
        e = {
                "pregunta": this.indice,
                "respuestas": this.input
            };
        
        else
         e = {"pregunta": +this.indice,"respuestas": this.input};

        }
        return e;
    }

    nextQuestion($event){
       
        this._myservice.getResponses(0).subscribe(r => this.responses=r);

        console.log("el indice es "+this.indice);

        var e = this.saveAnswers();

        var cont=0;

        for (var i in this.responses){
            cont++;
        }

        console.log("cont vale "+cont);

        this._myservice.putResult(0,cont,"","",e).subscribe(c => this.datos_recuperados=c);

        
        let j = this.indice +1;
        this.nav.push(questionCheckbox, {
          preguntas: this.preguntas, 
          index: j, //incrementamos index para que pase a la siguiente pregunta
          respuestas : this.respuestas,
          resultado: e
       });
        console.log("Al salir "+this.respuestas[0]+" "+this.respuestas[1]);


    }

    finishQuestion($event){

        this._myservice.getResponses(0).subscribe(r => this.responses=r);

        console.log("el indice es "+this.indice);

        var e = this.saveAnswers();

        var cont=0;

        for (var i in this.responses){
            cont++;
        }

        console.log("cont vale "+cont);

        this._myservice.putResult(0,cont,"","",e).subscribe(c => this.datos_recuperados=c);
        this.nav.push(roomPage);
        console.log("finalizamos");

    }

    onModelChange($event,texto): void{
        
        /*if(texto=="triste") 
            console.log("he seleccionado "+texto+ " "+this.triste);
        if(texto=="feliz")
            console.log("he seleccionado "+texto+ " "+this.contento);*/
        this.respuestas[this.indice]=texto;

        if (this.preguntas[this.indice].encuesta.tipo == "checkbox"){
            console.log("he seleccionado "+texto);
            if(texto=="Triste")
                this.checkbox[0]=!this.checkbox[0];
            if(texto=="Feliz/contento/a")
                this.checkbox[1]=!this.checkbox[1];
            if(texto=="Abatido/a")
                this.checkbox[2]=!this.checkbox[2];
            if(texto=="Activo/a")
                this.checkbox[3]=!this.checkbox[3];
            if(texto=="Miserable")
                this.checkbox[4]=!this.checkbox[4];
            if(texto=="Alegre")
                this.checkbox[5]=!this.checkbox[5];
        }
    }

   


}