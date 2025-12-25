"""Unit Tests for API Endpoints of Accounts app"""

from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse

from accounts.models import Pub

class PubAPITest(APITestCase):
    """TestCase for Pub"""
    def test_valid_post_request_returns_ok(self):
        """Test Post endpoint returns 201 for valid body"""
        url = reverse("Pub-view-create")
        payload = {
            "name": "The Green Man",
            "latitude": 40.741895,
            "longitude": -73.989308,
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_all_pubs_returns_ok(self):
        """Test Get endpoint for all pubs returns 200"""
        url = reverse("Pub-view-list")

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_pub_missing_name_returns_400(self):
        """Test request with invalid payload body returns 400"""
        url = reverse("Pub-view-create")
        payload = {
            "latitude": 40.741895,
            "longitude": -73.989308,
        }

        response = self.client.post(url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("name", response.data)

    def test_create_pub_persists_to_db(self):
        """Test created Pub is stored in DB"""
        url = reverse("Pub-view-create")
        payload = {
            "name": "The Green Man",
            "latitude": 40.741895,
            "longitude": -73.989308,
        }

        _ = self.client.post(url, payload, format="json")

        self.assertEqual(Pub.objects.count(), 1)
        self.assertTrue(Pub.objects.filter(name="The Green Man").exists())
