from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Folder
from flask_login import current_user

# name must be unique
def folder_validator(form, field):
    title = field.data
    user_id = current_user.get_id()
    folders = Folder.query.filter(Folder.user_id == user_id).all()

    for folder in folders:
        if folder.title == title:
            raise ValidationError(f"The folder '{title}' already exists.")

class FolderForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), folder_validator])
