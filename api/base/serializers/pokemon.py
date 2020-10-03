from rest_framework import serializers


class SpecieSerializer(serializers.Serializer):
    name = serializers.CharField()
    url = serializers.CharField()


class TypeSerializer(serializers.Serializer):
    slot = serializers.IntegerField()
    type = SpecieSerializer()


class PokemonSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    base_experience = serializers.IntegerField()
    height = serializers.IntegerField()
    weight = serializers.IntegerField()
    species = SpecieSerializer()
    types = TypeSerializer(many=True)
    image = serializers.URLField()
