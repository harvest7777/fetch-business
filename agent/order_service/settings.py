import os

ORDER_SERVICE_BASE_URL = os.environ.get(
    "ORDER_SERVICE_BASE_URL",
    "http://localhost:8000",
)

DEFAULT_TIMEOUT = float(
    os.environ.get("ORDER_SERVICE_TIMEOUT", 5.0)
)
