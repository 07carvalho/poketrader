from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from base.interfaces.pokeapi import PokeApiInterface
from base.serializers.pokemon import PokemonSerializer


class PokemonDetail(APIView):

    def get(self, request, pokemon, format=None):
        data = PokeApiInterface().get_pokemon(pokemon.lower())
        serializer = PokemonSerializer(data=data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
