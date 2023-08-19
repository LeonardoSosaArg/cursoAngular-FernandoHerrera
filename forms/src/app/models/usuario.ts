export class Usuario {

    nombre: string;
    apellido: string;
    correo: string;
    direccion: {
        distrito: string,
        ciudad: string
    };
}