import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,  NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { myService } from '../../providers/myService/myService';
import { Chart } from 'chart.js';
//import { ChartsModule } from 'ng2-charts';
import * as firebase from 'firebase';


@Component({
  selector: 'resultadoTotal',
  templateUrl: 'resultadoTotal.html',
})

export class resultadoTotalPage{

    resultado: any;
    resultadoTotal =0;
    questions: any;
    grupo: any;
    contA = 0; sorA = 0; aburA =0; triA =0; ascA = 0; enfA=0; mieA =0;
     contB = 0; sorB = 0; aburB =0; triB =0; ascB = 0; enfB=0; mieB =0;
     contC = 0; sorC = 0; aburC =0; triC =0; ascC = 0; enfC=0; mieC =0;
     contD = 0; sorD = 0; aburD =0; triD =0; ascD = 0; enfD=0; mieD =0;
     contE = 0; sorE= 0;  aburE=0;  triE=0;  ascE= 0;  enfE=0; mieE =0;
     contF = 0; sorF = 0; aburF =0; triF =0; ascF = 0; enfF=0; mieF =0;
      malA = 0;  bienA =0;  notableA =0;  sobreA =0;
     malB= 0;  bienB =0;  notableB =0;  sobreB =0;
     malC = 0;  bienC =0;  notableC =0;  sobreC =0;
     malD = 0;  bienD =0;  notableD =0;  sobreD =0;
     malE = 0;  bienE =0;  notableE =0;  sobreE =0;
     malF = 0;  bienF =0;  notableF =0;  sobreF =0;
     // radarChart
     public radarChartLabels:string[]
     public radarChartData:any;
     public radarChartType:string;
    // radarChart
     public radarChartLabels1:string[]
     public radarChartData1:any;
     public radarChartType1:string;
     //DonutCharts
     public doughnutChartLabels:string[];
    public doughnutChartData:number[];
    public doughnutChartType:string;

