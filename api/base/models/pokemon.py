from base.interfaces.pokeapi import PokeApiInterface


class Pokemon:
    fair_reduction_percentage = 0.85

    def sum_base_experience(self, pokemon_list) -> int:
        sum = 0
        for pokemon in pokemon_list:
            print(pokemon.get('name'))
            data = PokeApiInterface().get_pokemon(pokemon.get('name'))
            sum += data.get('base_experience')
        return sum

    def evaluate(self, my, their) -> dict:
        # their pokemon base experience should be at least 0.85% of my to be a fair trade
        sum_my = self.sum_base_experience(my)
        sum_their = self.sum_base_experience(their)
        return {
            'good_trade': sum_my * self.fair_reduction_percentage <= sum_their,
            'base_experience': {
                'sum_my': sum_my,
                'sum_their': sum_their,
            }
        }
