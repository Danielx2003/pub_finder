"""Unit Tests for API Endpoints of Accounts app"""

from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.gis.geos import Point


from accounts.models import Pub

class PubAPITest(APITestCase):
    """TestCase for Pub"""
    def test_valid_post_request_returns_ok(self):
        """Test Post endpoint returns 201 for valid body"""
        url = reverse("create-pub")
        payload = {
            "name": "The Green Man",
            "latitude": 40.741895,
            "longitude": -73.989308,
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_all_pubs_returns_ok(self):
        """Test Get endpoint for all pubs returns 200"""
        url = reverse("get-pubs")

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_pub_missing_name_returns_400(self):
        """Test request with invalid payload body returns 400"""
        url = reverse("create-pub")
        payload = {
            "latitude": 40.741895,
            "longitude": -73.989308,
        }

        response = self.client.post(url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("name", response.data)

    def test_create_pub_persists_to_db(self):
        """Test created Pub is stored in DB"""
        url = reverse("create-pub")
        payload = {
            "name": "The Green Man",
            "latitude": 40.741895,
            "longitude": -73.989308,
        }

        _ = self.client.post(url, payload, format="json")

        self.assertEqual(Pub.objects.count(), 1)
        self.assertTrue(Pub.objects.filter(name="The Green Man").exists())

class PubGetByIdAPITest(APITestCase):
    """TestCase for Get Pub by ID"""

    def setUp(self):
        self.pub = Pub.objects.create(
            name="The Green Man",
            location=Point(-73.989308, 40.741895)
        )
        self.url = reverse("get-pub-by-id", args=[self.pub.id])

    def test_get_pub_by_id_returns_200(self):
        """GET pub by id returns 200"""
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_pub_by_id_returns_correct_data(self):
        """GET pub by id returns correct pub data"""
        response = self.client.get(self.url)

        self.assertEqual(response.data["id"], self.pub.id)
        self.assertEqual(response.data["name"], "The Green Man")
        self.assertEqual(response.data["latitude"], 40.741895)
        self.assertEqual(response.data["longitude"], -73.989308)

    def test_get_pub_by_id_returns_404_if_not_found(self):
        """GET pub by invalid id returns 404"""
        url = reverse("get-pub-by-id", args=[999])

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)