
from werkzeug.security import generate_password_hash, check_password_hash


def hash_password(password):
    """Convert a plain password into a secure hash."""
    return generate_password_hash(password)


def verify_password(password, password_hash):
    """Verify a password against its stored hash."""
    return check_password_hash(password_hash, password)
