
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from middleware.auth_middleware import role_required

faculty_bp = Blueprint("faculty", __name__)


# Faculty Profile API
@faculty_bp.route("/profile", methods=["GET"])
@jwt_required()
@role_required("faculty")
def faculty_profile():

    claims = get_jwt()

    return jsonify({
        "success": True,
        "message": "Faculty profile fetched successfully.",
        "data": {
            "id": claims.get("sub"),
            "user_id": claims.get("user_id"),
            "name": claims.get("name"),
            "email": claims.get("email"),
            "role": claims.get("role")
        }
    }), 200


# Faculty Dashboard API
@faculty_bp.route("/dashboard", methods=["GET"])
@jwt_required()
@role_required("faculty")
def faculty_dashboard():

    claims = get_jwt()

    return jsonify({
        "success": True,
        "message": "Welcome to Faculty Dashboard!",
        "data": {
            "dashboard": "faculty",
            "id": claims.get("sub"),
            "name": claims.get("name"),
            "email": claims.get("email"),
            "role": claims.get("role")
        }
    }), 200

