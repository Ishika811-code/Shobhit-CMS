import pytest
from app import app
from services.token_service import generate_token
from flask_jwt_extended import decode_token
from datetime import timedelta
from flask_jwt_extended import create_access_token


@pytest.fixture
def test_user():
    return {
        "id": 1,
        "user_id": "STU001",
        "full_name": "Test Student",
        "email": "student@test.com",
        "role": "student"
    }


def test_jwt_token_generation(test_user):
    with app.app_context():
        token = generate_token(test_user)

        assert isinstance(token, str)
        assert len(token) > 0


def test_jwt_token_contains_correct_claims(test_user):
    with app.app_context():
        token = generate_token(test_user)
        decoded = decode_token(token)

        assert decoded["sub"] == "1"
        assert decoded["role"] == "student"
        assert decoded["email"] == "student@test.com"
        assert decoded["user_id"] == "STU001"
        assert decoded["name"] == "Test Student"



def test_invalid_jwt_token():
    client = app.test_client()

    response = client.get(
        "/api/v1/profile",
        headers={"Authorization": "Bearer invalid.token.value"}
    )

    assert response.status_code == 422


def test_expired_jwt_token():
    with app.app_context():
        expired_token = create_access_token(
            identity="1",
            expires_delta=timedelta(seconds=-1)
        )

    client = app.test_client()

    response = client.get(
        "/api/v1/profile",
        headers={"Authorization": f"Bearer {expired_token}"}
    )

    assert response.status_code == 401