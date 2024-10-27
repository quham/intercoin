from flask import Flask, request, jsonify, session
import uuid
from backend import bcrypt, db


class User:

  def start_session(self, user):
    del user['password']
    session['logged_in'] = True
    session['user'] = user
    return jsonify(user), 200

  def signup(self):
    print(request.form)

    # Create the user object
    user = {
      "_id": uuid.uuid4().hex,
      "name": request.form.get('name'),
      "email": request.form.get('email'),
      "wallet_address": request.form.get('wallet_address'),
      "balance": 0
    }

    # Encrypt the password
    user['password'] = bcrypt.generate_password_hash(user['password'])

    # Check for existing email address
    if db.users.find_one({ "email": user['email'] }):
      return jsonify({ "error": "Email address already in use" }), 400

    if db.users.insert_one(user):
      return self.start_session(user)

    return jsonify({ "error": "Signup failed" }), 400
  
  def signout(self):
    session.clear()
  
  def login(self):

    user = db.users.find_one({
      "email": request.form.get('email')
    })

    if user and bcrypt.check_password_hash(request.form.get('password'), user['password']):
      return self.start_session(user)
    
    return jsonify({ "error": "Invalid login credentials" }), 401
