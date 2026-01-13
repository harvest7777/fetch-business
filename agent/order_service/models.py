"""
Order service models derived from the backend API.

These types are derived from our backend API serializers (CreateOrderSerializer,
OrderResponseSerializer) and are implemented using Fetch.ai uAgents Model types
for type-safe communication between agents and the backend service.
"""
from uagents import Model


class CreateOrder(Model):
    """Request model for creating an order (matches CreateOrderSerializer)."""
    
    item: str


class Order(Model):
    """Response model for order creation (matches OrderResponseSerializer)."""
    
    id: int
    agent_id: str
    item: str