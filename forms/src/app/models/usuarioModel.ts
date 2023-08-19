import { PaisModel } from "./paisModel"

export class UsuarioModel{
    nombre: string;
    edad: number;
    genero: string;
    pais: PaisModel;
    fechaNacimiento: Date;
    nombreUsuario: string;
    id?: number;
    activo: boolean = false;
}