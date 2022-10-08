import { Usuario } from "../login/usuario";

export class Post {
    id: number | undefined;
    usuario: Usuario | undefined;
    contenido: string | undefined;
    meGusta: number[] | undefined;
    fecha: string | undefined;
    meGusto?: boolean;
}
