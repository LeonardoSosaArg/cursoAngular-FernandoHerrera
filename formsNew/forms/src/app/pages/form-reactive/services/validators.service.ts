import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor() {}

  leyRepetida(control: FormControl): { [s: string]: boolean } {
    var leyCargada = 'Ley Repetida';
    if (control.value.toLowerCase() == leyCargada.toLowerCase()) {
      return {
        leyRepetida: true,
      };
    } else return {

    };
  }


}
