from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase


class TestPokemonApi(APITestCase):
    def test_get_pokemon_by_name(self):
        """Make a request to get a Pokemon by name"""
        url = reverse('pokemon_detail', kwargs={'pokemon': 'ninetales'})
        response = Client(HTTP_USER='user1').get(url)
        self.assertEqual(200, response.status_code)
        self.assertEqual(38, response.data.get('id'))
        self.assertEqual('ninetales', response.data.get('name'))

    def test_get_pokemon_by_id(self):
        """Make a request to get a Pokemon by id"""
        url = reverse('pokemon_detail', kwargs={'pokemon': '1'})
        response = Client(HTTP_USER='user1').get(url)
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, response.data.get('id'))
        self.assertEqual('bulbasaur', response.data.get('name'))

    def test_get_pokemon_by_wrong_name(self):
        """Make a request to hit in 404 error"""
        url = reverse('pokemon_detail', kwargs={'pokemon': 'mucura'})
        response = Client(HTTP_USER='user1').get(url)
        self.assertEqual(404, response.status_code)
        self.assertEqual(True, 'not_found' in response.data)
