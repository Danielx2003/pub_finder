from django.db import models

# Create your models here.

class Event(models.Model):
    BOXING = "BOXING"
    FOOTBALL = "FOOTBALL"
    DARTS = "DARTS"
    SNOOKER = "SNOOKER"
    UNKNOWN = "UNKNOWN"

    SPORTS_CHOICES = {
        BOXING: "BOXING",
        FOOTBALL: "FOOTBALL",
        DARTS: "DARTS",
        SNOOKER: "SNOOKER",
        UNKNOWN: "UNKNOWN"
    }

    name = models.CharField(max_length=255)
    date_time = models.DateTimeField()
    sport = models.CharField(
        choices=SPORTS_CHOICES,
        default=UNKNOWN
    )