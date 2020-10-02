from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase


class TestPokemonApi(APITestCase):
    url = reverse('evaluation_detail')

    def test_fair_trade(self):
        """Make a request to get a Pokemon by name"""
        data = {
            'my': [{"name": "ninetales"}, {"name": "ninetales"}],
            'their': [{"name": "ninetales"}, {"name": "ninetales"}]
        }
        response = Client().post(self.url, data=data)
        self.assertEqual(200, response.status_code)
        self.assertEqual('good_trade', response.data)
        self.assertEqual(True, response.data.get('good_trade'))
