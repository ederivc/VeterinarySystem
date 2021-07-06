import re
import random

from flask import (
    Blueprint, flash, g, json, request, session, abort,
    jsonify, make_response
)

from veterinary.emails import generate_token

from werkzeug.security import check_password_hash, generate_password_hash

from veterinary.db import get_db

bp = Blueprint('users', __name__, url_prefix='/users')

HASH = "pbkdf2:sha256:260000$6wOFlrbwy0xNbBXb$43b14e44a3e17b2197036bdec438ff#'s1352d396270a9ccbb7ajdsha82#ja73741c04a49201bc041"
EMAIL_REGEX = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

def insert_user(db, request):
    nombre = request["nombre"]
    apellidos = request["apellidos"]
    email = request["email"]
    telefono = request["telefono"]
    contraseña = request["contraseña"]
    active_user = 0

    id = "US"
    try:
      if g.user:
        print("admin logged in")
        status = request["status"]
        active_user = 1

        if status == "Administrador":
          id = "AD"
          id = generate_id(id)

        if status == "Cliente":
          id = generate_id(id)

      else: 
        if 'status' in request and request['status'] == "Administrador":
          if not request['hash'] == HASH:
            response = make_response(jsonify(message="No tienes permiso para registrarte como administrador"), 400)
            abort(response)
          else:
            status = "Administrador"
            active_user = 1
            id = generate_id(id)

        else:
          status = "Cliente"
          id = generate_id(id)

      if re.match(EMAIL_REGEX, email):
        db.execute(
            'INSERT INTO User (user_id, email, password, first_name, last_name, phone, status, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        (id, email, generate_password_hash(contraseña), nombre, apellidos, telefono, status, active_user)
          )
        db.commit()
      else:
        response = make_response(jsonify(message="Datos incorrectos, verificalos nuevamente"), 400)
        abort(response)
      
      if not g.user:
        generate_token(email, id)

    except:
      response = make_response(jsonify(message="Datos incorrectos, verificalos nuevamente"), 400)
      abort(response)


def generate_id(id):
  numbers = []
  for _ in range(4):
    numbers.append(random.randint(0, 9))

  for number in numbers:
    id += str(number) 

  return id


def update_user(request, db):
    id = request["id"]
    firstName = request["firstName"]
    lastName = request["lastName"]
    phone = request["phone"]
    status = request["status"]
   
    db.execute(
      'UPDATE User SET first_name = ?, last_name = ?, phone = ?, status = ? WHERE user_id = ?',
      (firstName, lastName, phone, status, id)
    )
    db.commit() 


@bp.route('/createUser', methods=('GET', 'POST'))
def create_user():
    if request.method == "POST":
      print(request.json)
      email = request.json["email"]
      phone = request.json["telefono"]

      db = get_db()
      db_email = db.execute(
          'SELECT email FROM User WHERE email = ?', (email,)
      ).fetchone()

      db_phone = db.execute(
          'SELECT phone FROM User WHERE email = ?', (phone,)
      ).fetchone()

      if db_email is None and db_phone is None:
          insert_user(db, request.json)

      else:
          response = make_response(jsonify(message="Ya existe un usuario registrado con ese correo y teléfono"), 400)
          abort(response)

      if not g.user:
        return {"Response": "Has sido registrado correctamente, verifica tu correo para activar tu cuenta"}
      else:
        return {"Response": "Usuario registrado correctamente"}



@bp.route('/getUser', methods=('GET', 'POST'))
def get_user():
    db = get_db()
    users = db.execute(
      'SELECT * FROM User'
    ).fetchall()
  
    _dict = {}
    for i, user in enumerate(users):
      _dict[i] = user
    
    return _dict


@bp.route('/updateUser', methods=('GET', 'POST'))
def update_user_route():
  if request.method == "POST":
    phone = request.json["phone"]
    id = request.json["id"]

    if g.user["user_id"] == request.json["id"]:
        response = make_response(jsonify(message="No puedes modificarte a ti mismo"), 400)
        abort(response)
    else:
        db = get_db()
        db_phone = db.execute(
          'SELECT phone FROM User WHERE phone = ? AND user_id != ?',(phone, id)
        ).fetchone()

        print(db_phone)
        if db_phone is None:
          update_user(request.json, db)
        else:
          response = make_response(jsonify(message="El número de teléfono ya se encuentra registrado"), 400)
          abort(response)

        return {"ACTUALIZADO": "ACTUALIZADO"}


@bp.route('/updateUserAccount', methods=('GET', 'POST'))
def update_user_account():
  if request.method == "POST":
    contraseña = request.json["contraseña"]
    new_contraseña = request.json["newContraseña"]
    new_confirm_contraseña = request.json["newConfirmarContraseña"]
    telefono = request.json["telefono"]
    apellidos = request.json["apellidos"]
    nombre = request.json["nombre"]

    db = get_db()
    user_request = db.execute(
        'SELECT * FROM user WHERE user_id = ?', (request.json["id"],)
    ).fetchone()

    if contraseña != "" and new_contraseña != "" and new_confirm_contraseña != "":
      if new_contraseña != new_confirm_contraseña:
        response = make_response(jsonify(message="Las contraseñas nuevas no coinciden"), 400)
        abort(response)
        
      if not check_password_hash(user_request['password'], contraseña):
        response = make_response(jsonify(message="La contraseña anterior no coincide con la ingresada"), 400)
        abort(response)
        
      else:
        db.execute(
          'UPDATE User SET first_name = ?, last_name = ?, phone = ?, password = ? WHERE user_id = ?',
          (nombre, apellidos, telefono, generate_password_hash(new_contraseña), request.json["id"])
        )
        db.commit() 

    else:
      db.execute(
        'UPDATE User SET first_name = ?, last_name = ?, phone = ? WHERE user_id = ?',
        (nombre, apellidos, telefono, request.json["id"])
      )
      db.commit() 

    # if random.normalvariate
    return {"Response": "Información actualizada correctamente"}


@bp.route('/deleteUser/<id>/', methods=["DELETE"])
def delete_user(id):
    if g.user["user_id"] == id:
        response = make_response(jsonify(message="No puedes eliminarte a ti mismo"), 400)
        abort(response)
    else:
      db = get_db()
      
      user_in_appointment = db.execute('SELECT * FROM AppointmentUser WHERE user_id = ?', (id,)
      ).fetchall()

      user_in_pedido = db.execute('SELECT * FROM Pedidos WHERE user_id = ?', (id,)
      ).fetchall()

      if len(user_in_appointment) == 0 and len(user_in_pedido) == 0:
        db.execute('DELETE FROM User WHERE user_id = ?', (id,)
        )
        db.commit()

      else:
        response = make_response(jsonify(message="No puedes eliminar un usuario asociado con una cita o pedido"), 400)
        abort(response)
    
      return {"DELETE": "DELETE"}


@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE user_id = ?', (user_id,)
        ).fetchone()