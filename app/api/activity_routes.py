from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import Activity, db

activity_routes = Blueprint('activities', __name__)

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
@activity_routes.route('/')
def get_all_activities():
    activities = Activity.query.filter(Activity.user_id == current_user.get_id()).all()
    return jsonify([activity.to_dict() for activity in activities])
