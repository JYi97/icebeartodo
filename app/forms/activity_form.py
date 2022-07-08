from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TextField
from wtforms.validators import DataRequired

class ActivityForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    context = TextField('context', validators=[DataRequired()])
    date = DateField('date', validators=[DataRequired()])
