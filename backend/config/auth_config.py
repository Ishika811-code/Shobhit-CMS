
ALLOWED_ROLES = ("student", "faculty", "admin")

FRONTEND_ROLE_MAPPING = {
    "student": "student",
    "faculty": "faculty",
    "staff": "admin"
}

JWT_ACCESS_TOKEN_EXPIRES_MINUTES = 30
# Password Reset OTP Settings
PASSWORD_RESET_OTP_EXPIRY_MINUTES = 5
PASSWORD_RESET_OTP_LENGTH = 6
