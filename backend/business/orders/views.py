from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import (
    CreateOrderSerializer,
    HealthResponseSerializer,
    OrderResponseSerializer,
    AgentInteractSerializer,
)
from drf_spectacular.utils import extend_schema
from drf_spectacular.types import OpenApiTypes
import logging

logger = logging.getLogger(__name__)



@extend_schema(
    responses={
        200: HealthResponseSerializer,
    },
)
@api_view(["GET"])
def health(request):
    serializer = HealthResponseSerializer({"status": "healthy"})
    return Response(serializer.data)

@extend_schema(
    request=CreateOrderSerializer,
    responses={
        201: OrderResponseSerializer,
        400: OpenApiTypes.OBJECT,
    },
)
@api_view(["POST"])
def create_order(request):
    serializer = CreateOrderSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    order = serializer.save()
    response_serializer = OrderResponseSerializer(order)

    return Response(
        response_serializer.data,
        status=status.HTTP_201_CREATED,
    )


@extend_schema(
    request=AgentInteractSerializer,
    responses={
        200: OpenApiTypes.OBJECT,
        400: OpenApiTypes.OBJECT,
    },
)
@api_view(["POST"])
def agent_interact(request):
    """
    Endpoint for interacting with the Fetch.ai agent.

    For now, this is a simple echo endpoint. In the future, this will
    communicate with the agent using the uagents protocol.
    """
    logger.info("=== DJANGO BACKEND: Agent Interact ===")
    logger.info(f"Received request at: {request.META.get('HTTP_HOST')}")
    logger.info(f"Request data: {request.data}")

    serializer = AgentInteractSerializer(data=request.data)

    if not serializer.is_valid():
        logger.error(f"Validation errors: {serializer.errors}")
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    message = serializer.validated_data.get("message")
    previous_messages = serializer.validated_data.get("previousMessages", [])

    logger.info(f"Processing message: {message}")
    logger.info(f"Previous messages count: {len(previous_messages)}")

    # TODO: Implement actual agent communication using uagents protocol
    # For now, return a simple acknowledgment
    response_data = {
        "message": f"Backend received: '{message}'. Agent communication will be implemented soon.",
        "status": "acknowledged",
        "agent_id": "california-coffee-shop",  # From .env
        "timestamp": request.META.get("HTTP_DATE", ""),
    }

    logger.info(f"Sending response: {response_data}")

    return Response(response_data, status=status.HTTP_200_OK)