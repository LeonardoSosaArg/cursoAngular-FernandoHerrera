import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  usuario: UsuarioModel;
  recordarUsuario = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm){
    if (form.invalid) {
      return;
    }
    Swal.fire(    
      'Cargando',
      'Espere por favor...',
      'info'   
    )
    this.authService.registrarUsuario(this.usuario).subscribe( respuesta =>{
      console.log(respuesta);
      Swal.close();
      if (this.recordarUsuario) {
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');
    }, (error) => {
      Swal.fire(    
        'Error al iniciar sesión',
        `${error.error.error.message}`,
        'error'   
      )
      console.log(error.error.error.message)
    }
    );
    
  }


}
