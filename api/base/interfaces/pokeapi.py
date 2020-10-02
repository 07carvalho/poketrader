from base.services.pokeapi import PokeApiService


class PokeApiInterface:

    def get_pokemon(self, pokemon: str):
        return PokeApiService().get_pokemon(pokemon)
