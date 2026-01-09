"""Unit tests for PubEvents API"""

# pylint: disable=too-many-instance-attributes

from datetime import datetime

from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.utils import timezone

from .models import Pub, Event, PubEvent

class PubEventGetAllPubEventsTest(APITestCase):
    """Tests for get all PubEvents"""

    def setUp(self):
        """Create shared test data"""
        dt = timezone.make_aware(datetime.fromisoformat("2025-12-25T12:00"))

        self.pub1 = Pub.objects.create(
            name="Pub 1", latitude=40.741895, longitude=-73.989308
        )
        self.pub2 = Pub.objects.create(
            name="Pub 2", latitude=41.0, longitude=-74.0
        )

        self.event1 = Event.objects.create(name="Event 1", date_time=dt)
        self.event2 = Event.objects.create(name="Event 2", date_time=dt)

        self.pub_event1 = PubEvent.objects.create(
            pub=self.pub1, event=self.event1
        )

        self.pub_event2 = PubEvent.objects.create(
            pub=self.pub2, event=self.event1
        )
        self.pub_event3 = PubEvent.objects.create(
            pub=self.pub1, event=self.event2
        )

        self.url = reverse("Pub-Event-view-list")

    def test_get_all_pub_events_returns_all(self):
        """GET without query params returns all pub_events"""
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

    def test_filter_by_event_id(self):
        """GET with event_id filters correctly"""
        response = self.client.get(self.url, {"event_id": self.event1.id})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        for item in response.data:
            self.assertEqual(item["event"]['id'], self.event1.id)

    def test_filter_by_pub_id(self):
        """GET with pub_id filters correctly"""
        response = self.client.get(self.url, {"pub_id": self.pub1.id})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        for item in response.data:
            self.assertEqual(item["pub"]['id'], self.pub1.id)

    def test_filter_by_pub_id_and_event_id(self):
        """GET with both pub_id and event_id applies AND filtering"""
        response = self.client.get(
            self.url,
            {"pub_id": self.pub1.id, "event_id": self.event1.id}
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

        result = response.data[0]
        self.assertEqual(result["pub"]['id'], self.pub1.id)
        self.assertEqual(result["event"]['id'], self.event1.id)

    def test_filter_with_nonexistent_ids_returns_empty_list(self):
        """GET with invalid query params returns empty list"""
        response = self.client.get(
            self.url,
            {"pub_id": 999, "event_id": 999}
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])


class PubEventCreatePubEventTest(APITestCase):
    """Tests for create PubEvent"""

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
