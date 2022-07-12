Install Dependencies in root directory
pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
npm i in react-app

Create .env file

psql
CREATE USER icebeartodo_app_dev WITH PASSWORD 'icebear123' CREATEDB;
CREATE DATABASE icebeartodo_app WITH OWNER icebeartodo_app_dev;

Get into your pipenv, migrate your database, seed your database, and run your flask app

pipenv shell
flask db upgrade
flask seed all
flask run

Deploy to Heroku
Dockerfile
Create new project on heroku
Heroku Postgres

To deploy on heroku, just push code to main branch on git and it will be deployed

You must manually seed your production database if/when you so choose (see step 8). Attention! Please run this command only if you wish to seed your production database: heroku run -a HEROKU_APP_NAME flask seed all

heroku login

heroku run -a icebeartodo flask seed undo
heroku run -a icebeartodo flask db downgrade
heroku run -a icebeartodo flask db upgrade
heroku run -a icebeartodo flask seed all
