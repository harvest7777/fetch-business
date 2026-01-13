from django.db import models

# Create your models here.
class Order(models.Model):
    agent_id = models.CharField(max_length=255)
    item = models.CharField(max_length=255)

    objects = models.Manager()
