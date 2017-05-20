import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Operator/map';

@Injectable()

export class myService {
	
	private _url = 'https://wentibd.firebaseio.com';

	constructor(private _http: Http){
        
	}

	getDatos() : Observable< any> {
		return this._http.get(`${this._url}/Room.json`)
			.map((response: Response) => response.json());
				
	}

	getRoom() : Observable< any> {
		return this._http.get(`${this._http}/Room.json`).map((response: Response) => response.json());
	}


}