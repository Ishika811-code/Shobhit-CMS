import pytest
from app import app
from flask_jwt_extended import create_access_token

client = app.test_client()


def make_token(role, identity):
    with app.app_context():
        return create_access_token(
            identity=str(identity),
            additional_claims={
                "email": f"{role}@test.com",
                "role": role
            }
        )


student_token = make_token("student", 101)
faculty_token = make_token("faculty", 201)
admin_token = make_token("admin", 301)


def request_route(route, token=None):
    headers = {}

    if token:
        headers["Authorization"] = f"Bearer {token}"

    return client.get(route, headers=headers)


# Correct role access
def test_student_access():
    response = request_route(
        "/api/v1/student/profile", student_token
    )
    assert response.status_code == 200


def test_faculty_access():
    response = request_route(
        "/api/v1/faculty/profile", faculty_token
    )
    assert response.status_code == 200


def test_admin_access():
    response = request_route(
        "/api/v1/admin/profile", admin_token
    )
    assert response.status_code == 200


# Wrong role access
def test_student_cannot_access_admin():
    response = request_route(
        "/api/v1/admin/profile", student_token
    )
    assert response.status_code == 403


def test_faculty_cannot_access_admin():
    response = request_route(
        "/api/v1/admin/profile", faculty_token
    )
    assert response.status_code == 403


# Authentication checks
def test_missing_token():
    response = request_route("/api/v1/student/profile")
    assert response.status_code == 401
