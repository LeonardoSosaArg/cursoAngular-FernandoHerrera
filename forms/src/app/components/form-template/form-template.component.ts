import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pais } from 'src/app/models/pais';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent implements OnInit {

  paises: any[];

  usuario = {
    nombre: 'Lionel',
    apellido: 'Messi',
    correo: 'pulga@gmail.com',
    pais: 'ARG',
    genero: 'M'
  }

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe((paises: any) => {
        this.paises = paises;
        this.paises.unshift({
          name: '[Seleccione País]',
          alpha3Code: ''
        })
        Object.values(this.paises).forEach((pais: any) => {
        })
      })
  };



  guardar(formTemp: NgForm) {
    
    if (formTemp.invalid) {
      //FOREACH PARA RECORRER LOS CONTROLES DEL FORMULARIO
      Object.values(formTemp.controls).forEach(control => { //CONTROL ES UN OBJETO DEL FORMULARIO
        control.markAsTouched();//MARCA TODOS LOS CONTROLES COMO TOUCHED
      });
      return;
    }
    console.log('submit!!');
    console.log(formTemp.value);
    
  }

}
