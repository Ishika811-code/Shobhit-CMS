import logging

from flask import Blueprint, request, jsonify

from config.database import get_db_connection
from services.token_service import generate_token
from services.password_service import verify_password
from services.password_reset_service import store_reset_otp
from services.password_reset_service import store_reset_otp, verify_reset_otp
from services.password_service import hash_password
auth_bp = Blueprint("auth", __name__)

logger = logging.getLogger(__name__)


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "success": False,
            "error": {"message": "Valid JSON body is required."}
        }), 400

    login_id = data.get("user_id") or data.get("email")
    password = data.get("password")

    if not isinstance(login_id, str) or not isinstance(password, str):
        return jsonify({
            "success": False,
            "error": {"message": "User ID/email and password are required."}
        }), 400

    login_id = login_id.strip()

    if not login_id or not password:
        return jsonify({
            "success": False,
            "error": {"message": "User ID/email and password cannot be empty."}
        }), 400

    connection = None

    try:
        connection = get_db_connection()

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, user_id, full_name, email, password, role
                FROM users
                WHERE user_id = %s OR email = %s
                LIMIT 1
                """,
                (login_id, login_id)
            )
            user = cursor.fetchone()

        if not user or not verify_password(password, user["password"]):
            return jsonify({
                "success": False,
                "error": {"message": "Invalid login credentials."}
            }), 401

        if user["role"] not in ("student", "faculty", "admin"):
            return jsonify({
                "success": False,
                "error": {"message": "Invalid account role."}
            }), 403

        token = generate_token(user)

        return jsonify({
            "success": True,
            "message": "Login successful.",
            "data": {
                "token": token,
                "user": {
                    "id": user["id"],
                    "user_id": user["user_id"],
                    "name": user["full_name"],
                    "email": user["email"],
                    "role": user["role"]
                }
            }
        }), 200

    except Exception:
        logger.exception("Login API error")
        return jsonify({
            "success": False,
            "error": {
                "message": "Login service is temporarily unavailable."
            }
        }), 503

    finally:
        if connection is not None:
            connection.close()



@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "success": False,
            "error": {"message": "Valid JSON body is required."}
        }), 400

    enrollment_number = data.get("enrollmentNumber")
    contact = data.get("contact")
    method = data.get("method")

    if not all(isinstance(value, str) for value in (
        enrollment_number, contact, method
    )):
        return jsonify({
            "success": False,
            "error": {
                "message": "Enrollment number, contact and method are required."
            }
        }), 400

    enrollment_number = enrollment_number.strip()
    contact = contact.strip()
    method = method.strip().lower()

    if not enrollment_number or not contact:
        return jsonify({
            "success": False,
            "error": {
                "message": "Enrollment number and contact cannot be empty."
            }
        }), 400

    if method not in ("email", "sms"):
        return jsonify({
            "success": False,
            "error": {
                "message": "Method must be email or sms."
            }
        }), 400

    otp = store_reset_otp(enrollment_number)


    print(f"Development OTP for {enrollment_number}: {otp}", flush=True)

    return jsonify({
        "success": True,
        "message": "Password reset request created.",
        "data": {
            "message": "Development OTP generated successfully."
        }
    }), 200


@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "success": False,
            "error": {"message": "Valid JSON body is required."}
        }), 400

    enrollment_number = data.get("enrollmentNumber")
    contact = data.get("contact")
    otp = data.get("resetCode")
    new_password = data.get("password")

    if not all(isinstance(value, str) for value in (
        enrollment_number, contact, otp, new_password
    )):
        return jsonify({
            "success": False,
            "error": {"message": "All fields are required."}
        }), 400

    enrollment_number = enrollment_number.strip()
    contact = contact.strip()
    otp = otp.strip()

    if not enrollment_number or not contact or not otp:
        return jsonify({
            "success": False,
            "error": {"message": "Fields cannot be empty."}
        }), 400

    if len(new_password) < 12:
        return jsonify({
            "success": False,
            "error": {"message": "Password must be at least 12 characters."}
        }), 400

    if not verify_reset_otp(enrollment_number, otp):
        return jsonify({
            "success": False,
            "error": {"message": "Invalid or expired OTP."}
        }), 400

    return jsonify({
        "success": True,
        "message": "OTP verified. Database password update is pending."
    }), 200
