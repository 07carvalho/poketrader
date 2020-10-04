from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from base.serializers.pokemon import PokemonSerializer
from base.models.pokemon import Pokemon


class PokemonDetail(APIView):
    @swagger_auto_schema(responses={200: PokemonSerializer()})
    def get(self, request, pokemon, format=None):
        obj = Pokemon.get_instance_or_create(pokemon)
        serializer = PokemonSerializer(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)
