from django.urls import path

from . import views

urlpatterns = [
    path("orders/health", views.health, name="health"),
    path("orders/", views.create_order, name="create_order"),
    path("agent/interact", views.agent_interact, name="agent_interact"),
]
