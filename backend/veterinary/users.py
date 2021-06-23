import random

from flask import (
    Blueprint, flash, g, json, request, session, abort,
    jsonify, make_response
)
from werkzeug.security import check_password_hash, generate_password_hash

from veterinary.db import get_db

bp = Blueprint('users', __name__, url_prefix='/users')

def insert_user(db, request):
    nombre = request["nombre"]
    apellidos = request["apellidos"]
    email = request["email"]
    telefono = request["telefono"]
    contraseña = request["contraseña"]
    
    id = "US"

    if g.user:
      status = request["status"]

      if status == "Administrador":
        id = "AD"

    else: 
      status = "Cliente"

    numbers = []
    for i in range(4):
      numbers.append(random.randint(0, 9))

    for number in numbers:
      id += str(number ) 

    db.execute(
        'INSERT INTO User (user_id, email, password, first_name, last_name, phone, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    (id, email, contraseña, nombre, apellidos, telefono, status)
      )
    db.commit()


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
      email = request.json["email"]

      db = get_db()
      db_email = db.execute(
          'SELECT email FROM User WHERE email = ?', (email,)
      ).fetchone()

      if db_email is None:
          insert_user(db, request.json)

      else:
          response = make_response(jsonify(message="Ya existe un usuario registrado con ese correo"), 400)
          abort(response)

      return {"Response": "Has sido registrado correctamente"}


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


@bp.route('/deleteUser/<id>/', methods=["DELETE"])
def delete_user(id):
    if g.user["user_id"] == id:
        response = make_response(jsonify(message="No puedes eliminarte a ti mismo"), 400)
        abort(response)
    else:
      db = get_db()
      
      db.execute('DELETE FROM User WHERE user_id = ?', (id,)
      )
      db.commit()
    
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