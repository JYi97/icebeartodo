from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import Activity, db, Folder
from app.forms import ActivityForm, EditActivityForm

activity_routes = Blueprint('activities', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Users can get all their activities
@activity_routes.route('/')
def get_all_activities():
    activities = Activity.query.filter(Activity.id == current_user.get_id()).all()
    return jsonify([activity.to_dict() for activity in activities])

# Getting activities from folder with activity_id
@activity_routes.route('/<activity_id>/folder/activities')
def get_activities_from_folder(activity_id):
    activity = Activity.query.filter(Activity.id == activity_id).first()
    folder = Folder.query.filter(Folder.id == activity.folder_id).first()
    activities = Activity.query.filter(Activity.folder_id == folder.id).all()
    return jsonify([activity.to_dict() for activity in activities])

# Users can get one specific activity
@activity_routes.route('/<activity_id>')
def get_one_activity(activity_id):
    activity = Activity.query.filter(Activity.id == activity_id).first()
    return jsonify(activity.to_dict())

# Users can CREATE one activity
@activity_routes.route('/', methods=['POST'])
def create_activity():
    form = ActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_activity = Activity(
            title=form.data['title'],
            context=form.data['context'],
            date=form.data['date'],
            folder_id = request.json['folderId'],
            completed = False
        )
        db.session.add(new_activity)
        db.session.commit()
        return new_activity.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

# Users can UPDATE one activity
@activity_routes.route('/<activity_id>', methods=['PATCH'])
def patch_activity(activity_id):
    form = EditActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    activity = Activity.query.filter(Activity.id == activity_id).first()
    # print("THIS IS HITTING THE BACKEND OF THE PATCH ROUTE")
    if form.validate_on_submit():
        activity.title = form.data['title']
        activity.context = form.data['context']
        activity.date = form.data['date']
        # activity.folder_id = request.json['folderId']
        db.session.add(activity)
        db.session.commit()
        # print("THIS IS HITTING THE BACKEND OF THE PATCH ROUTE AFTER THE VALIDATION")
        return activity.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

# Users can delete one specific activity
@activity_routes.route('/<activity_id>', methods=['DELETE'])
def delete_activity(activity_id):
    activity = Activity.query.filter(Activity.id == activity_id).first()
    db.session.delete(activity)
    db.session.commit()

    return activity.to_dict()

# Users can complete an activity
@activity_routes.route('/<activity_id>/complete', methods=["PATCH"])
def complete_activity(activity_id):
    activity = Activity.query.filter(Activity.id == activity_id).first()
    # print("THIS IS THE COMPLETED ACTIVITY", activity)

    if activity.completed == False:
        # print("THIS IS HITTING THE FALSE CONDITIONAL")
        activity.completed = True
        db.session.add(activity)
        db.session.commit()
        return activity.to_dict()
    if activity.completed == True:
        # print("THIS IS HITTING THE TRUE CONDITIONAL")
        activity.completed = False
        db.session.add(activity)
        db.session.commit()
        return activity.to_dict()
