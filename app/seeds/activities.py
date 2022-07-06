from app.models import db, Activity
from datetime import datetime, timedelta


# Adds a demo user, you can add other users here if you want
def seed_activities():
    eat = Activity(
        title='Prepare dinner', folder_id='1', context='Ice Bear needs fish heavy meals.', date=datetime.today(), completed=False)
    coding = Activity(
        title='Practice coding', folder_id='1', context='Ice Bear wants to make code look cleaner.', date=datetime.today(), completed=False)
    basketball = Activity(
        title='Play Basketball', folder_id='2', context='Ice Bear going into the city with Griz and Panda to play street basketball.', date=datetime.today() + timedelta(days=1), completed=False)

    db.session.add(basketball)
    db.session.add(coding)
    db.session.add(eat)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the activities table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_activities():
    db.session.execute('TRUNCATE activities RESTART IDENTITY CASCADE;')
    db.session.commit()
