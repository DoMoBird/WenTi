import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/Operator/map';
import * as firebase from 'firebase';
//import firebase from 'firebase';

@Injectable()

export class myService {
	
	private _url = 'https://wentibd.firebaseio.com';
	roomList: FirebaseListObservable<any[]>;
	QuestionList: FirebaseListObservable<any[]>;
	room: FirebaseObjectObservable<any[]>;
	resultado: FirebaseListObservable<any[]>;
	folder: any;
	val ={};

	constructor(private _http: Http, private af: AngularFire){
        this.folder = 'RoomImages';
	}

	getDatos() : Observable< any> {
		return this._http.get(`${this._url}/Room.json`)
			.map((response: Response) => response.json());
				
	}

	getRoomList(){
		
		this.roomList =this.af.database.list('Rooms') as FirebaseListObservable <any>;
		return this.roomList;
	}

	getQuestionList(key: any){
		this.QuestionList =this.af.database.list('Rooms/'+key+'/Questions') as FirebaseListObservable <any>;
		return this.QuestionList;
	}

	getRoomDetail(){
		this.room = this.af.database.object('Rooms') as FirebaseObjectObservable<any>;
		return this.room;
	}

	changeImgURL(roomPath, imgURL){
		firebase.storage().ref('Rooms').child(roomPath).getDownloadURL().then((url) => {
			imgURL = url;
		}).catch((error) =>{
			console.log(error);
		});
	}

	getResultList(keyRoom: any, grupo: any){
		this.resultado = this.af.database.list('Res/'+keyRoom+'/'+grupo) as FirebaseListObservable<any>;
		return this.resultado;
	}
	

	getTotalResultList(keyRoom: any){
		this.resultado = this.af.database.list('Res/'+keyRoom) as FirebaseListObservable<any>;
		return this.resultado;
	}

	

	addRoom(room){
		let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){

      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        room.image = selectedFile.name;
        room.path = path;
		let rooms = firebase.database().ref('Rooms');
        return rooms.push(room);
	});

}
	}

	addQuestion(question, key: any){
		let questions = firebase.database().ref('Rooms/'+key+'/Questions');
		return questions.push(question);
	}

	addResult(response,roomKey, grupo: any){
		let responses = firebase.database().ref('Res/'+roomKey+'/'+grupo);
		return responses.push(response);
	}

	addTotalResult(response,roomKey){
		let responses = firebase.database().ref('Responses/'+roomKey);
		return responses.push(response);
	}

	pushResult(response){
		let result = firebase.database().ref('Response');
		return result.push(response);
	}

	/*addRoom(room): Observable<any>{
		
		let storageRef = firebase.storage().ref();
		for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
			console.log("dentro del for");
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
	  
      iRef.put(selectedFile).then((snapshot) => {
        room.image = selectedFile.name;
        room.img = path;
		console.log("despues del path "+path);
		return path;
        //return this.roomList.push(room);
      }).then(function(path){
		  console.log("aquí el path vale "+path );
		  //this.val=path;
	  });
	  
	  	console.log("y val  "+this.val );
		let headers = new Headers({'Content-Type': 'application/json'});
		  room.img = path;
		  let body = JSON.stringify(room);
		  console.log("antes del stringify "+path);
		  
		  //hacer para que no sea la 2 sino la siguiente que toque

		  return this._http.put(`${this._url}/Room/2.json`, body, headers).map(res => res.json());
		

    }
	//console.log("fuera del for");
	//return this._http.get(`${this._url}/Room/0.json`).map(res => res.json());

	/*var promise = new promise((resolve, reject) =>{
		storageRef.child('first').put(room);
	})
	return promise;
}*/
	

	/*getRoom() : Observable< any> {
		return this._http.get(`${this._http}/Room.json`).map((response: Response) => response.json());
	}*/

	closeRoom(room_number: number) : Observable<any>{

		let headers = new Headers({'Content-Type': 'application/json'});
		let body = JSON.stringify("false");

		return this._http.put(`${this._url}/Room/${room_number}/open.json`, body, headers).map(res => res.json());
	}

	openRoom(room_number: number) : Observable<any>{

		let headers = new Headers({'Content-Type': 'application/json'});
		let body = JSON.stringify("true");

		return this._http.put(`${this._url}/Room/${room_number}/open.json`, body, headers).map(res => res.json());
	}

	

	putResult(room_number: number, index: number, name: string, texto: any, e: string) : Observable<any>{

		let headers = new Headers({'Content-Type': 'application/json'});
		let body = JSON.stringify(e);

		//let body = JSON.stringify({"pregunta": '+0+',"respuestas": '+asfads'});

		/*let body = JSON.stringify({
                "pregunta": 1,
                "respuestas": [
                {"triste": true},
                {"feliz": false},
                {"abatido": true},
                {"activo": false},
                {"miserable": true},
                {"alegre": true}
                ]
            })*/

		return this._http.put(`${this._url}/Responses/${room_number}/responses/${index}.json`, body, headers).map(res => res.json());
	}

	getResponses(room_number: number): Observable< any> {
		return this._http.get(`${this._url}/Responses/${room_number}/responses.json`).map((response: Response) => response.json());
	}

/*interface Listing{
  $key?:string;
  title?:string;
  type?:string;
  image?:string;
  city?:string;
  owner?:string;
  bedrooms?:string;*/


}