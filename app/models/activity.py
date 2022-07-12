from .db import db

class Activity(db.Model):
    __tablename__ = "activities"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    folder_id = db.Column(db.Integer, db.ForeignKey('folders.id'), nullable=False)
    context = db.Column(db.Text, nullable=True)
    date = db.Column(db.Date, nullable=False)
    completed = db.Column(db.Boolean, nullable=False)

    # Many-to-One relationship with Folders
    folders = db.relationship('Folder', back_populates='activities')


    def to_dict(self):
        return {
            'id': self.id,
            'folderId': self.folder_id,
            'title': self.title,
            'context': self.context,
            'date': self.date.strftime('%m/%d/%Y'),
            'completed': self.completed
        }
