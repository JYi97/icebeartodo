from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Folder, Activity

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# Users can get all activities from one specific user
@user_routes.route('/<user_id>/activities')
def get_activities_for_one_user(user_id):
    folders = Folder.query.filter(Folder.user_id == user_id).all()
    print("THIS IS THE FOLDERS IN THE USER ROUTES", folders)
    def get_folder_ids(folder):
        return folder.id

    folder_ids = list(map(get_folder_ids, folders))
    print("THIS IS THE FOLDER IDS", folder_ids)
    activities = Activity.query.all()
    user_activities = []
    for activity in activities:
        print("THIS IS THE ACTIVITY IN THE BACKEND", folder_ids)
        if (activity.folder_id in folder_ids):
            user_activities.append(activity)
            print("THIS IS THE USER ACTIVITIES IN THE BACKEND", user_activities)
    print("THIS IS THE USER ACTIVITIES AFTER LOOP", user_activities)
    return jsonify([activity.to_dict() for activity in user_activities])

    # activitiesId = []
    # mapping
