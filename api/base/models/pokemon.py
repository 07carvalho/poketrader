from django.db import models
from base.interfaces.pokeapi import PokeApiInterface


class Pokemon(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    base_experience = models.IntegerField()
    height = models.IntegerField()
    weight = models.IntegerField()
    image = models.URLField()

    class Meta:
        app_label = 'base'

    def __str__(self):
        return '{0} - {1}'.format(self.id, self.name)

    def save(self, *args, **kwargs):
        self.format_name()
        self.format_image()
        super(Pokemon, self).save(*args, **kwargs)

    def format_name(self):
        self.name = self.name.lower()

    def format_image(self):
        # getting the url image from another api
        self.image = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + str(self.id) + '.png'

    @staticmethod
    def get_instance_or_create(name):
        try:
            obj = Pokemon.objects.get(name=name.lower())
        except Pokemon.DoesNotExist:
            response = PokeApiInterface().get_pokemon(name.lower())
            obj = Pokemon.objects.create(**response)
        return obj
