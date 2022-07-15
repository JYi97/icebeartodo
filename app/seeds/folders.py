from app.models import db, Folder


# Adds a today and upcoming folder for the demo user, you can add other users here if you want
def seed_folders():
    chores = Folder(
        user_id='1', title="Ice Bear's chores")
    sports = Folder(
        user_id='1', title="Ice Bear's sports")


    db.session.add(chores)
    db.session.add(sports)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the folders table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_folders():
    db.session.execute('TRUNCATE folders RESTART IDENTITY CASCADE;')
    db.session.commit()
