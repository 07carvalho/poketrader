from rest_framework import serializers
from base.models.evaluation import Evaluation


class EvaluationSerializer(serializers.ModelSerializer):

    created_at = serializers.SerializerMethodField()

    class Meta:
        model = Evaluation
        fields = '__all__'

    def get_created_at(self, obj):
        return obj.created_at.strftime('%d/%m/%Y %H:%M:%S')
