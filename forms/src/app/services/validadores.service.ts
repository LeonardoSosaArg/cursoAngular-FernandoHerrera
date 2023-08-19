import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate{
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})

export class ValidadoresService {

  //VALIDACIONES PERSONALIZADAS
 
  constructor(private http: HttpClient) { }

  urlApi = "https://6369411e28cd16bba7192f17.mockapi.io/api/users";
   //VALIDACION ASINCRONA
   checkUserName(username:string) : Observable<any>{
     return this.http.get(this.urlApi)
   }

  noHerrera(control: FormControl): {[s: string]: boolean}{

    if (control.value?.toLowerCase( ) === 'herrera') {
      return {
        noHerrera:true
      }
    }
    
    return {noHerrera: false}
  }

  //VALIDACION ASINCRONA
  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> | any{

    if (!control.value) {
      return Promise.resolve(null)
    }
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        if (control.value === 'pulga') {
          resolve({existe: true})
        }
        else{
          resolve(null)
        }
      },3500)

    });
  }

  passwordsIguales(pass1: string, pass2: string){
    
    return ( formGroup : FormGroup) => {

      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      }
      else{
        pass2Control.setErrors({noEsIgual:true});
      }

    }
  }



}
