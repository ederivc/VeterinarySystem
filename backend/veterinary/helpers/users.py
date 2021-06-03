def get_id(db, field, table, email):
    user_id = db.execute(
      f'SELECT {field} FROM {table} WHERE email = ?', (email,)
    ).fetchone()

    return user_id