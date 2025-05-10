import requests
import sys

def create_data(cartURL):
   # url = f'http://{cartURL}/addItemToCart'
   # data = '{  "productID": 1, "customerID": 1, "quantity": 1 }'
   # response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
   # print(response)
   # 
   # url = f'http://{cartURL}/addItemToCart'
   # data = '{  "productID": 2, "customerID": 1, "quantity": 2 }'
   # response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
   # print(response)
   # 
   # url = f'http://{cartURL}/addItemToCart'
   # data = '{  "productID": 3, "customerID": 1, "quantity": 3 }'
   # response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
   # print(response)
   # 
   # url = f'http://{cartURL}/addItemToCart'
   # data = '{  "productID": 4, "customerID": 1, "quantity": 4 }'
   # response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
   # print(response)

   # url = f'http://{cartURL}/addItemToCart'
   # data = '{  "productID": 5, "customerID": 1, "quantity": 5 }'
   # response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
   # print(response)

   url = f'http://{productURL}/createProduct'
   data = '{  "productID": 1, "name": "test1", "price": 5.67, "quantity": 1, "description": "This is product 1 description" }'
   response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
   print(response)

   url = f'http://{productURL}/createProduct'
   data = '{  "productID": 2, "name": "test2", "price": 50.50, "quantity": 1, "description": "This is product 2 description" }'
   response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
   print(response)

   url = f'http://{productURL}/createProduct'
   data = '{  "productID": 3, "name": "test3", "price": 0.99, "quantity": 1, "description": "This is product 3 description" }'
   response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
   print(response)

   url = f'http://{productURL}/createProduct'
   data = '{  "productID": 4, "name": "test4", "price": 1.20, "quantity": 1, "description": "This is product 4 description" }'
   response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
   print(response)

   url = f'http://{productURL}/createProduct'
   data = '{  "productID": 5, "name": "test5", "price": 123.45, "quantity": 1, "description": "This is product 5 description" }'
   response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
   print(response)

if __name__ == "__main__":
   local = True if len(sys.argv) > 1 and sys.argv[1] == "local" else False

   cartURL = 'localhost:5000' if local else 'localhost:8000'
   customerURL = 'localhost:5001' if local else 'localhost:8001'
   orderURL = 'localhost:5002' if local else 'localhost:8002'
   productURL = 'localhost:5003' if local else 'localhost:8003'

   if len(sys.argv) > 1 and sys.argv[1] == "data" or len(sys.argv) > 2 and sys.argv[2] == "data":
      create_data(cartURL)

   else:
      url = f'http://{orderURL}/createOrder'
      data = '{  "orderID": 1, "customerID": 1, "orderPrice": 3 }'
      response = requests.post(url, data=data, headers={"Content-Type": "application/json"})
      print(response)

      url = f'http://{cartURL}/getUserCart/1'
      response = requests.get(url, headers={"Content-Type": "application/json"})
      # print(response.text)

      itemList = []
      for item in response.json():
         print(item)
         itemList.append({"productID": item['productID'], "quantity": item['quantity']})

      print(itemList)

      url = f'http://{orderURL}/addItemsToOrder'
      data = {"orderID": 1, "items": itemList}
      response = requests.post(url, json=data, headers={"Content-Type": "application/json"})
      print(response)

      url = f'http://{orderURL}/getOrder/1'
      response = requests.get(url, headers={"Content-Type": "application/json"})
      print(response.text)

      url = f'http://{orderURL}/getOrderItems/1'
      response = requests.get(url, headers={"Content-Type": "application/json"})
      print(response.text)

      url = f'http://{cartURL}/deleteCart/1'
      response = requests.delete(url, headers={"Content-Type": "application/json"})
      print(response.text)



