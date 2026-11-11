
import os
import pymysql
from dotenv import load_dotenv

# Load database settings from .env file
load_dotenv()


def get_db_connection():
    required_settings = [
        "DB_HOST",
        "DB_USER",
        "DB_PASSWORD",
        "DB_NAME"
    ]

    missing = [
        setting for setting in required_settings
        if not os.getenv(setting)
    ]

    if missing:
        raise ValueError(
            f"Missing database settings: {', '.join(missing)}"
        )

    connection = pymysql.connect(
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT", "3306")),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        cursorclass=pymysql.cursors.DictCursor,
        connect_timeout=5
    )

    return connection
