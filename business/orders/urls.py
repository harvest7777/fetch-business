from django.urls import path

from . import views

urlpatterns = [
    path("orders/health", views.health, name="health"),
]
