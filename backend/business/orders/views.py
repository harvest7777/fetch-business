from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import (
    CreateOrderSerializer,
    HealthResponseSerializer,
    OrderResponseSerializer,
    AgentInteractSerializer,
)
from .models import Order
from drf_spectacular.utils import extend_schema, OpenApiParameter
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
    parameters=[
        OpenApiParameter(
            name="agent_id",
            type=str,
            location=OpenApiParameter.PATH,
            description="The agent ID to filter orders by",
        ),
    ],
    responses={
        200: OrderResponseSerializer(many=True),
    },
)
@api_view(["GET"])
def get_orders_by_agent(request, agent_id):
    """
    Get all orders for a specific agent.
    """
    orders = Order.objects.filter(agent_id=agent_id)
    serializer = OrderResponseSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
