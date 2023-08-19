import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PaisModel } from '../models/paisModel';

const initPais : PaisModel= {
    nombre: "",
    id: 0
};

const data : string = "";

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {


  urlApi = "https://6362dc9d37f2167d6f6e7c27.mockapi.io/pais";


  private pais$ = new BehaviorSubject<PaisModel>(initPais);
  private data$ = new BehaviorSubject<string>(data);
  private estadoSubject: Subject<boolean>;


  
  constructor(private http: HttpClient) { 
    this.estadoSubject = new Subject<boolean>();
    
  }

  cambiarEstado(valor: boolean){
    this.estadoSubject.next(valor);
  }

  estadoCambiado(): Observable<boolean>{
    return this.estadoSubject.asObservable();
  }

  get selectedPais$():Observable<PaisModel>{
    return this.pais$.asObservable();
  }

  setData(data:string):void{
    this.data$.next(data);
  }

  get getdata$():Observable<string>{
    return this.data$.asObservable();
  }

  setPais(pais:PaisModel):void{
    this.pais$.next(pais);
  }


  getPaises(): Observable<PaisModel[]>{
    return this.http.get<PaisModel[]>(this.urlApi);
  }



}
