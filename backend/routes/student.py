
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

from middleware.auth_middleware import role_required

student_bp = Blueprint("student", __name__)


@student_bp.route("/profile", methods=["GET"])
@jwt_required()
@role_required("student")
def student_profile():

    claims = get_jwt()

    return jsonify({
        "success": True,
        "message": "Student profile fetched successfully.",
        "data": {
            "id": get_jwt_identity(),
            "user_id": claims.get("user_id"),
            "name": claims.get("name"),
            "email": claims.get("email"),
            "role": claims.get("role")
        }
    }), 200


@student_bp.route("/dashboard", methods=["GET"])
@jwt_required()
@role_required("student")
def student_dashboard():

    claims = get_jwt()

    return jsonify({
        "success": True,
        "message": "Welcome to Student Dashboard!",
        "data": {
            "dashboard": "student",
            "id": get_jwt_identity(),
            "name": claims.get("name"),
            "email": claims.get("email"),
            "role": claims.get("role")
        }
    }), 200

