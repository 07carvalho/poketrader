from django.db import models, transaction
from base.models.pokemon import Pokemon

fair_reduction_percentage = 0.85


class Evaluation(models.Model):

    good_trade = models.BooleanField()
    my_total_base_experience = models.IntegerField()
    their_total_base_experience = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        app_label = 'base'

    def __str__(self):
        return '{0} - {1}'.format(self.good_trade, self.created_at)

    def sum_base_experience(self, pokemon_list) -> int:
        sum = 0
        listed = []
        for pokemon in pokemon_list:
            obj = Pokemon.get_instance_or_create(pokemon.get('name'))
            sum += obj.base_experience
            listed.append(obj)
        return sum, listed

    def evaluate_by_base_experience(self, my_total_base_experience, their_total_base_experience):
        return my_total_base_experience * fair_reduction_percentage <= their_total_base_experience

    def calculate(self, my, their) -> dict:
        # their pokemon base experience should be at least 0.85% of my to be a fair trade
        my_total_base_experience, my_list = self.sum_base_experience(my)
        their_total_base_experience, their_list = self.sum_base_experience(their)
        good_trade = self.evaluate_by_base_experience(my_total_base_experience, their_total_base_experience)

        with transaction.atomic():
            obj = Evaluation.objects.create(
                my_total_base_experience=my_total_base_experience,
                their_total_base_experience=their_total_base_experience,
                good_trade=good_trade
            )

            for m in my_list:
                TradedPokemon.objects.create(pokemon=m, evaluation=obj, type='M')

            for t in their_list:
                TradedPokemon.objects.create(pokemon=t, evaluation=obj, type='T')

            return obj


class TradedPokemon(models.Model):
    TYPE = (
        ('M', 'MyPokemon'),
        ('T', 'TheirPokemon'),
    )
    pokemon = models.ForeignKey(Pokemon, on_delete=models.CASCADE)
    evaluation = models.ForeignKey(Evaluation, on_delete=models.CASCADE)
    type = models.CharField(max_length=1, choices=TYPE)

    class Meta:
        app_label = 'base'
