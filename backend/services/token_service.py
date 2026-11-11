

from flask_jwt_extended import create_access_token
from datetime import timedelta


def generate_token(user):
    token = create_access_token(
        identity=str(user["id"]),
        additional_claims={
            "email": user["email"],
            "role": user["role"],
            "user_id": user.get("user_id"),
            "name": user.get("full_name")
        },
        expires_delta=timedelta(minutes=30)
    )

    return token
