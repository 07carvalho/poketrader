from django.urls import path
from base.views.pokemon import PostDetail

urlpatterns = [
    path('pokemon/<str:pokemon>', PostDetail.as_view(), name='pokemon_detail'),
]