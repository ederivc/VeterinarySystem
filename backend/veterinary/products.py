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

bp = Blueprint('products', __name__, url_prefix='/products')


@bp.route('/getProducts', methods=('GET', 'POST'))
def get_products():
    db = get_db()
    products = db.execute(
      'SELECT * FROM Products'
    ).fetchall()
  
    _dict = {}
    for i, product in enumerate(products):
      _dict[i] = product
    
    return _dict


def insert_product(request, img_name):
  nombre = request["nombre"]
  marca = request["marca"]
  precio = request["precio"]
  cantidad = request["cantidad"]
  descripcion = request["descripcion"]
  
  db = get_db()
  db.execute(
    'INSERT INTO Products (name, cantidad, price, descripcion, img, marca) VALUES (?, ?, ?, ?, ?, ?)',
    (nombre, cantidad, precio, descripcion, img_name, marca)
  )
  db.commit()


def save_image(img, filename):
    data = img.split(',', 1)[1]
    imgdata = base64.b64decode(data)

    with open(filename, 'wb') as f:
      f.write(imgdata)

    actual_path = os.path.abspath(filename)

    general_path = os.path.abspath(os.getcwd())
    destination = os.path.join(general_path, "veterinary", "static", "img", "products", filename)

    os.replace(actual_path, destination)



@bp.route('/createProduct', methods=('GET', 'POST'))
def create_product():
  if request.method == "POST":

    try:

      filename = f'producto{request.json["nombre"]}{request.json["marca"]}.png' 

      save_image(request.json["img"], filename) 

      insert_product(request.json, filename)

    except:
      response = make_response(jsonify(message="Ha ocurrido un error, verifica tus datos."), 400)
      abort(response)

    return {"Created":"Created"}

def update_product(request, db, filename):
    id = request["id"]
    name = request["name"]
    cantidad = request["cantidad"]
    price = request["price"]
    descripcion = request["descripcion"]
    marca = request["marca"]
   
    db.execute(
      'UPDATE Products SET name = ?, cantidad = ?, price = ?, descripcion = ?, marca = ?, img = ? WHERE product_id = ?',
      (name, cantidad, price, descripcion, marca, filename, id)
    )
    db.commit() 

@bp.route('/updateProduct', methods=('GET', 'POST'))
def update_product_route():
  if request.method == "POST":
    
    try:
      filename = f'producto{request.json["name"]}.png'
     
      db = get_db()
      real_img_name_dict = db.execute(
        'SELECT img FROM Products WHERE product_id = ?',(request.json["id"],)
      ).fetchone()

      real_img_name = real_img_name_dict["img"]
      
      backend_path = os.path.abspath(os.getcwd())
      img_path = os.path.join(backend_path, "veterinary", "static", "img", "products", real_img_name)
      new_img_path = os.path.join(backend_path, "veterinary", "static", "img", "products", filename)

      client_image = request.json["img"]

      if client_image.startswith("http://"):
        print("do not remove")
        os.rename(img_path, new_img_path)
      else:
        os.remove(img_path)
        save_image(request.json["img"], filename) 

      update_product(request.json, db, filename)

    except:
      response = make_response(jsonify(message="Ha ocurrido un error, verifica tus datos."), 400)
      abort(response)

    return {"ACTUALIZADO": "ACTUALIZADO"}
    

@bp.route('/deleteProduct/<id>/', methods=["DELETE"])
def delete_product(id):
    db = get_db()

    img_name = db.execute(
      'SELECT img FROM Products WHERE product_id = ?', (id,)
    ).fetchone()

    filename = f"{img_name['img']}"
    print(filename)

    backend_path = os.path.abspath(os.getcwd())
    img_path = os.path.join(backend_path, "veterinary", "static", "img", "products", filename)

    os.remove(img_path)

    db.execute('DELETE FROM Products WHERE product_id = ?', (id,)
    )
    db.commit()
    
    return {"DELETE": "DELETE"}