from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import (
    CreateOrderSerializer,
    HealthResponseSerializer,
    OrderResponseSerializer,
)
from drf_spectacular.utils import extend_schema
from drf_spectacular.types import OpenApiTypes



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