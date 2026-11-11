
from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt


VALID_ROLES = {"student", "faculty", "admin"}


def role_required(*allowed_roles):

    invalid_roles = set(allowed_roles) - VALID_ROLES

    if not allowed_roles or invalid_roles:
        raise ValueError(
            f"Invalid or missing roles: {invalid_roles or allowed_roles}"
        )

    def decorator(func):

        @wraps(func)
        def wrapper(*args, **kwargs):

            # Verify JWT token
            verify_jwt_in_request()

            # Get user details from token
            claims = get_jwt()
            user_role = claims.get("role")

            # Check whether role is valid
            if user_role not in VALID_ROLES:
                return jsonify({
                    "success": False,
                    "error": {
                        "message": "Invalid user role."
                    }
                }), 403

            # Check authorization
            if user_role not in allowed_roles:
                return jsonify({
                    "success": False,
                    "error": {
                        "message": "You are not authorized to access this resource."
                    }
                }), 403

            return func(*args, **kwargs)

        return wrapper

    return decorator

