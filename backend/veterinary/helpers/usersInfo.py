def get_id(db, field, table, email):
    user_id = db.execute(
      f'SELECT {field} FROM {table} WHERE email = ?', (email,)
    ).fetchone()
    print("user_id", user_id)
    return user_id