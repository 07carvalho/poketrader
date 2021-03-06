# Generated by Django 2.2.12 on 2020-10-04 12:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Evaluation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('good_trade', models.BooleanField()),
                ('my_total_base_experience', models.IntegerField()),
                ('their_total_base_experience', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='TradedPokemon',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('M', 'MyPokemon'), ('T', 'TheirPokemon')], max_length=1)),
                ('evaluation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.Evaluation')),
                ('pokemon', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.Pokemon')),
            ],
        ),
    ]
