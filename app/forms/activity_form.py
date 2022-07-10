from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TextField
from wtforms.validators import DataRequired, ValidationError
from app.models import Folder, Activity
from flask import request

# name must be unique in each folder
def activity_validator(form, field):
    title = field.data
    folder_id = request.json['folderId']
    # print("THIS IS THE FIELD.DATE ", field.data)
    # print("THIS IS THE FOLDER ID HOPEFULLY", request.json['folderId'])
    folder = Folder.query.filter(Folder.id == folder_id).first()
    activities = Activity.query.filter(Activity.folder_id == folder.id)
    for activity in activities:
        if activity.title == title:
            raise ValidationError(f"The activity '{title}' already exists.")
            
class ActivityForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), activity_validator])
    context = TextField('context')
    date = DateField('date', validators=[DataRequired()])
