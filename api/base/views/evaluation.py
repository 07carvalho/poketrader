from rest_framework import status, serializers, exceptions
from rest_framework.response import Response
from rest_framework.views import APIView
from base.models.pokemon import Pokemon
from base.serializers.trade import TradeListSerializer


class EvaluationDetail(APIView):

    def post(self, request, format=None):
        serializer = TradeListSerializer(data=request.data)
        if serializer.is_valid():
            my = request.data.get('my')
            their = request.data.get('their')
            result = Pokemon().evaluate(my, their)
            return Response(result, status=status.HTTP_200_OK)
        msg = 'You must choose from 1 to 6 of your Pokemon and from 1 to 6 of them.'
        raise exceptions.ValidationError({'validation_error:': msg})
