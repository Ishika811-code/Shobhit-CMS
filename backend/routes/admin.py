
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

from middleware.auth_middleware import role_required

admin_bp = Blueprint("admin", __name__)


# Admin Profile API
@admin_bp.route("/profile", methods=["GET"])
@jwt_required()
@role_required("admin")
def admin_profile():

    claims = get_jwt()

    return jsonify({
        "success": True,
        "message": "Admin profile fetched successfully.",
        "data": {
            "id": get_jwt_identity(),
            "user_id": claims.get("user_id"),
            "name": claims.get("name"),
            "email": claims.get("email"),
            "role": claims.get("role")
        }
    }), 200


# Admin Dashboard API
@admin_bp.route("/dashboard", methods=["GET"])
@jwt_required()
@role_required("admin")
def admin_dashboard():

    claims = get_jwt()

    return jsonify({
        "success": True,
        "message": "Welcome to Admin Dashboard!",
        "data": {
            "dashboard": "admin",
            "id": get_jwt_identity(),
            "name": claims.get("name"),
            "email": claims.get("email"),
            "role": claims.get("role"),
            "modules": [
                "User Management",
                "Student Management",
                "Faculty Management"
            ]
        }
    }), 200


# User Management API
@admin_bp.route("/users", methods=["GET"])
@jwt_required()
@role_required("admin")
def get_users():

    return jsonify({
        "success": False,
        "error": {
            "message": "User management will be available after database integration."
        }
    }), 503

