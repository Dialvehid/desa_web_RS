# importaciones
from flask import Flask, jsonify, request
from flask import Response
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin
from model import user
from config import config

### DEFINICIONES GLOBALES ###
app = Flask(__name__)
cors = CORS(app)
conexion=MySQL(app)

# Validacion de exitencia de usuario
def existe(id):
    cursor=conexion.connection.cursor()
    query="SELECT idusr FROM USRS WHERE idusr="+id
    cursor.execute(query)
    datos=cursor.fetchall()
    if (datos==()):
        return False
    else:
        return True

# Vlaidacion de me gusta propio
def validaSeGusta(_idpst,_idusr):
    cursor=conexion.connection.cursor()
    query="SELECT * FROM REACT_POST WHERE idpst="+_idpst+" AND idusr="+_idusr
    cursor.execute(query)
    datos=cursor.fetchall()
    if (datos==()):
        return False
    else:
        return True

# Listado de apodos megusta
def megustas(idpost):
    cursor=conexion.connection.cursor()
    query = 'SELECT US.apodo FROM REACT_POST AS RP INNER JOIN USRS AS US ON RP.idusr = US.idusr WHERE RP.idpst='+idpost
    cursor.execute(query)
    datos=cursor.fetchall()
    molas=[]
    if (datos==()):
        return molas
    else:
        for fila in datos:
            mola={'apodo':fila}
            molas.append(mola)
    return jsonify(molas).json

# Detalles de usuario por id
def usuarioDetalle(_id):
    cursor=conexion.connection.cursor()
    query="SELECT * FROM USRS WHERE idusr="+_id
    cursor.execute(query)
    datos=cursor.fetchall()
    if (datos==()):
        return []
    else:
        for fila in datos:
            usuario={'idusr':fila[0],'nombre':fila[1],'apodo':fila[2],'fechanac':fila[3],'correo':fila[4],'pass':fila[5]}
        return jsonify(usuario).json
### /DEFINICIONES  GLOBALES ###

### USUARIO CONTROLLER ###
# Endpoint listado de usuarios
@app.route('/usuarios', methods=['GET'])
@cross_origin()
def listar_usuario():
    try:
        cursor=conexion.connection.cursor()
        query="SELECT * FROM USRS"
        cursor.execute(query)
        datos=cursor.fetchall()
        data=[]
        if (datos==()):
            return Response(response="Sin usuarios jeje",status=404)
        for fila in datos:
            usuario = {'id':fila[0],'nombre':fila[1],'apodo':fila[2],'fechanac':fila[3],'correo':fila[4],'img':fila[5],'pswd':fila[6]}
            data.append(usuario)
        return jsonify(data) 
    except Exception as ex:
        return Response(response="Error: Error interno"+ str(ex) ,status=500)

# Busqueda de usuario por nombre
@app.route('/usuario/name/<nombre>', methods=['GET'])
@cross_origin()
def listar_usuariobyname(nombre):
    try:
        cursor=conexion.connection.cursor()
        query="SELECT * FROM USRS WHERE nombre LIKE '%"+str(nombre)+"%'"
        cursor.execute(query)
        datos=cursor.fetchall()
        data=[]
        if (datos==()):
            return Response(response="error:usuario no encontrado",status=404)
        for fila in datos:
            usuario = {'id':fila[0],'nombre':fila[1],'apodo':fila[2],'fechanac':fila[3],'correo':fila[4],'img':fila[5],'pswd':fila[6]}
            data.append(usuario)
        return jsonify(data) 
    except Exception as ex:
        return Response(response="Error: Error interno"+ str(ex) ,status=500)

# Busqueda de usuario por apodo
@app.route('/usuario/nick/<nick>', methods=['GET'])
@cross_origin()
def listar_usuariobynick(nick):
    try:
        cursor=conexion.connection.cursor()
        query="SELECT * FROM USRS WHERE apodo LIKE '%"+str(nick)+"%'"
        cursor.execute(query)
        datos=cursor.fetchall()
        data=[]
        if (datos==()):
            return Response(response="error:usuario no encontrado",status=404)
        for fila in datos:
            usuario = {'id':fila[0],'nombre':fila[1],'apodo':fila[2],'fechanac':fila[3],'correo':fila[4],'img':fila[5],'pswd':fila[6]}
            data.append(usuario)
        return jsonify(data) 
    except Exception as ex:
        return Response(response="Error: Error interno"+ str(ex) ,status=500)

# Busqueda de usuario por correo
@app.route('/usuario/mail/<mail>', methods=['GET'])
@cross_origin()
def listar_usuariobymail(mail):
    try:
        cursor=conexion.connection.cursor()
        query="SELECT * FROM USRS WHERE correo = '"+str(mail)+"'"
        cursor.execute(query)
        datos=cursor.fetchall()
        data=[]
        if (datos==()):
            return Response(response="error:usuario no encontrado",status=404)
        for fila in datos:
            usuario = {'id':fila[0],'nombre':fila[1],'apodo':fila[2],'fechanac':fila[3],'correo':fila[4],'img':fila[5],'pswd':fila[6]}
            data.append(usuario)
        return jsonify(data) 
    except Exception as ex:
        return Response(response="Error: Error interno"+ str(ex) ,status=500)

