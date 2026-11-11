from services.password_service import hash_password, verify_password


def test_password_hashing():
    password = "TestPassword123"
    hashed_password = hash_password(password)

    assert hashed_password != password
    assert verify_password(password, hashed_password) is True


def test_wrong_password():
    password = "TestPassword123"
    hashed_password = hash_password(password)

    assert verify_password("WrongPassword", hashed_password) is False


def test_password_hash_is_unique():
    password = "TestPassword123"

    hash1 = hash_password(password)
    hash2 = hash_password(password)

    assert hash1 != hash2
