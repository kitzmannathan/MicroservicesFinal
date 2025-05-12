import sqlite3

class Schema:
   def __init__(self):
       self.conn = sqlite3.connect('user.db')
       self.create_user_table()

   def __del__(self):
       # body of destructor
       self.conn.commit()
       self.conn.close()

   def create_user_table(self):
       query = """
       CREATE TABLE IF NOT EXISTS "User" (
       userID INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       email TEXT,
       address TEXT,
       paymentInfo TEXT,
       password TEXTS 
       );
       """
       self.conn.execute(query)

class UserModel:
   TABLENAME = "User"

   def __init__(self):
       self.conn = sqlite3.connect('user.db')
       self.conn.row_factory = sqlite3.Row

   def __del__(self):
       # body of destructor
       self.conn.commit()
       self.conn.close()

   def create(self, params):
       query = f'insert into {self.TABLENAME} ' \
               f'(name, email, password) ' \
               f'values ("{params.get("name")}","{params.get("email")}","{params.get("password")}")'
        # TODO: check if email is in use
       self.conn.execute(query)
       return "added"

   def get_user(self, email):
       query = f"SELECT userID, name from {self.TABLENAME} where email =  \"{email}\""
       result_set = self.conn.execute(query).fetchall()
       result = [{column: row[i]
                 for i, column in enumerate(result_set[0].keys())}
                 for row in result_set]
       return result

   def update_user(self, params):
       query = f"UPDATE " \
               f"SET  {params.get('column')} = {params.get('newValue')} " \
               f"from {self.TABLENAME} " \
               f"WHERE userID = {params.get('userID')}"
       self.conn.execute(query)
       return "updated"

   def verify_user(self, email, password):
       query = f"select * from {self.TABLENAME} WHERE email = \"{email}\" and password = \"{password}\""
       result = self.conn.execute(query).fetchall()
       return len(result) > 0