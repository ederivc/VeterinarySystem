# import functools

# from flask import (
#     Blueprint, flash, g, redirect, render_template, request, session, url_for, abort
# )
# from werkzeug.security import check_password_hash, generate_password_hash

# from veterinary.db import get_db

# @bp.route('/login', methods=('GET', 'POST'))
# def login():
#     if request.method == 'POST':
#         user = request.json["user"]
#         password = request.json["password"]

#         db = get_db()
#         error = None
#         user_request = db.execute(
#             'SELECT * FROM user WHERE email = ?', (user,)
#         ).fetchone()

#         if user_request is None:
#             error = "Incorrect user"
#             abort(400)

#         # elif not check_password_hash(user['password'], password):
#             # error = 'Incorrect password.'
#         elif(user_request["password"] != password):
#             error = "Incorrect password"
#             abort(400)

#         if error is None:
#             session.clear()
#             session['user_id'] = user_request['user_id']
#             print(session['user_id'])
#             # _dict = {}
#             # for i, value in enumerate(user_request):
#             #     _dict[i] = value
#             # print(type(user_request))
#             # print(_dict)
#             print(user_request)
#             return user_request

# @bp.before_app_request
# def load_logged_in_user():
#     user_id = session.get('user_id')

#     if user_id is None:
#         g.user = None
#     else:
#         g.user = get_db().execute(
#             'SELECT * FROM user WHERE user_id = ?', (user_id,)
#         ).fetchone()