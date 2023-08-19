import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PaisModel } from 'src/app/models/paisModel';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { PaisService } from 'src/app/services/pais.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidadoresService } from 'src/app/services/validadores.service';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-formulario-parcial',
  templateUrl: './formulario-parcial.component.html',
  styleUrls: ['./formulario-parcial.component.css']
})
export class FormularioParcialComponent implements OnInit {

  formulario: FormGroup;
  usuarios :UsuarioModel[];
  usu:UsuarioModel;
  listapaises: PaisModel[] = [];
  paisSeleccionado: PaisModel;
  optionDefault = "Seleccione un País";
  private subscription = new Subscription();

  constructor(private fb: FormBuilder, private validadores: ValidadoresService,
              private servicioComunicacion: ComunicacionService,
              private servicePaises: PaisService, private serviceUsuario: UsuarioService ) {

    this.crearFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
    this.servicePaises.getPaises().subscribe(paises => {
      this.listapaises = paises;
      console.log(this.listapaises)
    })
    this.servicioComunicacion.setPais(this.paisSeleccionado);
  }

  onPaisSelected(pais: PaisModel) : void {
    this.servicioComunicacion.setPais(pais);
  }

  get nombreNoValido() {
    return this.formulario.get('nombre')?.invalid && this.formulario.get('nombre')?.touched
  }

  public get edad() { return this.formulario.get('edad') };

  get correoNoValido() {
    return this.formulario.get('correo')?.invalid && this.formulario.get('correo')?.touched
  }
  get distritoNoValido() {
    return this.formulario.get('direccion.distrito')?.invalid && this.formulario.get('direccion.distrito')?.touched
  }
  get ciudadNoValido() {
    return this.formulario.get('direccion.ciudad')?.invalid && this.formulario.get('direccion.ciudad')?.touched
  }

  get usuarioNoValido() {
    return this.formulario.get('nombreUsuario')?.invalid && this.formulario.get('nombreUsuario')?.touched
  }

  get sexoNoValido() {
    return this.formulario.get('sexo')?.invalid && this.formulario.get('sexo')?.touched
  }

  get fechaNoValido() {
    return this.formulario.get('fechaNacimiento')?.invalid && this.formulario.get('fechaNacimiento')?.touched
  }

  get edadNoValido() {
    return this.formulario.get('edad')?.invalid && this.formulario.get('edad')?.touched
  }

  get paisNoValido() {
    return this.formulario.get('paises')?.invalid && this.formulario.get('paises')?.touched
  }


  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      edad: ["", [Validators.minLength(2), Validators.maxLength(3),Validators.min(18), Validators.required]],
      nombreUsuario: ['', [Validators.required] , usuarioExiste(this.validadores)], updateOn : blur,
      fechaNacimiento: ["", [Validators.required]],
      sexo: ["", [Validators.required]],
      paises: ["", [Validators.required, Validators.min(1)]],
      activo:[]
    });
  }

  crearListeners(){
    this.formulario.get('nombre')?.valueChanges.subscribe(console.log)
  }

  cargarDataAlFormulario() {
    this.formulario.reset();
  }

  guardar() {

    if (this.formulario.invalid) {
      //FOREACH PARA RECORRER LOS CONTROLES DEL FORMULARIO
      return Object.values(this.formulario.controls).forEach(control => { //CONTROL ES UN OBJETO DEL FORMULARIO  
        control.markAsTouched();
    });
  }
  console.log(this.formulario.value)
  this.usu = new UsuarioModel();
  this.usu=(this.formulario.value)
  this.subscription.add(//POST DE USUARIO
    this.serviceUsuario.postUsuario(this.usu).subscribe({
      next: () => {
        alert(`Cliente ${this.usu.nombre} guardado con éxito`);
      },
      error: (e) => {
       console.log(e)
      },
    })
  );

  }

}

export function usuarioExiste(api:any) : AsyncValidatorFn{
  return (control: AbstractControl) => {
    return api.checkUserName(control.value)
    .pipe(
      map(({result}) => (result)? {nicknameExists: true } : null)
    );
  }
 }
