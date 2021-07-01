import ast
import random

from flask import (
    Blueprint, flash, g, json, redirect, render_template, request, session, abort,
    jsonify, make_response
)
from werkzeug.security import check_password_hash, generate_password_hash

from datetime import datetime

from veterinary.db import get_db

bp = Blueprint('pedidos', __name__, url_prefix='/pedidos')


@bp.route('/createPedido', methods=('GET', 'POST'))
def create_pedido():
  if request.method == "POST":
    data = request.json["data"]
    direccion = data["direccion"]
    codigo_postal = data["codigoPostal"]
    pedidos = data["Pedidos"]
    total = data["Total"]

    if len(pedidos) == 0:
      response = make_response(jsonify(message="Debes agregar productos al carrito para realizar un pedido"), 400)
      abort(response)

    pedido_id = "PD"

    numbers = []
    for i in range(4):
      numbers.append(random.randint(0, 9))

    for number in numbers:
      pedido_id += str(number ) 

    db = get_db()

    if g.user: 
      if g.user['user_id'][:2] == "AD":
        response = make_response(jsonify(message="No puedes generar un pedido como administrador"), 400)
        abort(response)

      db.execute(
       'INSERT INTO Pedidos (pedido_id, user_id, date, direccion, codigo_postal, products, status, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
       (pedido_id, g.user['user_id'], str(datetime.now()), direccion, codigo_postal, str(pedidos), "Realizado", total)
      )
      db.commit()

    else:
      response = make_response(jsonify(message="Necesitas iniciar sesión para poder realizar un pedido."), 400)
      abort(response)

    return {"Response": "Tu pedido ha sido generado correctamente"}


@bp.route('/getPedidos', methods=['GET'])
def get_pedidos():
  db = get_db()
  error = None 
  if g.user:
    id = g.user["user_id"]
    pedidos = db.execute(
        'SELECT * FROM Pedidos WHERE user_id = ?', (id,)
    ).fetchall()

    _dict = {}
    for i, pedido in enumerate(pedidos):
      pedido["products"] = ast.literal_eval(pedido["products"])
      _dict[i] = pedido

    # print(_dict)

  return _dict


@bp.route('/getAllPedidos', methods=['GET'])
def get_all_pedidos():
  db = get_db()
  if g.user:
    pedidos = db.execute(
        'SELECT * FROM Pedidos'
    ).fetchall()

    _dict = {}
    for i, pedido in enumerate(pedidos):
      pedido["products"] = ast.literal_eval(pedido["products"])
      _dict[i] = pedido

    # print(_dict)

  return _dict


@bp.route('/updatePedido', methods=('GET', 'POST'))
def update_pedido():
  if request.method == "POST":
    id = request.json["id"]
    status = request.json["status"]

    db = get_db()
    db.execute(
      'UPDATE Pedidos SET status = ? WHERE pedido_id = ?',
      (status, id)
    )
    db.commit() 

    return {"Update": "Pedido"}


@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE user_id = ?', (user_id,)
        ).fetchone()