import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"), override=False)

GRPC_HOST = os.getenv("GRPC_HOST")
GRPC_PORT = os.getenv("GRPC_PORT")
GRPC_TOKEN = os.getenv("GRPC_TOKEN")
POLL_INTERVAL = int(os.getenv("POLL_INTERVAL", 5))