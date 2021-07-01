import smtplib

from flask import redirect, Blueprint, abort, jsonify, make_response
from email.message import EmailMessage
from itsdangerous import URLSafeTimedSerializer
from veterinary.db import get_db

bp = Blueprint('confirm', __name__, url_prefix='/confirm')

s = URLSafeTimedSerializer('SECRETKEY')

def generate_token(email, id):
  _email = email
  token = s.dumps(_email, salt="email-confirm")
  send_email(_email, token, id)
  print(token)
  print(id)


@bp.route('/account/<token>/<id>', methods=('GET', 'POST'))
def confirm_email(token, id):
  try:
    email = s.loads(token, salt="email-confirm", max_age=1800)
  except:
    return redirect("http://localhost:3000/404", code=302)

  db = get_db()
  db.execute(
    'UPDATE User SET active = ? WHERE user_id = ?', (1, id)
  )
  db.commit()

  return redirect("http://localhost:3000/login", code=302)


def send_email(email, token, id):
    msg = EmailMessage()
    msg['Subject'] = 'Confirmación de cuenta'
    msg['From'] = "vallaveterinaria569@gmail.com"
    msg['To'] = email
    msg.set_content(f"""Se ha realizado un registro en la plataforma de la veterinaria Valladolid con esta cuenta, para activarla de click en el siguiente link:
    http://localhost:5000/confirm/account/{token}/{id}
    Ingrese al link para poder iniciar sesión.
    Si no reconoce esto, ignore el correo.""")

    try:
      with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
          smtp.login("vallaveterinaria569@gmail.com", "valla123")
          smtp.send_message(msg)
    except:
      response = make_response(jsonify(message="Datos incorrectos, verificalos nuevamente"), 400)
      abort(response)