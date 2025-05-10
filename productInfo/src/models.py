import sqlite3

class Schema:
   def __init__(self):
       self.conn = sqlite3.connect('products.db')
       self.create_products_table()

   def __del__(self):
       # body of destructor
       self.conn.commit()
       self.conn.close()

   def create_products_table(self):
       query = """
       CREATE TABLE IF NOT EXISTS "Products" (
       productID INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       price FLOAT NOT NULL,
       description VARCHAR(200) NOT NULL,
       quantity INTEGER NOT NULL
       );
       """
       self.conn.execute(query)

class ProductModel:
   TABLENAME = "Products"

   def __init__(self):
       self.conn = sqlite3.connect('products.db')
       self.conn.row_factory = sqlite3.Row

   def __del__(self):
       # body of destructor
       self.conn.commit()
       self.conn.close()

   def create(self, params):
       query = f'insert into {self.TABLENAME} ' \
               f'(productID, name, price, quantity, description) ' \
               f'values ("{params.get("productID")}","{params.get("name")}","{params.get("price")}","{params.get("quantity")}","{params.get("description")}")'

       result = self.conn.execute(query)
       return "added"

   def get_product(self, product_id):
       query = f"SELECT * " \
               f"from {self.TABLENAME} " \
               f"WHERE productID = {product_id}"
       result_set = self.conn.execute(query).fetchall()
       print (result_set)
       result = [{column: row[i]
                 for i, column in enumerate(result_set[0].keys())}
                 for row in result_set]
       return result

   def update_product(self, params):
       query = f'UPDATE ' \
               f'SET {params.get("column")} = {params.get("newValue")} ' \
               f'from {self.TABLENAME} ' \
               f'WHERE productID = {params.get("productID")}'
       result = self.conn.execute(query)
       return "updated"

   def get_all_products(self):
       query = f'select * from {self.TABLENAME}'
       result_set = self.conn.execute(query).fetchall()
       result = [{column: row[i]
                  for i, column in enumerate(result_set[0].keys())}
                 for row in result_set]
       return result