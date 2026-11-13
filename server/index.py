import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

app = Flask(__name__)

# Configure CORS (equivalent to your express cors setup)
client_url = os.getenv("CLIENT_URL", "http://localhost:5173")
CORS(app, resources={r"/api/*": {"origins": client_url}})

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "success": True,
        "message": "College CMS API is running",
    })

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)