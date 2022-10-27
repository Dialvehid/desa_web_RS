from datetime import date , datetime

class user:
    id = int
    apodo = "" 
    email = ""
    fecha = date
    img = ""
    nombre = ""
    password = ""

class post:
    id = int
    texto = ""
    fecha = date
    meGusta = []
    usuario = user
    meGusto = bool
