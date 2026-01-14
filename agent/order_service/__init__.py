"""
Order service package for interacting with the backend order API.

This package provides type-safe models and a client for creating orders
using Fetch.ai uAgents Model types.
"""

from order_service.client import OrderServiceClient
from order_service.models import CreateOrder, Order
from order_service.errors import (
    OrderServiceError,
    ValidationError,
    UnauthorizedError,
    NotFoundError,
    ServerError,
)
from order_service.settings import ORDER_SERVICE_BASE_URL, ORDER_SERVICE_TIMEOUT

__all__ = [
    "OrderServiceClient",
    "CreateOrder",
    "Order",
    "OrderServiceError",
    "ValidationError",
    "UnauthorizedError",
    "NotFoundError",
    "ServerError",
    "ORDER_SERVICE_BASE_URL",
    "ORDER_SERVICE_TIMEOUT",
]
