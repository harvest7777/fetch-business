from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import CreateOrderSerializer


# Create your views here.
def health(request):
    return HttpResponse(b"Healthy")

@api_view(["POST"])
def create_order(request):
    serializer = CreateOrderSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    order = serializer.save()

    return Response(
        {
            "id": order.id,
            "agent_id": order.agent_id,
            "item": order.item,
        },
        status=status.HTTP_201_CREATED,
    )