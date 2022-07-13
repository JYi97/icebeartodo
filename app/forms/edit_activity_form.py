from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TextField
from wtforms.validators import DataRequired, ValidationError
from app.models import Folder, Activity
from flask import request

# name must be unique in each folder
def activity_validator(form, field):
    title = field.data
    folder_id = request.json['folderId']
    activity_id = request.json['activityId']
    print("THIS IS THE FIELD.DATE ", field)
    print("THIS IS THE SAVED ID HOPEFULLY", activity_id)
    folder = Folder.query.filter(Folder.id == folder_id).first()
    activities = Activity.query.filter(Activity.folder_id == folder.id)
    for activity in activities:
        if activity.title == title and activity_id != activity.id:
            raise ValidationError(f"The activity '{title}' already exists.")

class EditActivityForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), activity_validator])
    context = TextField('context')
    date = DateField('date', validators=[DataRequired()])
