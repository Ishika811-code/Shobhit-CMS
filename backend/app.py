import os
from datetime import timedelta

from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

from routes.student import student_bp
from routes.faculty import faculty_bp
from routes.admin import admin_bp
from routes.auth import auth_bp
from routes.protected import protected_bp
from middleware.auth_middleware import role_required
from config.auth_config import JWT_ACCESS_TOKEN_EXPIRES_MINUTES

load_dotenv()

app = Flask(__name__)

# JWT Configuration
jwt_secret = os.getenv("JWT_SECRET_KEY")

if not jwt_secret:
    raise RuntimeError("JWT_SECRET_KEY is missing from .env file.")

app.config["JWT_SECRET_KEY"] = jwt_secret
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(
    minutes=JWT_ACCESS_TOKEN_EXPIRES_MINUTES
)

jwt = JWTManager(app)

# CORS Configuration
allowed_origins = os.getenv(
    "FRONTEND_ORIGINS",
    "http://localhost:5173"
).split(",")

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": [origin.strip() for origin in allowed_origins]
        }
    }
)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api/v1/auth")
app.register_blueprint(protected_bp, url_prefix="/api/v1")
app.register_blueprint(student_bp, url_prefix="/api/v1/student")
app.register_blueprint(faculty_bp, url_prefix="/api/v1/faculty")
app.register_blueprint(admin_bp, url_prefix="/api/v1/admin")


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "success": True,
        "message": "Shobhit CMS Backend is running!"
    }), 200


@app.route("/api/v1/health", methods=["GET"])
def health_check():
    return jsonify({
        "success": True,
        "data": {
            "status": "healthy",
            "application": "Shobhit CMS",
            "backend": "Python Flask"
        }
    }), 200


@app.route("/api/v1/test/admin", methods=["GET"])
@role_required("admin")
def admin_test():
    return jsonify({
        "success": True,
        "message": "Admin access granted!"
    }), 200


if __name__ == "__main__":
    debug_mode = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(debug=debug_mode, port=5000)
