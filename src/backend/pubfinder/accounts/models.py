"""File for models within the Accounts app"""

from django.db import models


class Pub(models.Model):
    """Model for Pub object"""
    name = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return f"{self.name}"
