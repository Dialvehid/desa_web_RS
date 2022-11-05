import { Usuario } from "../login/usuario";

export class Post {
    id: number;
    usuario: Usuario;
    contenido: string;
    meGusta: string[];
    img: string;
    fecha: string;
    meGusto?: boolean;
}
