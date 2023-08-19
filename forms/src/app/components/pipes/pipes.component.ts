import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css']
})
export class PipesComponent implements OnInit {

  nombre: string = 'Leonardo';
  nombre2: string = 'leOnArdO sOsA';

  videoUrl: string = "https://www.youtube.com/embed/G-jKlhaA1_k";
  array = [1,2,3,4,5,6,7,8,9,10];

  constructor() { }

  ngOnInit(): void {
  }

  valorPromesa = new Promise((resolve) => {
    setTimeout(() => {
      resolve('llego la Data')
    }, 4500);
  });
  
  idioma: string = 'fr';

  cambiarIdioma(idio: string){
    this.idioma = idio;
  }

  fecha: Date = new Date();
  PI: number = Math.PI;
  porcentaje: number = 0.234;
  salario: number = 1234.5;

  heroe = {
    nombre: 'Leo',
    clave: 'Messi',
    edad: '33',
    direccion:{
      calle: 'Psg',
      pais: 'Paris'
    }
  }

}