     constructor(public navCtrl: NavController, public _myservice: myService, private af: AngularFire, public navP: NavParams) {

         this.resultado = this.navP.get('resultado');
         this.questions = this.navP.get('questions');
         this.resultadoTotal =this.navP.get('totalQuestion');
         this.grupo = this.navP.get('grupo');
         this.contA = this.navP.get('contA');this.sorA = this.navP.get('sorA');this.aburA = this.navP.get('aburA');this.triA = this.navP.get('triA');
         this.ascA = this.navP.get('ascA');this.enfA = this.navP.get('enfA');this.mieA = this.navP.get('mieA');
         this.contB = this.navP.get('contB');this.sorB = this.navP.get('sorB');this.aburB = this.navP.get('aburB');this.triB = this.navP.get('triB');
         this.ascB = this.navP.get('ascB');this.enfB = this.navP.get('enfB');this.mieB = this.navP.get('mieB');
         this.contC = this.navP.get('contC');this.sorC = this.navP.get('sorC');this.aburC = this.navP.get('aburC');this.triC = this.navP.get('triC');
         this.ascC = this.navP.get('ascC');this.enfC = this.navP.get('enfC');this.mieC = this.navP.get('mieC');
         this.contD = this.navP.get('contD');this.sorD = this.navP.get('sorD');this.aburD = this.navP.get('aburD');this.triD = this.navP.get('triD');
         this.ascD = this.navP.get('ascD');this.enfD = this.navP.get('enfD');this.mieD = this.navP.get('mieD');
         this.contE = this.navP.get('contE');this.sorE = this.navP.get('sorE');this.aburE = this.navP.get('aburE');this.triE = this.navP.get('triE');
         this.ascE = this.navP.get('ascE');this.enfE = this.navP.get('enfE');this.mieE = this.navP.get('mieE');
         this.contF = this.navP.get('contF');this.sorF = this.navP.get('sorF');this.aburF = this.navP.get('aburF');this.triF = this.navP.get('triF');
         this.ascF = this.navP.get('ascF');this.enfF = this.navP.get('enfF');this.mieF = this.navP.get('mieF');
         this.malA =this.navP.get('malA');this.bienA =this.navP.get('bienA');this.notableA =this.navP.get('notableA');this.sobreA =this.navP.get('sobreA');
         this.malB =this.navP.get('malB');this.bienB =this.navP.get('bienB');this.notableB =this.navP.get('notableB');this.sobreB =this.navP.get('sobreB');
         this.malC =this.navP.get('malC');this.bienC =this.navP.get('bienC');this.notableC =this.navP.get('notableC');this.sobreC =this.navP.get('sobreC');
         this.malD =this.navP.get('malD');this.bienD =this.navP.get('bienD');this.notableD =this.navP.get('notableD');this.sobreD =this.navP.get('sobreD');
         this.malE =this.navP.get('malE');this.bienE =this.navP.get('bienE');this.notableE =this.navP.get('notableE');this.sobreE =this.navP.get('sobreE');
         this.malF =this.navP.get('malF');this.bienF =this.navP.get('bienF');this.notableF =this.navP.get('notableF');this.sobreF =this.navP.get('sobreF');       

         //grafica de RadarChart de emociones
        this.radarChartLabels = ['Contento', 'Sorprendido', 'Aburrido', 'Triste','Asco','Enfadado','Miedo'];
         this.radarChartData = [
            {data: [this.contA, this.sorA, this.aburA, this.triA, this.ascA, this.enfA, this.mieA], label: 'Grupo A'},
            {data: [this.contB, this.sorB, this.aburB, this.triB, this.ascB, this.enfB, this.mieB], label: 'Grupo B'},
            {data: [this.contC, this.sorC, this.aburC, this.triC, this.ascC, this.enfC, this.mieC], label: 'Grupo C'},
            {data: [this.contD, this.sorD, this.aburD, this.triD, this.ascD, this.enfD, this.mieD], label: 'Grupo D'},
            {data: [this.contE, this.sorE, this.aburE, this.triE, this.ascE, this.enfE, this.mieE], label: 'Grupo E'},
            {data: [this.contF, this.sorF, this.aburF, this.triF, this.ascF, this.enfF, this.mieF], label: 'Grupo F'},
         ];
        this.radarChartType = 'radar';

        //grafica de RadarChart de clase
        this.radarChartLabels1 = ['Mal', 'Bien', 'Notable', 'SobreSaliente'];
 
         this.radarChartData1 = [
            {data: [this.malA, this.bienA, this.notableA,this.sobreA], label: 'Grupo A'},
            {data: [this.malB, this.bienB, this.notableB,this.sobreB], label: 'Grupo B'},
            {data: [this.malC, this.bienC, this.notableC,this.sobreC], label: 'Grupo C'},
            {data: [this.malD, this.bienD, this.notableD,this.sobreD], label: 'Grupo D'},
            {data: [this.malE, this.bienE, this.notableE,this.sobreE], label: 'Grupo E'},
            {data: [this.malF, this.bienF, this.notableF,this.sobreF], label: 'Grupo F'},
         ];
        this.radarChartType1 = 'radar';

        //grafica doughnutChart de emociones
         this.doughnutChartLabels = ['Grupo A', 'Grupo B', 'Grupo C', 'Grupo D','Grupo E','Grupo F'];
         this.doughnutChartData = [this.navP.get('userA'), this.navP.get('userB'),this.navP.get('userC'),this.navP.get('userD'),
                                    this.navP.get('userE'),this.navP.get('userF')];
         this.doughnutChartType = 'doughnut';

        




     }

      public randomizeType():void {
        this.doughnutChartType = this.doughnutChartType === 'doughnut' ? 'pie' : 'doughnut';
      }



  public chartClicked(e:any):void {
    console.log(e);
  }




}