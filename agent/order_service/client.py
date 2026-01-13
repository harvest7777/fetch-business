"""
Order Service Client

HTTP client for communicating with the Django order backend.
Used by uagents as a clean interface to perform database operations
without direct database access.
"""

import requests

from agent.order_service.errors import (
    OrderServiceError,
    ValidationError,
    UnauthorizedError,
    NotFoundError,
    ServerError,
)
from agent.order_service.models import CreateOrder, Order
from agent.order_service.settings import ORDER_SERVICE_BASE_URL, ORDER_SERVICE_TIMEOUT


class OrderServiceClient:
    def __init__(
        self,
        base_url: str = ORDER_SERVICE_BASE_URL,
        timeout: float = ORDER_SERVICE_TIMEOUT,
    ):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout

    def create_order(self, order: CreateOrder, agent_id: str) -> Order:
        response = requests.post(
            f"{self.base_url}/orders/",
            json={
                "agent_id": agent_id,
                "item": order.item,
            },
            timeout=self.timeout,
        )

        # ---- translate HTTP -> semantic errors ----
        if response.status_code == 400:
            raise ValidationError(response.json())

        if response.status_code == 401:
            raise UnauthorizedError()

        if response.status_code == 404:
            raise NotFoundError()

        if response.status_code >= 500:
            raise ServerError()

        response.raise_for_status()

        # ---- success path ----
        return Order(**response.json())

    def get_orders_by_agent_id(self, agent_id: str) -> list[Order]:
        response = requests.get(
            f"{self.base_url}/orders/agent_id/{agent_id}",
            timeout=self.timeout,
        )

        if response.status_code == 400:
            raise ValidationError(response.json())

        if response.status_code == 401:
            raise UnauthorizedError()

        if response.status_code == 404:
            raise NotFoundError()

        if response.status_code >= 500:
            raise ServerError()

        response.raise_for_status()

        return [Order(**order) for order in response.json()]
