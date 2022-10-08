import { Post } from "../home/post";

export const POSTS: Post[] = [
    {
        id: 1, 
        contenido: 'lorem ipsum', 
        fecha: '2022-10-04', 
        meGusta: [
            1, 
            2, 
            3
        ], 
        usuario: {
            id: 1,
            foto: '/home/mael/fotos/1.jpg',
            email: 'marcosv200007@gmail.com',
            nombres: 'Marcos Emilio',
            apellidos: 'Velasquez Hidalgo',
            password: 'a24&rkj@45./asf'
        }, 
        meGusto: true
    },
    { 
        id: 2, 
        contenido: 'lorem ipsum 2', 
        fecha: '2022-10-01', 
        meGusta: [
            4, 
            5
        ], 
        usuario: {
            id: 2,
            foto: '/home/hveliz/fotos/1.jpg',
            email: 'hveliz@gmail.com',
            nombres: 'Harry Enrique',
            apellidos: 'Veliz',
            password: 'a24&rkj@45./asf'
        }, 
        meGusto: false 
    }
]