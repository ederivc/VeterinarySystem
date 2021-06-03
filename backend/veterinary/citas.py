from datetime import date, datetime
import functools

from veterinary.helpers.citasHelpers import verify_appointment

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, abort
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
          verify_appointment(db, _datetime, request.json, "AppointmentUser")
        else:
          verify_appointment(db, _datetime, request.json, "AppointmentGuest")

        return {"dfdsf":"kkk"}


@bp.route('/getDates', methods=('GET', 'POST'))
def get_dates():
  db = get_db()
  error = None 
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
    print("jahdkjhad")
    id = g.user["user_id"]
    print(id)
    appointments = db.execute(
        'SELECT * FROM AppointmentUser WHERE user_id = ?', (id,)
    ).fetchall()

    _dict = {}
    for i, appointment in enumerate(appointments):
      _dict[i] = appointment
    print(appointments)
    print(_dict)

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