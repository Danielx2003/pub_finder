from django.db import models

from accounts.models import Pub
from events.models import Event

class PubEvent(models.Model):
    pub_id = models.ForeignKey(Pub, on_delete=models.CASCADE)
    event_id = models.ForeignKey(Event, on_delete=models.CASCADE)
    