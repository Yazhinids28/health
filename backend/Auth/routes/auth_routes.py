# Auth/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from models import register_user, login_user

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    success = register_user(username, email, password)
    if not success:
        return jsonify({"message": "Email already registered"}), 409

    return jsonify({"message": "User registered successfully!"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = login_user(email, password)
    if user:
        return jsonify({
            "message": "Login successful!",
            "username": user["username"],
            "email": user["email"]
        }), 200

    return jsonify({"message": "Invalid email or password"}), 401
