"""Unit Tests for API Endpoints of PubEvents app"""
from datetime import datetime

from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.utils import timezone

from pub_events.models import PubEvent
from events.models import Event
from accounts.models import Pub

class PubEventAPITest(APITestCase):
    """TestCase for Event"""
    def test_valid_post_request_returns_ok(self):
        """Test Post endpoint returns 201 for valid body"""
        url = reverse("Pub-Event-view-create")

        dt = datetime.fromisoformat("2025-12-25T12:00")
        dt = timezone.make_aware(dt)

        Pub.objects.create(name='Pub 1', latitude= 40.741895, longitude= -73.989308,)
        Event.objects.create(name='Event 1', date_time=dt)

        payload = {
            "pub_id": 1,
            "event_id": 1 
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_all_events_returns_ok(self):
        """Test Get endpoint for all pub_events returns 200"""
        url = reverse("Pub-Event-view-list")

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_pub_event_missing_name_returns_400(self):
        """Test request with invalid payload body returns 400"""
        url = reverse("Pub-Event-view-create")
        payload = {
            "pub_id": 1
        }

        response = self.client.post(url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("event_id", response.data)

    def test_create_event_persists_to_db(self):
        """Test created PubEvent is stored in DB"""
        url = reverse("Pub-Event-view-create")
        payload = {
            "pub_id": 1,
            "event_id": 1
        }

        dt = datetime.fromisoformat("2025-12-25T12:00")
        dt = timezone.make_aware(dt)
        
        Pub.objects.create(name='Pub 1', latitude= 40.741895, longitude= -73.989308,)
        Event.objects.create(name='Event 1', date_time=dt)

        _ = self.client.post(url, payload, format="json")

        self.assertEqual(PubEvent.objects.count(), 1)
        self.assertTrue(PubEvent.objects.filter(pub_id=1, event_id=1).exists())
