import sqlite3

class Schema:
   def __init__(self):
       self.conn = sqlite3.connect('order.db')
       self.create_order_table()
       self.create_order_items_table()

   def __del__(self):
       # body of destructor
       self.conn.commit()
       self.conn.close()

   def create_order_table(self):
       query = """
       CREATE TABLE IF NOT EXISTS "Orders" (
       orderID INTEGER PRIMARY KEY AUTOINCREMENT,
       customerID INTEGER NOT NULL,
       orderPrice INTEGER NOT NULL,
       orderDate Date default CURRENT_DATE,
       shipDate Date
       );
       """
       self.conn.execute(query)

   def create_order_items_table(self):
       query = """
       CREATE TABLE IF NOT EXISTS "OrderItems" (
       orderID INTEGER NOT NULL,
       productID INTEGER  NOT NULL,
       quantity INTEGER NOT NULL,
       PRIMARY KEY (orderID, productID)
       );
       """
       self.conn.execute(query)



class OrderModel:
   ORDER_TABLE_NAME = "Orders"
   ORDER_ITEM_TABLE_NAME = "OrderItems"

   def __init__(self):
       self.conn = sqlite3.connect('order.db')
       self.conn.row_factory = sqlite3.Row

   def __del__(self):
       # body of destructor
       self.conn.commit()
       self.conn.close()

   def create(self, params):
       query = f'insert into {self.ORDER_TABLE_NAME} ' \
               f'(customerID, orderPrice) ' \
               f'values ("{params.get("customerID")}","{params.get("orderPrice")}")'

       returnedCursor = self.conn.execute(query)

       return str(returnedCursor.lastrowid)

   def get_order(self, order_id):
       query = f"SELECT * from {self.ORDER_TABLE_NAME} WHERE orderID = {order_id}"
       result_set = self.conn.execute(query).fetchall()
       result = [{column: row[i]
                 for i, column in enumerate(result_set[0].keys())}
                 for row in result_set]
       return result

   def get_order_items(self, order_id):
       query = "SELECT * " \
               f"from {self.ORDER_ITEM_TABLE_NAME} " \
               f"WHERE orderID = {order_id}"
       result_set = self.conn.execute(query).fetchall()
       result = [{column: row[i]
                  for i, column in enumerate(result_set[0].keys())}
                 for row in result_set]
       return result

   def update_ship_date(self, params):
       query = f"UPDATE {self.ORDER_TABLE_NAME} SET shipDate = \"{params.get('shipDate')}\" WHERE orderID = {params.get('orderID')}"
       self.conn.execute(query)
       return "changed"

   def add_items_to_order(self, params):
       items = params.get('items')
       for item in items:
           query = f'insert into {self.ORDER_ITEM_TABLE_NAME} ' \
               f'(orderID, productID, quantity) ' \
               f'values ("{params.get("orderID")}","{item["productID"]}","{item["quantity"]}")'
           self.conn.execute(query)
       return "added"

   def get_user_orders(self, user_id):
       query = "SELECT * " \
               f"from {self.ORDER_TABLE_NAME} " \
               f"WHERE customerID = {user_id}"
       result_set = self.conn.execute(query).fetchall()
       result = [{column: row[i]
                  for i, column in enumerate(result_set[0].keys())}
                 for row in result_set]
       return result