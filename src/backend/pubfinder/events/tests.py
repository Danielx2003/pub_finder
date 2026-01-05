"""Unit Tests for API Endpoints of Accounts app"""

from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse

from events.models import Event

class EventAPITest(APITestCase):
    """TestCase for Event"""
    def test_valid_post_request_returns_ok(self):
        """Test Post endpoint returns 201 for valid body"""
        url = reverse("Event-view-create")
        payload = {
            "name": "Fight",
            "date_time": "2025-12-25T12:00",
            "sport": "BOXING"
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_all_events_returns_ok(self):
        """Test Get endpoint for all pubs returns 200"""
        url = reverse("Event-view-list")

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_event_missing_name_returns_400(self):
        """Test request with invalid payload body returns 400"""
        url = reverse("Event-view-create")
        payload = {
            "date_time": "2025-12-25T12:00",
        }

        response = self.client.post(url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("name", response.data)

    def test_create_event_persists_to_db(self):
        """Test created Pub is stored in DB"""
        url = reverse("Event-view-create")
        payload = {
            "name": "Boxing Match 1",
            "date_time": "2025-12-25T12:00",
            "sport": "BOXING"
        }

        _ = self.client.post(url, payload, format="json")

        self.assertEqual(Event.objects.count(), 1)
        self.assertTrue(Event.objects.filter(name="Boxing Match 1").exists())
