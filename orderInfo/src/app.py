from flask import Flask, request, jsonify
from service import OrderService
from models import Schema

import json

app = Flask(__name__)

@app.after_request
def add_headers(response):
   response.headers['Access-Control-Allow-Origin'] = "*"
   response.headers['Access-Control-Allow-Headers'] =  "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
   response.headers['Access-Control-Allow-Methods']=  "POST, GET, PUT, DELETE, OPTIONS"
   return response

@app.route("/createOrder", methods=["POST"])
def create_order():
   return OrderService().create(request.get_json())

@app.route("/getOrder/<order_id>", methods=["GET"])
def get_order(order_id):
   return jsonify(OrderService().get_order(order_id))

@app.route("/getOrderItems/<order_id>", methods=["GET"])
def update_item(order_id):
   return jsonify(OrderService().get_order_items(order_id))

@app.route("/updateShipDate", methods=["POST"])
def get_item():
   return OrderService().update_ship_date(request.get_json())

@app.route("/addItemsToOrder", methods=["POST"])
def add_items_to_order():
   return OrderService().add_items_to_order(request.get_json())

@app.route("/getUserOrders/<user_id>", methods=["GET"])
def get_user_orders(user_id):
   return OrderService().get_user_orders(user_id)


if __name__ == "__main__":
   Schema()
   app.run(debug=True, host='0.0.0.0', port=5002)
