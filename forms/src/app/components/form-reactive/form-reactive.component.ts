import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-form-reactive',
  templateUrl: './form-reactive.component.html',
  styleUrls: ['./form-reactive.component.css']
})
export class FormReactiveComponent implements OnInit {

  formulario: FormGroup;
  usuarios :any[];
  usu:Usuario;

  constructor(private fb: FormBuilder, private validadores: ValidadoresService) {

    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    return this.formulario.get('nombre')?.invalid && this.formulario.get('nombre')?.touched
  }

  get apellidoNoValido() {
    return this.formulario.get('apellido')?.invalid && this.formulario.get('apellido')?.touched
  }

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

  get password1NoValido() {
    return this.formulario.get('password1')?.invalid && this.formulario.get('password1')?.touched
  }

  get password2NoValido() {
    const pass1 = this.formulario.get('password1')?.value;
    const pass2 = this.formulario.get('password2')?.value;
    return (pass1 === pass2) ? false : true;
  }
  

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      nombreUsuario: ['', [Validators.required] , this.validadores.existeUsuario],
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
    },{
      validator: this.validadores.passwordsIguales('password1','password2')
    });
  }

  crearListeners(){
    this.formulario.get('nombre')?.valueChanges.subscribe(console.log)
  }

  cargarDataAlFormulario() {
    // this.formulario.reset({})
    // this.formulario.setValue({
    this.formulario.reset({
      nombre: "Leonardo",
      apellido: "Sosa",
      correo: "leos_87@hotmail.com",
      direccion: {
        distrito: "Cochabamba",
        ciudad: "Córdoba"
      }
    });

  }

  guardar() {
    if (this.formulario.invalid) {
      //FOREACH PARA RECORRER LOS CONTROLES DEL FORMULARIO
      Object.values(this.formulario.controls).forEach(control => { //CONTROL ES UN OBJETO DEL FORMULARIO  
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        }
        else {
          //MARCA TODOS LOS CONTROLES COMO TOUCHED  
          control.markAsTouched();
        }
        console.log(control);
      });
    }
    this.usu = new Usuario();
    this.usu.nombre = this.formulario.get('nombre')?.value;
    this.usu=(this.formulario.value)
    // this.usuarios.push(this.usu)
    //POST DE INFORMACION
    this.formulario.reset();
  }



}
