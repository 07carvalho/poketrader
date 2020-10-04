from rest_framework import status, exceptions
from rest_framework.response import Response
from rest_framework.views import APIView
from base.serializers.trade import TradeListSerializer
from base.serializers.evaluation import EvaluationSerializer
from base.models.evaluation import Evaluation


class EvaluationDetail(APIView):

    def post(self, request, format=None):
        serializer = TradeListSerializer(data=request.data)
        if serializer.is_valid():
            my = request.data.get('my')
            their = request.data.get('their')
            result = Evaluation().calculate(my, their)
            serialize = EvaluationSerializer(result)
            return Response(serialize.data, status=status.HTTP_200_OK)
        msg = 'You must choose from 1 to 6 of your Pokemon and from 1 to 6 of them.'
        raise exceptions.ValidationError({'validation_error:': msg})
