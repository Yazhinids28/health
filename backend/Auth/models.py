# Auth/models.py
import os
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("DB_NAME")]
users_collection = db["users"]

def register_user(username, email, password):
    if users_collection.find_one({"email": email}):
        return False  # Email already registered

    hashed_password = generate_password_hash(password)
    users_collection.insert_one({
        "username": username,
        "email": email,
        "password": hashed_password
    })
    return True

def login_user(email, password):
    user = users_collection.find_one({"email": email})
    if user and check_password_hash(user["password"], password):
        return {
            "username": user["username"],
            "email": user["email"]
        }
    return None
