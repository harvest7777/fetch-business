from django.urls import path

from . import views

urlpatterns = [
    path("orders/health", views.health, name="health"),
    path("orders/", views.create_order, name="create_order"),
    path("orders/agent/<str:agent_id>", views.get_orders_by_agent, name="get_orders_by_agent"),
]
