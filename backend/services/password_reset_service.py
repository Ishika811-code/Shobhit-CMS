import hashlib
import secrets
import time
from threading import Lock

from config.auth_config import (
    PASSWORD_RESET_OTP_EXPIRY_MINUTES,
    PASSWORD_RESET_OTP_LENGTH
)

# Temporary storage for local development
_reset_requests = {}
_reset_lock = Lock()

OTP_EXPIRY_SECONDS = PASSWORD_RESET_OTP_EXPIRY_MINUTES * 60


def generate_reset_otp():
    """Generate a cryptographically secure numeric OTP."""
    return "".join(
        secrets.choice("0123456789")
        for _ in range(PASSWORD_RESET_OTP_LENGTH)
    )


def store_reset_otp(enrollment_number):
    """Store only the OTP hash with its expiry time."""
    otp = generate_reset_otp()
    otp_hash = hashlib.sha256(otp.encode()).hexdigest()

    with _reset_lock:
        _reset_requests[enrollment_number] = {
            "otp_hash": otp_hash,
            "expires_at": time.time() + OTP_EXPIRY_SECONDS,
            "attempts": 0
        }

    return otp


def verify_reset_otp(enrollment_number, otp):
    """Verify OTP, expiry and attempt limit."""
    with _reset_lock:
        record = _reset_requests.get(enrollment_number)

        if not record:
            return False

        if time.time() > record["expires_at"]:
            del _reset_requests[enrollment_number]
            return False

        if record["attempts"] >= 5:
            del _reset_requests[enrollment_number]
            return False

        record["attempts"] += 1

        otp_hash = hashlib.sha256(otp.encode()).hexdigest()

        if secrets.compare_digest(record["otp_hash"], otp_hash):
            del _reset_requests[enrollment_number]
            return True

        return False