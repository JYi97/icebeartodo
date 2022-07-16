from app.models import db, Folder


# Adds a today and upcoming folder for the demo user, you can add other users here if you want
def seed_folders():
    chores = Folder(
        user_id='1', title="Ice Bear's chores")
    sports = Folder(
        user_id='1', title="Ice Bear's sports")
    cooking = Folder(
        user_id='1', title="Ice Bear's cooking")
    ninja = Folder(
        user_id='1', title="Ice Bear's ninja moves")
    vacation = Folder(
        user_id='1', title="Ice Bear's vacation")
    maria1 = Folder(
        user_id='2', title="Festivals")
    maria2 = Folder(
        user_id='2', title="Bars")
    maria3 = Folder(
        user_id='2', title="NUMBAH ONE NOONA")
    ashley1 = Folder(
        user_id='3', title="Foods")
    ashley2 = Folder(
        user_id='3', title="Receipts")
    ashley3 = Folder(
        user_id='3', title="Medical")
    vivian1 = Folder(
        user_id='4', title="Cats")
    vivian2 = Folder(
        user_id='4', title="Vegan Stuff")
    vivian3 = Folder(
        user_id='4', title="ICE BEAR X FRONDANDFRAME COLLAB")


    db.session.add(chores)
    db.session.add(sports)
    db.session.add(cooking)
    db.session.add(ninja)
    db.session.add(vacation)
    db.session.add(maria1)
    db.session.add(maria2)
    db.session.add(maria3)
    db.session.add(ashley1)
    db.session.add(ashley2)
    db.session.add(ashley3)
    db.session.add(vivian1)
    db.session.add(vivian2)
    db.session.add(vivian3)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the folders table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_folders():
    db.session.execute('TRUNCATE folders RESTART IDENTITY CASCADE;')
    db.session.commit()
