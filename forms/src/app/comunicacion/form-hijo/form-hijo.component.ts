import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PaisModel } from 'src/app/models/paisModel';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-form-hijo',
  templateUrl: './form-hijo.component.html'
})
export class FormHijoComponent implements OnInit {


  mensaje: string;
  paises: PaisModel[] = [];
  paisSeleccionado$ = this.servicioComunicacion.selectedPais$;
  dataEntrante$ = this.servicioComunicacion.getdata$;
  control: HTMLHtmlElement;

  constructor(private servicioComunicacion: ComunicacionService) { 

  }

  ngOnInit(): void {
    console.log(this.paisSeleccionado$)
    console.log(this.dataEntrante$)
  }

  eliminar(){
    this.servicioComunicacion.cambiarEstado(true);
  }
 
}
