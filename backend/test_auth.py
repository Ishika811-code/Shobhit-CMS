
import pytest
from app import app

client = app.test_client()


def test_login_without_json():
    response = client.post("/api/v1/auth/login")
    assert response.status_code == 400


def test_login_with_empty_json():
    response = client.post(
        "/api/v1/auth/login",
        json={}
    )
    assert response.status_code == 400


def test_login_without_password():
    response = client.post(
        "/api/v1/auth/login",
        json={"user_id": "STU001"}
    )
    assert response.status_code == 400


def test_login_with_empty_credentials():
    response = client.post(
        "/api/v1/auth/login",
        json={"user_id": "", "password": ""}
    )
    assert response.status_code == 400


def test_forgot_password_missing_json():
    response = client.post("/api/v1/auth/forgot-password")
    assert response.status_code == 400




def test_reset_password_missing_json():
    response = client.post("/api/v1/auth/reset-password")
    assert response.status_code == 400