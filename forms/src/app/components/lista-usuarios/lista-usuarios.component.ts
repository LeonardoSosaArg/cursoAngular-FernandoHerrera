import { Component, OnInit } from '@angular/core';
import { PaisModel } from 'src/app/models/paisModel';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { PaisService } from 'src/app/services/pais.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  listaUsuarios : UsuarioModel[] = [];
  paisUsuario: PaisModel;

  constructor(private usuarioService: UsuarioService, private paisService: PaisService
    , private comunicacionService: ComunicacionService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.listaUsuarios = usuarios;  
    });

    this.comunicacionService.estadoCambiado().subscribe({
      next: (valor : boolean) => {
        alert('Estado de persona cambiado a valor: ' + valor)
      }
    })
  }

}
