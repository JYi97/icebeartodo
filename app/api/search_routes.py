from flask import Blueprint
from app.models import Folder, Activity

search_routes = Blueprint('search', __name__)

@search_routes.route('/<user_id>', methods=['GET'])
def get_folders(user_id):
    folders_list = []
    folders = Folder.query.filter(Folder.user_id == user_id).all()

    def get_folder_ids(folder):
        return folder.id

    folder_ids = list(map(get_folder_ids, folders))

    activities_list = []
    activities = Activity.query.all()

    for i in range(0, len(folders)):
        folders_list.append(
            {"title": folders[i].title, "folderId": folders[i].id}
        )

    for i in range(0, len(activities)):
        if (activities[i].folder_id in folder_ids):
            activities_list.append(
            {"title": activities[i].title, "activityId": activities[i].id}
        )
    return {"activity_titles": activities_list, "folder_titles": folders_list}
