import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/models/userLogin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: UserLogin;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submitted = false;

  onLogin(){
    // if (this.form.invalid) {return}
    this.submitted = true;
    this.usuario = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
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
      return '*La contraseña debe tener al menos 6 caracteres';
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
