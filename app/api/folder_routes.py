from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import Folder, db, Activity
from app.forms import FolderForm

folder_routes = Blueprint('folders', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Users can get all their folders
@folder_routes.route('/')
def get_all_folders():
    folders = Folder.query.filter(Folder.user_id == current_user.get_id()).all()
    return jsonify([folder.to_dict() for folder in folders])

# Users can CREATE a folder
@folder_routes.route('/', methods=['POST'])
def create_folder():
    form = FolderForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_folder = Folder(
            title=form.data['title'],
            user_id = request.json['userId']

        )
        db.session.add(new_folder)
        db.session.commit()
        return new_folder.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Users can UPDATE a folder
@folder_routes.route('/<folder_id>', methods=['PATCH'])
def patch_folder(folder_id):
    form = FolderForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    folder = Folder.query.filter(Folder.id == folder_id).first()

    if form.validate_on_submit():
        folder.title = form.data['title']
        db.session.add(folder)
        db.session.commit()
        return folder.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}

# Users can delete one specific folder
@folder_routes.route('/<folder_id>', methods=['DELETE'])
def delete_folder(folder_id):
    folder = Folder.query.filter(Folder.id == folder_id).first()
    print("THIS IS IN THE DELETE BACKEND FOR DELETING A FOLDER", folder)
    db.session.delete(folder)
    db.session.commit()

    return folder.to_dict()

# Users can get one specific folder
@folder_routes.route('/<folder_id>')
def get_one_folder(folder_id):
    # The folder_id renders returns the correct id from the url
    # print("THIS IS IN THE BACKEND FOR GETTING ONE FOLDER WITH THE ID", folder_id)
    folder = Folder.query.filter(Folder.id == folder_id).first()
    print("THIS IS THE FOLDER FROM THE DB IN THE BACKEND", folder)
    return jsonify(folder.to_dict())

# Users can get all activities in on specific folder
@folder_routes.route('/<folder_id>/activities')
def get_activities_for_one_folder(folder_id):
    activities = Activity.query.filter(Activity.folder_id == folder_id).all()
    return jsonify([activity.to_dict() for activity in activities])
