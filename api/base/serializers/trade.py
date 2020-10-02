from rest_framework import serializers


class TradeSerializer(serializers.Serializer):
    name = serializers.CharField()


class TradeListSerializer(serializers.Serializer):
    my = TradeSerializer(many=True)
    their = TradeSerializer(many=True)

    def validate_my(self, value):
        if not 1 <= len(value) <= 6:
            raise serializers.ValidationError()
        return value

    def validate_their(self, value):
        if not 1 <= len(value) <= 6:
            print("j")
            raise serializers.ValidationError()
        return value
