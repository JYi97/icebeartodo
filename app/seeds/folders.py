from app.models import db, Folder


# Adds a demo user, you can add other users here if you want
def seed_folders():
    today = Folder(
        user_id='1', title='Today')
    upcoming = Folder(
        user_id='1', title='Upcoming')


    db.session.add(today)
    db.session.add(upcoming)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_folders():
    db.session.execute('TRUNCATE folders RESTART IDENTITY CASCADE;')
    db.session.commit()
