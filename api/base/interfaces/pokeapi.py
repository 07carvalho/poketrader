from base.services.pokeapi import PokeApiService


class PokeApiInterface:

    def get_pokemon(self, pokemon: str):
        response = PokeApiService().get_pokemon(pokemon)
        response['name'] = response.get('name').capitalize()
        response['image'] = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + str(response.get('id')) + '.png'
        return response
