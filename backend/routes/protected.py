from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

protected_bp = Blueprint("protected", __name__)


@protected_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user_data = get_jwt()

    return jsonify({
        "success": True,
        "message": "Protected route accessed successfully.",
        "data": {
            "user_id": user_id,
            "email": user_data.get("email"),
            "role": user_data.get("role")
        }
    }), 200