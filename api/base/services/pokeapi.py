import requests
from rest_framework import exceptions


class PokeApiService:
    base_url = 'https://pokeapi.co/api/v2'

    def get_pokemon(self, pokemon: str):
        url = f'{self.base_url}/pokemon/{pokemon.lower()}'
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 404:
            raise exceptions.NotFound({'not_found': 'This Pokemon does not exist.'})
        raise exceptions.ParseError({'error': 'Sorry, try again later.'})
