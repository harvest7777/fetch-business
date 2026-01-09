"""
Serializers define the API boundary for this app.

Responsibilities:
- Validate and normalize external input (HTTP / agent requests)
- Define request and response shapes for the API
- Protect the domain layer from malformed or unexpected data
- Translate between JSON and Python types

Non-responsibilities:
- Business logic
- State transitions
- Persistence rules

Serializers should be thin and declarative. All domain behavior
belongs in models and service functions.
"""
from rest_framework import serializers
from .models import Order


class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["agent_id", "item"]
