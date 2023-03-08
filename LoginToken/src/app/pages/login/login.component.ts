import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarUsuario = false;


  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email')
      this.recordarUsuario = true;
    }
  }

  login(form: NgForm){
    if (form.invalid) {
      return;
    }
    Swal.fire(    
      'Cargando',
      'Espere por favor...',
      'info'   
    )


    this.authService.login(this.usuario)
    .subscribe( resp => {
      console.log(resp)
      Swal.close();
      if (this.recordarUsuario) {
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');
    }, (error) => {
      console.log(error.error.error.message)
      Swal.fire(    
        'Error al iniciar sesión',
        `${error.error.error.message}`,
        'error'   
      )
    });
    
  }

}
