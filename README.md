# poketrader
A Web project to check fair Pokemon trades.

Functionalities:
* Search a Pokemon
* Choose from 1 to 6 Pokemon
* Evaluate Pokemon groups

Stack:
* Python 3.8
* Django 2.2
* Django Rest Framework 3.11
* Postgres
* ReactJS 16.8.6
* Docker
* Heroku

## Architecture
The backend application works with a MVCS architecture. The Service Layer is used to make requests to [PokeAPI](https://pokeapi.co/).

### Strategy
When a user searches for a Pokemon, the application tries to get it from the database first and, if it doesn't get it, requests it to PokeAPI, persisting the returned result later. This will improve performance when this Pokemon is retrieved again.

## Run locally
To run the backend service, run:
> docker-compose build

Create the database tables:
> docker-compose run api python3 manage.py migrate

Then, run:
> docker-compose up -d

Backend service will be available in:

[http://localhost:8000](http://localhost:8000)

To start the UI, go to `web` folder and install the dependencies:
> cd web && npm install

Finish, building the application:
> npm run build

To see an amazing webapp, go to:

[http://localhost:5000](http://localhost:5000)

Gotta catch 'em all!

## Swagger
The API documentation is available in:
[http://localhost:8000/docs](http://localhost:8000/docs)

## Testing
To test the backend service, run:
> docker-compose run api python3 manage.py test base
