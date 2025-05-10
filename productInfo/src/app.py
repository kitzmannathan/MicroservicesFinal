from flask import Flask, request, jsonify
from service import ProductsService
from models import Schema

import json

app = Flask(__name__)

@app.after_request
def add_headers(response):
   response.headers['Access-Control-Allow-Origin'] = "*"
   response.headers['Access-Control-Allow-Headers'] =  "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
   response.headers['Access-Control-Allow-Methods']=  "POST, GET, PUT, DELETE, OPTIONS"
   return response

@app.route("/createProduct", methods=["POST"])
def create_product():
   print(request.json)
   return ProductsService().create(request.get_json())

@app.route("/getProduct/<product_id>", methods=["GET"])
def get_product(product_id):
   return jsonify(ProductsService().get_product(product_id))

@app.route("/getAllProducts", methods=["GET"])
def get_all_product():
   return jsonify(ProductsService().get_all_products())

@app.route("/updateProduct", methods=["POST"])
def update_product():
   return ProductsService().update_product(request.get_json())


if __name__ == "__main__":
   Schema()
   app.run(debug=True, host='0.0.0.0', port=5003)
