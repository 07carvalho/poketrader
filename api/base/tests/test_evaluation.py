import json

from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
from base.models.evaluation import Evaluation


class TestPokemonApi(APITestCase):
    url = reverse('evaluation_detail')

    def test_fair_trade(self):
        """Evaluate two lists of my and their pokemon"""
        data = {
            "my": [{"name": "Ninetales"}, {"name": "ninetales"}],
            "their": [{"name": "ninetales"}, {"name": "nineTales"}]
        }
        response = Client().post(self.url, json.dumps(data), content_type='application/json')
        self.assertEqual(200, response.status_code)
        self.assertEqual(True, response.data.get('good_trade'))
        self.assertEqual(354, response.data.get('my_total_base_experience'))
        self.assertEqual(354, response.data.get('their_total_base_experience'))

    def test_fair_trade_with_unknown_pokemon(self):
        data = {
            "my": [{"name": "ablubleble"}, {"name": "ninetales"}],
            "their": [{"name": "ninetales"}, {"name": "nineTales"}]
        }
        response = Client().post(self.url, json.dumps(data), content_type='application/json')
        self.assertEqual(404, response.status_code)

    def test_sum_base_experience(self):
        lista = [{"name": "Ninetales"}, {"name": "ninetales"}]
        sum, objs = Evaluation().sum_base_experience(lista)
        self.assertEqual(354, sum)
        self.assertEqual(len(lista), len(objs))

    def test_evaluate_by_base_experience(self):
        result = Evaluation().evaluate_by_base_experience(354, 354)
        self.assertEqual(True, result)

    def test_evaluate_by_bad_base_experience(self):
        result = Evaluation().evaluate_by_base_experience(354, 297)
        self.assertEqual(False, result)
