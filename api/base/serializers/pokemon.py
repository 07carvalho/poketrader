from rest_framework import serializers
from base.models.pokemon import Pokemon


class PokemonSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Pokemon
        fields = '__all__'

    def get_name(self, obj):
        return obj.name.capitalize()
