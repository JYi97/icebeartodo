from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TextField
from wtforms.validators import DataRequired, ValidationError
from app.models import Folder, Activity
from flask import request

class EditActivityForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    context = TextField('context')
    date = DateField('date', validators=[DataRequired()])
