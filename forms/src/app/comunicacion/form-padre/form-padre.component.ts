import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaisModel } from 'src/app/models/paisModel';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-form-padre',
  templateUrl: './form-padre.component.html'
})
export class FormPadreComponent implements OnInit {

  mensaje: string;
  paises: PaisModel[] = [];
  paisSeleccionado: PaisModel;
  dataEntrante: string;

  constructor(private servicioComunicacion: ComunicacionService) { 
    console.log(this.paisSeleccionado);
  }

  ngOnInit(): void {
    this.servicioComunicacion.getPaises().subscribe(paises => {
      this.paises = paises;
    })
    this.servicioComunicacion.setPais(this.paisSeleccionado);
  }

  pasarDatos(dataEntrante:string){
    this.dataEntrante = dataEntrante;
    this.servicioComunicacion.setPais(this.paisSeleccionado);
    this.servicioComunicacion.setData(dataEntrante +' '+ this.paisSeleccionado);
    console.log(dataEntrante)
    console.log(this.paisSeleccionado);
  }

  onPaisSelected(pais: PaisModel) : void {
    this.servicioComunicacion.setPais(pais);
  }
  

}
