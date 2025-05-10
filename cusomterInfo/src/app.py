from flask import Flask, request, jsonify
from service import UserService
from models import Schema

import json

app = Flask(__name__)

@app.after_request
def add_headers(response):
   response.headers['Access-Control-Allow-Origin'] = "*"
   response.headers['Access-Control-Allow-Headers'] =  "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
   response.headers['Access-Control-Allow-Methods']=  "POST, GET, PUT, DELETE, OPTIONS"
   return response

@app.route("/createUser", methods=["POST"])
def create_user():
   return jsonify(UserService().create(request.get_json()))

@app.route("/getUser/<user_id>", methods=["GET"])
def list_users(user_id):
   return jsonify(UserService().get_user(user_id))

@app.route("/updateUser", methods=["POST"])
def delete_user():
   return jsonify(UserService().update_user(request.get_json()))


if __name__ == "__main__":
   Schema()
   app.run(debug=True, host='0.0.0.0', port=5001)
