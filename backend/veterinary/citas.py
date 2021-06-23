from datetime import date, datetime
import functools

from veterinary.helpers.citasHelpers import (
  verify_appointment, query_appointment, insert_appointment_user,
   insert_appointment, insert_cita
)

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, abort,
    jsonify, make_response
)
from werkzeug.security import check_password_hash, generate_password_hash

from veterinary.db import get_db

bp = Blueprint('citas', __name__, url_prefix='/citas')

@bp.route('/createCita', methods=('GET', 'POST'))
def create_cita():
    if request.method == 'POST':
        date = request.json["fecha"]
        hour = request.json["hora"]
        
        _datetime = f"{date} {hour}"

        db = get_db()
        error = None

        if session:
          print("user in session")
          insert_cita(db, request.json, _datetime)

        else:
          print("user not in session")
          insert_cita(db, request.json, _datetime)

        return {"dfdsf":"kkk"}


@bp.route('/updateCita', methods=('GET', 'POST'))
def update_cita():
  if request.method == 'POST':
      date = request.json["fecha"]
      hour = request.json["hora"]
      desc = request.json["descripcion"]
      id = request.json["appointmentId"]

      _datetime = f"{date} {hour}"

      db = get_db()

      db.execute(
        'UPDATE AppointmentUser SET descripcion = ?, appointment_date = ? WHERE appointment_id = ?',
        (desc, _datetime, id))
      db.commit()
      
      return {"LISTO": "LISTO"}

      # response = make_response(jsonify(message="Ha ocurrido un error, verifica tus datos."), 400)
      # abort(response)


@bp.route('/deleteAppointment/<id>/', methods=["DELETE"])
def delete_appointment(id):
    db = get_db()

    _date = db.execute(
      'SELECT appointment_date FROM AppointmentUser WHERE appointment_id = ?', (id,)
    ).fetchone()

    db.execute(
      'INSERT INTO Appointment (appointment_date) VALUES (?)',(_date["appointment_date"],)
    )
    db.commit()

    db.execute('DELETE FROM AppointmentUser WHERE appointment_id = ?', (id,)
    )
    db.commit()
    
    return {"DELETE": "DELETE"}


@bp.route('/deleteAppointmentNotification', methods=["POST"])
def delete_appointment_notification():
  id = request.json["appointment_id"]
  db = get_db()

  if id[:2] == "UC":
    db.execute(
      'DELETE FROM AppointmentUser WHERE appointment_id = ?', (id,)
    )
    db.commit()
  else:
    db.execute(
      'DELETE FROM AppointmentGuest WHERE appointment_id = ?', (id,)
    )
    db.commit()

  return {"Remove": "Remove"}


@bp.route('/approveCita', methods=('GET', 'POST'))
def approve_cita():
  _request = request.json["cita"]
  
  db = get_db()

  if _request["appointment_id"][:2] == 'UC':
    db.execute(
      'UPDATE AppointmentUser SET approved = 1 WHERE appointment_id = ?',
    (_request["appointment_id"],))
    db.commit()
    
  else:
    db.execute(
      'UPDATE AppointmentGuest SET approved = 1 WHERE appointment_id = ?',
    (_request["appointment_id"],))
    db.commit()

  return {"Approved": "Approved"}
  

@bp.route('/getDates', methods=('GET', 'POST'))
def get_dates():
  db = get_db()
  dates = db.execute(
      'SELECT appointment_date FROM Appointment'
  ).fetchall()
  
  _dates = {}
  for i, date in enumerate(dates):
    _dates[i] = list(date.values())[0]
    
  return _dates


@bp.route('/getUserCita', methods=["GET"])
def get_user_cita():
  db = get_db()
  user_citas = db.execute(
    'SELECT * FROM AppointmentUser WHERE approved = 0'
  ).fetchall()

  guest_citas = db.execute(
    'SELECT * FROM AppointmentGuest WHERE approved = 0'
  ).fetchall()

  user_citas.extend(guest_citas)

  _dict = {}
  for i, cita in enumerate(user_citas):
    _dict[i] = cita

  return _dict

@bp.route('/getCitaAprobada', methods=["GET"])
def get_user_cita_aprobada():
  db = get_db()
  user_citas = db.execute(
    'SELECT * FROM AppointmentUser WHERE approved = 1'
  ).fetchall()

  guest_citas = db.execute(
    'SELECT * FROM AppointmentGuest WHERE approved = 1'
  ).fetchall()

  user_citas.extend(guest_citas)

  _dict = {}
  for i, cita in enumerate(user_citas):
    _dict[i] = cita

  return _dict


@bp.route('/getAppointment', methods=["GET"])
def get_appointment():
  db = get_db()
  error = None 
  if g.user:
    id = g.user["user_id"]
    appointments = db.execute(
        'SELECT * FROM AppointmentUser WHERE user_id = ?', (id,)
    ).fetchall()

    _dict = {}
    for i, appointment in enumerate(appointments):
      _dict[i] = appointment

  return _dict



@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE user_id = ?', (user_id,)
        ).fetchone()