# Busqueda de usuario por id
@app.route('/usuario/id/<id>', methods=['GET'])
@cross_origin()
def listar_usuariobyid(id):
    try:
        cursor=conexion.connection.cursor()
        query="SELECT * FROM USRS WHERE idusr = "+str(id)
        cursor.execute(query)
        datos=cursor.fetchall()
        data=[]
        if (datos==()):
            return Response(response="usuario no encontrado",status=404)
        for fila in datos:
            usuario = {'id':fila[0],'nombre':fila[1],'apodo':fila[2],'fechanac':fila[3],'correo':fila[4],'img':fila[5],'pswd':fila[6]}
            data.append(usuario)
        return jsonify(data) 
    except Exception as ex:
        return Response('Error: '+ str(ex),status=500)

# Creacion/actualizacion de usuario
@app.route('/usuario', methods=['POST','PUT'])
@cross_origin()
def newUser():
    try:
        cursor=conexion.connection.cursor()
        rqData=request.get_json()
        if(request.method=='POST'):
            user.nombre=rqData['nombres']
            user.apodo=rqData['apodo']
            user.fecha=rqData['fecha']
            user.email=rqData['email']
            user.img=rqData['img']
            user.password=rqData['password']
            query="INSERT INTO USRS (nombre, apodo, fechanac,correo,imgperf,pass) VALUES('"+user.nombre+"','"+user.apodo+"','"+user.fecha+"','"+user.email+"','"+user.img+"','"+user.password+"')"
        elif(request.method=='PUT' and existe(str(rqData['idusr']))):
            user.id=rqData['idusr']
            user.nombre=rqData['nombres']
            user.apodo=rqData['apodo']
            user.fecha=rqData['fecha']
            user.email=rqData['email']
            user.img=rqData['img']
            user.password=rqData['password']
            query="UPDATE USRS SET nombre='"+user.nombre+"', apodo='"+user.apodo+"', fechanac='"+user.fecha+"',correo='"+user.email+"',imgperf='"+user.img+"',pass='"+user.password+"'" 
            query=query+"WHERE idusr="+str(user.id)
        else:
            return Response(response="Solicitud erronea",status=400)
        cursor.execute(query)
        conexion.connection.commit()
        return jsonify()
    except Exception as ex:
        return Response(response="Error: Error interno"+ str(ex) ,status=500)

### /USUARIO CONTROLLER ###

### POST CONTROLLER

# Creacion de post
@app.route('/post', methods=['POST'])
@cross_origin()
def newPost():
    try:
        cursor=conexion.connection.cursor()
        rqData=request.get_json()
        query="INSERT INTO POST (idusr, texto, fecha,img) VALUES("+str(rqData['usuario'])+",'"+rqData['texto']+"','"+rqData['fecha']+"','"+rqData['img']+"')"
        cursor.execute(query)
        conexion.connection.commit()
        return jsonify()
    except Exception as ex:
        return Response(response="Error: Error interno"+ str(ex) ,status=500)

# Listado de post
@app.route('/post', methods=['GET'])
@cross_origin
def postList():
    try:
        cursor=conexion.connection.cursor()
        query="SELECT * FROM POST ORDER BY fecha DESC LIMIT 10"
        cursor.execute(query)
        datos=cursor.fetchall()
        data=[]
        for fila in datos:
            megusta=megustas(str(fila[0]))
            useri=usuarioDetalle(str(fila[1]))
            segusta=validaSeGusta(str(fila[0]),str(fila[1]))
            post = {'texto':fila[2],'fecha':str(fila[3]),'imagen':fila[4],'megusta':megusta,'usuario':useri,'segusta':segusta}
            data.append(post)
        
        return jsonify({'posts': data})
    except Exception as ex:
        return Response(response=str(ex),status=500)

### /POST CONTROLLER

### REACCION CONTROLLER
@app.route('/react', methods=['GET'])
@cross_origin()
def reaccion():
    try:
        cursor=conexion.connection.cursor()
        rqData=request.get_json()
        bandera=validaSeGusta(str(rqData['idpst']),str(rqData['idusr']))
        if (bandera):
            query = "DELETE FROM REACT_POST WHERE idpst="+str(rqData['idpst'])+" AND idusr="+str(rqData['idusr'])
        else:
            query = "INSERT INTO REACT_POST (idpst,idusr) VALUES("+str(rqData['idpst'])+","+str(rqData['idusr'])+")"
        print(query)
        cursor.execute(query)
        conexion.connection.commit()
        return jsonify()
    except Exception as ex:
        return Response(response="Error: Error interno"+ str(ex) ,status=500)

### /REACCION CONTROLLER

# Manejador de error 404
def resource_not_found():
    return "El recurso solicatdo no existe"

# main
if __name__=='__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, resource_not_found)
    app.run()