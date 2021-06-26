import random

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
    nombre = request["nombre"]
    apellidos = request["apellidos"]
    email = request["email"]
    telefono = request["telefono"]
    full_name = f'{nombre} {apellidos}'
    print("Este es el email: ", email)
    print(request)
    if g.user:
        # user_admin = db.execute(
        #   'SELECT email FROM User WHERE email = ? AND status != "Cliente"', (g.user["email"],)
        # ).fetchone()

        # if user_admin is None:
        #   email = g.user["email"]
        # else:
        #   print("Dentro de aqui")
        #   pass
        email = g.user["email"]

        id = "UC"
        numbers = []

        for _ in range(5):
          numbers.append(random.randint(0, 9))

        for number in numbers:
          id += str(number) 

        #FIXME 
        user_id = get_id(db, "user_id", "User", email)

        db.execute(
        'INSERT INTO AppointmentUser (appointment_id, user_id, user_name, user_email, descripcion, appointment_date, approved) VALUES (?, ?, ?, ?, ?, ?, ?)',
        (id, user_id['user_id'], full_name, email, desc, _datetime, 0))
        db.commit()

        print("APPOINTMENT CREATED")

    else:
        guest_id = get_id(db, "guest_id", "Guest", email)

        if guest_id is None:
          try:

            id = "GS"
            numbers = []
            for i in range(4):
              numbers.append(random.randint(0, 9))

            for number in numbers:
              id += str(number) 

            db.execute(
              'INSERT INTO Guest (guest_id, guest_name, guest_lastName, email, phone) VALUES (?, ?, ?, ?, ?)',
              (id, nombre, apellidos, email, telefono))
            db.commit()

            guest_id = get_id(db, "guest_id", "Guest", email)

            id = "GC"
            numbers = []

            for i in range(5):
              numbers.append(random.randint(0, 9))

            for number in numbers:
              id += str(number) 

            db.execute(
            'INSERT INTO AppointmentGuest (appointment_id, guest_id, guest_name, guest_email, appointment_date, descripcion, approved) VALUES (?, ?, ?, ?, ?, ?, ?)',
            (id, guest_id['guest_id'], full_name, email, _datetime, desc, 0))
            db.commit()

          except:
            response = make_response(jsonify(message="Ha ocurrido un error, verifica tus datos."), 400)
            abort(response)

        else:

            id = "GC"
            numbers = []

            for i in range(5):
              numbers.append(random.randint(0, 9))

            for number in numbers:
              id += str(number) 

            db.execute(
            'INSERT INTO AppointmentGuest (appointment_id, guest_id, guest_name, guest_email, appointment_date, descripcion, approved) VALUES (?, ?, ?, ?, ?, ?, ?)',
            (id, guest_id['guest_id'], full_name, email, _datetime, desc, 0))
            db.commit()



def verify_appointment(db, _datetime, request, table):
    if not query_appointment(db, _datetime, "Appointment"):
        print("NOT APPOINT")
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