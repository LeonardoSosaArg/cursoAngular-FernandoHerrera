import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../models/usuarioModel';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBase = "https://6369411e28cd16bba7192f17.mockapi.io/api/";

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<UsuarioModel[]>{
    return this.http.get<UsuarioModel[]>(this.urlBase+"users");
  }

  deleteUsuario(usuario: UsuarioModel): Observable<any> {
    return this.http.delete(this.urlBase + usuario.id);
  }

  postUsuario(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(this.urlBase+"users", usuario);
  }

  updateUsuario(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.put<UsuarioModel>(this.urlBase + usuario.id, usuario);
  }
}
