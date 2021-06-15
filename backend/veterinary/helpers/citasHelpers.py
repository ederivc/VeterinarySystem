from flask import (
  g, abort, jsonify, make_response
)

from veterinary.helpers.usersInfo import get_id

def query_appointment(db, _datetime, table):
    request = db.execute(f'SELECT * FROM {table} WHERE appointment_date = ?', (_datetime,)
    ).fetchone()
    if request is None:
      return False
    else:
      return True

def removeCita(db, _datetime):
  db.execute(
      'DELETE FROM Appointment WHERE appointment_date = ?',(_datetime,)
  )
  db.commit()

def delete_user_appointment(db, table, field, value):
  db.execute(
      'DELETE FROM ? WHERE ? = ?',(table, field, value) 
  )
  db.commit()

def insert_appointment_user(db, id, desc, _date):
    db.execute(            
      'INSERT INTO AppointmentUser (user_id, descripcion, appointment_date) VALUES (?, ?, ?)',
    (id, desc, _date))
    db.commit()
  
def insert_appointment(db, _date):
    db.execute(
        'INSERT INTO Appointment (appointment_date) VALUES (?)',
    (_date,))
    db.commit() 

def insert_cita(db, request, _datetime):
    for req in request:
      print(request[req])
      if request[req] is None or request[req] == "" or request[req] == " ":
          response = make_response(jsonify(message="Ha ocurrido un error, verifica tus datos."), 400)
          abort(response)


    desc = request["descripcion"]
    
    if g.user:
        email = g.user["email"]

        user_id = get_id(db, "user_id", "User", email)
    
        db.execute(
        'INSERT INTO AppointmentUser (user_id, descripcion, appointment_date) VALUES (?, ?, ?)',
        (user_id['user_id'], desc, _datetime))
        db.commit()
        removeCita(db, _datetime)

        print("APPOINTMENT CREATED")

    else:
        print("we dont ave user")
        name = request["nombre"]
        last_name = request["apellidos"]
        phone = request["telefono"]
        email = request["email"]

        guest_id = get_id(db, "guest_id", "Guest", email)

        if guest_id is None:
          try:
            db.execute(
              'INSERT INTO Guest (guest_name, guest_lastName, email, phone) VALUES (?, ?, ?, ?)',
              (name, last_name, email, phone))
            db.commit()

            guest_id = get_id(db, "guest_id", "Guest", email)

            db.execute(
            'INSERT INTO AppointmentGuest (guest_id, appointment_date, descripcion) VALUES (?, ?, ?)',
            (guest_id['guest_id'], _datetime, desc))
            db.commit()

            removeCita(db, _datetime)
          except:
            response = make_response(jsonify(message="Ha ocurrido un error, verifica tus datos."), 400)
            abort(response)

        else:
            db.execute(
            'INSERT INTO AppointmentGuest (guest_id, appointment_date, descripcion) VALUES (?, ?, ?)',
            (guest_id['guest_id'], _datetime, desc))
            db.commit()

            removeCita(db, _datetime)

def verify_appointment(db, _datetime, request, table):
    if not query_appointment(db, _datetime, "Appointment"):
        print("NOT APPOINT")
        # if not query_appointment(db, _datetime, "AppointmentUser"):
        if not query_appointment(db, _datetime, table):
            # Maybe the appoitment doesn't exit or is in the GUEST/User table (Error)
            print("NOT APPOINT USER/GUEST")
            response = make_response(jsonify(message="No existe una fecha para esa cita."), 400)
            abort(response)

        else:
            # Appointment is already in the USER/GUEST Appointment table (Error)
            response = make_response(jsonify(message="La cita con esa fecha ya está agendada."), 400)
            abort(response)
    else:
        # The appointment is available
        print("Appointment available")
        insert_cita(db, request, _datetime)