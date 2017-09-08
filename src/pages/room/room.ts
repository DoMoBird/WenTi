import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController, NavParams } from 'ionic-angular';
import { myService } from '../../providers/myService/myService';
import { questionCheckbox } from '../question_checkbox/question';
import { createQuestionPage } from '../createQuestion/createQuestion';
import { questions } from '../questions/questions';
import { resultadoPage } from '../resultado/resultado';
import { resultadoTotalPage } from '../resultadoTotal/resultadoTotal';
import * as firebase from 'firebase';

@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class roomPage {


  grupo: any;
  room_datos: any;
  public iterm: any;
  datos_recuperados: any;
  indice: any;
  imgURL: any;
  key: any;
  questions: any;
  p: any;
  checkbox: any;
  checkboxAnswer: any[];
  grupoClase: any;
  resultado: any;

  constructor(public nav: NavController, private _myservice: myService, public navP: NavParams) {
    //this.iterm = navP.get('item');

    // this.pin = navP.data;
    //this.room_datos = navP.data;

    //recibimos los parametros del MyWentis page
    this.room_datos = navP.get('room_datos');
    this.indice = navP.get('indice');
    this.key = navP.get('key');
    this.grupo = navP.get('grupo');
    console.log("el path de imagen en el room.ts es " + this.room_datos.path);

  }

  ngOnInit() {
    //obtenemos la lista de la question con el key actual
    this._myservice.getQuestionList(this.key).subscribe(pregunta => { this.questions = pregunta });

    //con este metodo obtenemos el URL de las imagenes almacenadas en Firebase
    let storageRef = firebase.storage().ref();
    storageRef.child(this.room_datos.path).getDownloadURL().then((url) => {
      // Set image url
      this.imgURL = url;
    }).catch((error) => {
      console.log(error);
    });
  }

  //version natigua de navegar hacia question page
  /*startQuestion($event, preguntas, current: number) {

    console.log("current-> " + current);
    console.log(this.room_datos.Preguntas[current].tipo);


    if (this.room_datos.open == "true") {
      this.nav.push(questionCheckbox, {
        preguntas: this.room_datos.Preguntas,
        //*aqui cambiamos el tipo de preguntas
        //preguntas: this.room_datos.preguntas,
        index: current, //index vale 0 porque empezamos por la 1a pregunta
        respuestas: [
          0, 0, 0
        ],

      });

    }
  }*/

  //empieza a realizar la encuesta
  startQuestions() {
    var id = 0;
    this.checkbox = this.questions[id];
    this.nav.push(questions, {
      room_datos: this.room_datos,
      checkboxQuestion: this.questions,
      key: this.key,
      index: id,
      grupo: this.grupo

    });
    //}



  }

  //metodo que navega hacia el page de crear questiones.
  addQuestions() {
    console.log("entramos en la creación de Questions");
    this.nav.push(createQuestionPage, {
      key: this.key
    });
  }

  viewResult() {
    let cont = 0; let sor = 0; let abur = 0; let tri = 0; let asc = 0; let enf = 0; let mie = 0;
    let contA = 0; let sorA = 0; let aburA = 0; let triA = 0; let ascA = 0; let enfA = 0; let mieA = 0;
    let contB = 0; let sorB = 0; let aburB = 0; let triB = 0; let ascB = 0; let enfB = 0; let mieB = 0;
    let contC = 0; let sorC = 0; let aburC = 0; let triC = 0; let ascC = 0; let enfC = 0; let mieC = 0;
    let contD = 0; let sorD = 0; let aburD = 0; let triD = 0; let ascD = 0; let enfD = 0; let mieD = 0;
    let contE = 0; let sorE = 0; let aburE = 0; let triE = 0; let ascE = 0; let enfE = 0; let mieE = 0;
    let contF = 0; let sorF = 0; let aburF = 0; let triF = 0; let ascF = 0; let enfF = 0; let mieF = 0;
    let mal = 0; let bien = 0; let notable = 0; let sobre = 0;
    let malA = 0; let bienA = 0; let notableA = 0; let sobreA = 0;
    let malB = 0; let bienB = 0; let notableB = 0; let sobreB = 0;
    let malC = 0; let bienC = 0; let notableC = 0; let sobreC = 0;
    let malD = 0; let bienD = 0; let notableD = 0; let sobreD = 0;
    let malE = 0; let bienE = 0; let notableE = 0; let sobreE = 0;
    let malF = 0; let bienF = 0; let notableF = 0; let sobreF = 0;
    let totalQuestion = 0;
    let totalUserA = 0; let totalUserB = 0; let totalUserC = 0; let totalUserD = 0; let totalUserE = 0; let totalUserF = 0;

    if (this.grupoClase == 'total') {
      this._myservice.getTotalResultList(this.key).subscribe(result => {
        this.resultado = result
        for (var p in this.resultado) {
          for (var r in this.resultado[p]) {
            if (this.resultado[p][r].grupo == "A") {
              totalUserA++;
              if (this.resultado[p][r].result == "Contento") contA++;
              if (this.resultado[p][r].result == "Sorprendido") sorA++;
              if (this.resultado[p][r].result == "Aburrido") aburA++;
              if (this.resultado[p][r].result == "Triste") triA++;
              if (this.resultado[p][r].result == "Asco") ascA++;
              if (this.resultado[p][r].result == "Enfadado") enfA++;
              if (this.resultado[p][r].result == "Miedo") mieA++;
              if (this.resultado[p][r].result == "Mal") malA++;
              if (this.resultado[p][r].result == "Bien") bienA++;
              if (this.resultado[p][r].result == "Notable") notableA++;
              if (this.resultado[p][r].result == "SobreSaliente") sobreA++;


            } else if (this.resultado[p][r].grupo == "B") {
              totalUserB++;
              if (this.resultado[p][r].result == "Contento") contB++;
              if (this.resultado[p][r].result == "Sorprendido") sorB++;
              if (this.resultado[p][r].result == "Aburrido") aburB++;
              if (this.resultado[p][r].result == "Triste") triB++;
              if (this.resultado[p][r].result == "Asco") ascB++;
              if (this.resultado[p][r].result == "Enfadado") enfB++;
              if (this.resultado[p][r].result == "Miedo") mieB++;
              if (this.resultado[p][r].result == "Mal") malB++;
              if (this.resultado[p][r].result == "Bien") bienB++;
              if (this.resultado[p][r].result == "Notable") notableB++;
              if (this.resultado[p][r].result == "SobreSaliente") sobreB++;

            } else if (this.resultado[p][r].grupo == "C") {
              totalUserC++;
              if (this.resultado[p][r].result == "Contento") contC++;
              if (this.resultado[p][r].result == "Sorprendido") sorC++;
              if (this.resultado[p][r].result == "Aburrido") aburC++;
              if (this.resultado[p][r].result == "Triste") triC++;
              if (this.resultado[p][r].result == "Asco") ascC++;
              if (this.resultado[p][r].result == "Enfadado") enfC++;
              if (this.resultado[p][r].result == "Miedo") mieC++;
              if (this.resultado[p][r].result == "Mal") malC++;
              if (this.resultado[p][r].result == "Bien") bienC++;
              if (this.resultado[p][r].result == "Notable") notableC++;
              if (this.resultado[p][r].result == "SobreSaliente") sobreC++;

            } else if (this.resultado[p][r].grupo == "D") {
              totalUserD++;
              if (this.resultado[p][r].result == "Contento") contD++;
              if (this.resultado[p][r].result == "Sorprendido") sorD++;
              if (this.resultado[p][r].result == "Aburrido") aburD++;
              if (this.resultado[p][r].result == "Triste") triD++;
              if (this.resultado[p][r].result == "Asco") ascD++;
              if (this.resultado[p][r].result == "Enfadado") enfD++;
              if (this.resultado[p][r].result == "Miedo") mieD++;
              if (this.resultado[p][r].result == "Mal") malD++;
              if (this.resultado[p][r].result == "Bien") bienD++;
              if (this.resultado[p][r].result == "Notable") notableD++;
              if (this.resultado[p][r].result == "SobreSaliente") sobreD++;

            } else if (this.resultado[p][r].grupo == "E") {
              totalUserE++;
              if (this.resultado[p][r].result == "Contento") contE++;
              if (this.resultado[p][r].result == "Sorprendido") sorE++;
              if (this.resultado[p][r].result == "Aburrido") aburE++;
              if (this.resultado[p][r].result == "Triste") triE++;
              if (this.resultado[p][r].result == "Asco") ascE++;
              if (this.resultado[p][r].result == "Enfadado") enfE++;
              if (this.resultado[p][r].result == "Miedo") mieE++;
              if (this.resultado[p][r].result == "Mal") malE++;
              if (this.resultado[p][r].result == "Bien") bienE++;
              if (this.resultado[p][r].result == "Notable") notableE++;
              if (this.resultado[p][r].result == "SobreSaliente") sobreE++;

            } else if (this.resultado[p][r].grupo == "F") {
              totalUserF++;
              if (this.resultado[p][r].result == "Contento") contF++;
              if (this.resultado[p][r].result == "Sorprendido") sorF++;
              if (this.resultado[p][r].result == "Aburrido") aburF++;
              if (this.resultado[p][r].result == "Triste") triF++;
              if (this.resultado[p][r].result == "Asco") ascF++;
              if (this.resultado[p][r].result == "Enfadado") enfF++;
              if (this.resultado[p][r].result == "Miedo") mieF++;
              if (this.resultado[p][r].result == "Mal") malF++;
              if (this.resultado[p][r].result == "Bien") bienF++;
              if (this.resultado[p][r].result == "Notable") notableF++;
              if (this.resultado[p][r].result == "SobreSaliente") sobreF++;
            }

          }

        }
        totalQuestion = totalUserA + totalUserB + totalUserC + totalUserD + totalUserE + totalUserF;
        console.log("numero de contento de A es " + contA);
        console.log("el user total de A es " + totalQuestion);
        console.log("el titulo de question es " + this.questions[0].title);






        this.nav.push(resultadoTotalPage, {
          resultado: this.resultado, key: this.key, grupo: this.grupoClase, totalQuestion: totalQuestion,
          questions: this.questions,
          contA: contA, sorA: sorA, aburA: aburA, triA: triA, ascA: ascA, enfA: enfA, mieA: mieA,
          contB: contB, sorB: sorB, aburB: aburB, triB: triB, ascB: ascB, enfB: enfB, mieB: mieB,
          contC: contC, sorC: sorC, aburÇ: aburC, triC: triC, ascC: ascC, enfC: enfC, mieC: mieC,
          contD: contD, sorD: sorD, aburD: aburD, triD: triD, ascD: ascD, enfD: enfD, mieD: mieD,
          contE: contE, sorE: sorE, aburE: aburE, triE: triE, ascE: ascE, enfE: enfE, mieE: mieE,
          contF: contF, sorF: sorF, aburF: aburF, triF: triF, ascF: ascF, enfF: enfF, mieF: mieF,
          malA: malA, bienA: bienA, notableA: notableA, sobreA: sobreA,
          malB: malB, bienB: bienB, notableB: notableB, sobreB: sobreB,
          malC: malC, bienC: bienC, notableC: notableC, sobreC: sobreC,
          malD: malD, bienD: bienD, notableD: notableD, sobreD: sobreD,
          malE: malE, bienE: bienE, notableE: notableE, sobreE: sobreE,
          malF: malF, bienF: bienF, notableF: notableF, sobreF: sobreF,

          userA: totalUserA, userB: totalUserB, userC: totalUserC, userD: totalUserD, userE: totalUserE, userF: totalUserF
        });
      });



    } else {
      this._myservice.getResultList(this.key, this.grupoClase).subscribe(result => {
        this.resultado = result
        var resulta = [];
        for (var p in this.resultado) {
            resulta.push(this.resultado[p].result);
        }

        for(var p in resulta){
          if (resulta[p] == "Contento") cont++;
          if (resulta[p] == "Sorprendido") sor++;
          if (resulta[p] == "Aburrido") abur++;
          if (resulta[p] == "Triste") tri++;
          if (resulta[p] == "Asco") asc++;
          if (resulta[p] == "Enfadado") enf++;
          if (resulta[p] == "Miedo") mie++;
          if (resulta[p] == "Mal") mal++;
          if (resulta[p] == "Bien") bien++;
          if (resulta[p] == "Notable") notable++;
          if (resulta[p] == "SobreSaliente") sobre++;
        }
        let totalQuestion1 = cont + sor + abur + tri + asc + enf + mie;
        let totalQuestion2 = mal + bien + notable + sobre;
        console.log("el cont de resulta es " + cont);
        console.log("el array de resulta es " + resulta);
        this.nav.push(resultadoPage, {
          resultado: this.resultado,
          questions: this.questions,
          totalQuestions1: totalQuestion1,
          totalQuestions2: totalQuestion2,
          key: this.key,
          grupo: this.grupoClase, cont: cont, sor: sor, abur: abur, tri: tri, asc: asc, enf: enf, mie: mie,
          mal: mal, bien: bien, notable: notable, sobre: sobre


        });
      });
    }
  }






  cerrar($event) {
    this._myservice.closeRoom(0).subscribe(c => this.datos_recuperados = c);
  }




}