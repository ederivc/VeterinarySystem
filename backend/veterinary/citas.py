from datetime import date, datetime
import functools

from veterinary.helpers.citasHelpers import (
  verify_appointment, query_appointment, insert_appointment_user,
   insert_appointment
)
# delete_user_appointment

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
          print("user i session")
          verify_appointment(db, _datetime, request.json, "AppointmentUser")
        else:
          print("user not in session")
          verify_appointment(db, _datetime, request.json, "AppointmentGuest")

        return {"dfdsf":"kkk"}


@bp.route('/updateCita', methods=('GET', 'POST'))
def update_cita():
  if request.method == 'POST':
      date = request.json["fecha"]
      hour = request.json["hora"]
      desc = request.json["descripcion"]
      oldAppointment = request.json["oldAppointment"]
        
      _datetime = f"{date} {hour}"

      db = get_db()
      if query_appointment(db, _datetime, "Appointment"):
          db.execute('DELETE FROM AppointmentUser WHERE appointment_id = ?', (oldAppointment["appointment_id"],)
          )
          db.commit()
  
          insert_appointment_user(db, g.user["user_id"], desc, _datetime)

          db.execute(
            'DELETE FROM Appointment WHERE appointment_date = ?',(_datetime,) 
          )
          db.commit()

          insert_appointment(db, oldAppointment["appointment_date"])

          return {"LISTO": "LISTO"}

      response = make_response(jsonify(message="Ha ocurrido un error, verifica tus datos."), 400)
      abort(response)


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
    # print(appointments)
    # print(_dict)

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