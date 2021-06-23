import functools
import base64
import os
import io

from flask import (
    Blueprint, flash, g, json, redirect, render_template, request, session, url_for, abort,
    jsonify, make_response
)
from werkzeug.security import check_password_hash, generate_password_hash
from pathlib import Path

from veterinary.db import get_db

bp = Blueprint('animals', __name__, url_prefix='/animals')


def insert_animal(request, img_name):
  nombre = request["nombre"]
  precio = request["precio"]
  edad = request["edad"]
  descripcion = request["descripcion"]
  tipo = request["tipo"]
  
  print("before")
  db = get_db()
  db.execute(
    'INSERT INTO Animal (nombre_animal, descripcion, precio, edad, img, tipo) VALUES (?, ?, ?, ?, ?, ?)',
    (nombre, descripcion, precio, edad, img_name, tipo)
  )
  db.commit()
  print("after")


@bp.route('/createAnimal', methods=('GET', 'POST'))
def create_animal():
  if request.method == "POST":

    try:
      data = request.json["img"].split(',', 1)[1]
      imgdata = base64.b64decode(data)

      filename = f'animal{request.json["nombre"]}.png'
      print(filename)  

      with open(filename, 'wb') as f:
        f.write(imgdata)

      actual_path = os.path.abspath(filename)

      general_path = os.path.abspath(os.getcwd())
      destination = os.path.join(general_path, "veterinary", "static", "img", "animals", filename)

      os.replace(actual_path, destination)

      insert_animal(request.json, filename)

    except:
      response = make_response(jsonify(message="Ha ocurrido un error, verifica tus datos."), 400)
      abort(response)

    return {"ANINMAL": "CREADO"}