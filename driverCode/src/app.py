import requests
import sys

def create_data():
   if "users" in sys.argv:
      url = f'http://{customerURL}/createUser'
      data = '{  "name": "Nathan", "email": "nathan@test.com", "password": "password1"}'
      response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
      print(response)

   if "product" in sys.argv:
      url = f'http://{productURL}/createProduct'
      data = '{  "productID": 1, "name": "product1", "price": 5.67, "quantity": 1, "description": "This is product 1 description" }'
      response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
      print(response)

      url = f'http://{productURL}/createProduct'
      data = '{  "productID": 2, "name": "product2", "price": 50.50, "quantity": 1, "description": "This is product 2 description" }'
      response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
      print(response)

      url = f'http://{productURL}/createProduct'
      data = '{  "productID": 3, "name": "product3", "price": 0.99, "quantity": 1, "description": "This is product 3 description" }'
      response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
      print(response)

      url = f'http://{productURL}/createProduct'
      data = '{  "productID": 4, "name": "product4", "price": 1.20, "quantity": 1, "description": "This is product 4 description" }'
      response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
      print(response)

      url = f'http://{productURL}/createProduct'
      data = '{  "productID": 5, "name": "product5", "price": 123.45, "quantity": 1, "description": "This is product 5 description" }'
      response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
      print(response)

if __name__ == "__main__":
   local = True if "local" in sys.argv else False

   cartURL = 'localhost:5000' if local else 'localhost:8000'
   customerURL = 'localhost:5001' if local else 'localhost:8001'
   orderURL = 'localhost:5002' if local else 'localhost:8002'
   productURL = 'localhost:5003' if local else 'localhost:8003'

   if "data" in sys.argv:
      create_data()

   if "updateShip" in sys.argv:
      url = f'http://{orderURL}/updateShipDate'
      data = '{  "orderID": 1, "shipDate": "5/14/2025" }'
      response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
      print(response)