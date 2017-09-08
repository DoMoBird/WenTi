import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,  NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { myService } from '../../providers/myService/myService';
import { Chart } from 'chart.js';
import { ChartsModule } from 'ng2-charts';
import * as firebase from 'firebase';

@Component({
  selector: 'resultado',
  templateUrl: 'resultado.html',
})

export class resultadoPage{

 @ViewChild('doughnutCanvas') doughnutCanvas;
    doughnutChart: any;
    resultado: any;
    questions: any;
    keyRoom: any;
    grupo: any;
    key: any;
    totalQuestion1 =0;
    totalQuestion2 =0;

    cont =0;sor =0;abur =0;tri =0;asc =0;enf =0;mie =0;
    mal = 0;  bien =0;  notable =0;  sobre =0;
//donutChart de question 1
public doughnutChartLabels:string[];
public doughnutChartData:number[];
public doughnutChartType:string;

//donutChart de question 2
public doughnutChartLabels2:string[];
public doughnutChartData2:number[];
public doughnutChartType2:string;

     constructor(public navCtrl: NavController, public _myservice: myService, private af: AngularFire, public navP: NavParams) {
         
         this.resultado = this.navP.get('resultado');
         this.questions = this.navP.get('questions');
         this.keyRoom = this.navP.get('key');
         this.grupo = this.navP.get('grupo');
         this.cont = this.navP.get('cont');this.sor = this.navP.get('sor');this.abur = this.navP.get('abur');this.tri = this.navP.get('tri');
         this.asc = this.navP.get('asc');this.enf = this.navP.get('enf');this.mie = this.navP.get('mie');
         this.mal =this.navP.get('mal');this.bien =this.navP.get('bien');this.notable =this.navP.get('notable');this.sobre =this.navP.get('sobre');
         
         this.totalQuestion1 = this.navP.get('totalQuestions1');
         this.totalQuestion2 = this.navP.get('totalQuestions2');
        
         //grafica doughnutChart de emociones
         this.doughnutChartLabels = ['Contento', 'Sorprendido', 'Aburrido', 'Triste','Asco','Enfadado','Miedo'];
         this.doughnutChartData = [this.cont, this.sor, this.abur, this.tri, this.asc, this.enf, this.mie];
         this.doughnutChartType = 'doughnut';

         //grafica de donutchart de question 2
         this.doughnutChartLabels2 = ['Mal', 'Bien', 'Notable', 'SobreSaliente'];
         this.doughnutChartData2 = [this.mal, this.bien, this.notable,this.sobre];
         this.doughnutChartType2 = 'doughnut';

 
    }

    public randomizeType():void {
    this.doughnutChartType = this.doughnutChartType === 'doughnut' ? 'pie' : 'doughnut';
  }

    public randomizeType2():void {
    this.doughnutChartType2 = this.doughnutChartType2 === 'doughnut' ? 'pie' : 'doughnut';
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

     
}
    

 



