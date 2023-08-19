import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  usuario: User;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submitted = false;

  onRegister(){
    // if (this.form.invalid) {return}
    this.submitted = true;
    this.usuario = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      name: this.form.controls['name'].value
    }
    console.log(this.usuario)
    console.log(this.form)
  }

  errorPassword(): string {
    const passwordControl = this.form.get('password');

    if (passwordControl?.touched && passwordControl.hasError('required')) {
      return '*Debe ingresar una contraseña';
    }

    if (passwordControl?.touched && passwordControl.hasError('minlength')) {
      return '*La contraseña debe tener al menos 8 caracteres';
    }

    return '';
  }

  errorName(): string {
    const passwordControl = this.form.get('name');

    if (passwordControl?.touched && passwordControl.hasError('required')) {
      return '*Debe ingresar un nombre';
    }

    if (passwordControl?.touched && passwordControl.hasError('minlength')) {
      return '*El nombre debe tener al menos 8 caracteres';
    }

    return '';
  }

  errorEmail(): string {
    const passwordControl = this.form.get('email');

    if (passwordControl?.touched && passwordControl.hasError('required')) {
      return '*Debe ingresar un email';
    }

    if (passwordControl?.touched && passwordControl.hasError('email')) {
      return '*Debe ingresar un email correcto (ejemplo@ejemplo.com)';
    }

    return '';
  }

}
