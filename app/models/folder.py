from .db import db

class Folder(db.Model):
    __tablename__ = "folders"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(50), nullable=False, unique=True)


    # Many-to-One relationship with User
    users = db.relationship('User', back_populates='folders')

    # One-to-Many relationship with Activities
    activities = db.relationship('Activity', back_populates='folders', cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title
        }
