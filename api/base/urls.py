from django.urls import path
from base.views.pokemon import PokemonDetail
from base.views.evaluation import EvaluationDetail

urlpatterns = [
    path('pokemon/<str:pokemon>', PokemonDetail.as_view(), name='pokemon_detail'),
    path('evaluation', EvaluationDetail.as_view(), name='evaluation_detail'),
]
