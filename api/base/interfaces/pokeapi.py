from base.services.pokeapi import PokeApiService


class PokeApiInterface:

    def get_pokemon(self, pokemon: str):
        response = PokeApiService().get_pokemon(pokemon)
        return {
            'id': response.get('id'),
            'name': response.get('name'),
            'base_experience': response.get('base_experience'),
            'height': response.get('height'),
            'weight': response.get('weight'),
        }
