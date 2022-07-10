from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TextField
from wtforms.validators import DataRequired, ValidationError
from app.models import Folder
from flask_login import current_user

# name must be unique in each folder
def activity_validator(form, field):
    title = field.data
    user_id = current_user.get_id()
    folders = Folder.query.filter(Folder.user_id == user_id).all()
    for folder in folders:
        for activity in folder:
            if activity.title == title:
                raise ValidationError(f"The activity '{title}' already exists!.")
        # if folder.user_id == user_id and folder.title == title:
        #     raise ValidationError(f"The activity '{title}' already exists.")
class ActivityForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), activity_validator])
    context = TextField('context')
    date = DateField('date', validators=[DataRequired()])
