import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pais } from '../models/pais';
import { PaisModel } from '../models/paisModel';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  urlApi = "https://6362dc9d37f2167d6f6e7c27.mockapi.io/pais";

  constructor(private http: HttpClient) { }

  getPaises(): Observable<PaisModel[]>{
    return this.http.get<PaisModel[]>(this.urlApi);
  }

  getPaisById(id: any): Observable<PaisModel>{
    return this.http.get<PaisModel>(this.urlApi+id);
  }

}
