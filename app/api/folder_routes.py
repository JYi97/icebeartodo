from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import Folder, db

folder_routes = Blueprint('folders', __name__)

# def validation_errors_to_error_messages(validation_errors):
#     """
#     Simple function that turns the WTForms validation errors into a simple list
#     """
#     errorMessages = []
#     for field in validation_errors:
#         for error in validation_errors[field]:
#             errorMessages.append(f'{field} : {error}')
#     return errorMessages

# Users can get all their folders
@folder_routes.route('/')
def get_all_folders():
    folders = Folder.query.filter(Folder.user_id == current_user.get_id()).all()
    return jsonify([folder.to_dict() for folder in folders])
