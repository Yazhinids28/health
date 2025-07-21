# Auth/app.py
from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp)

if __name__ == "__main__":
    app.run(port=5004, debug=True)
