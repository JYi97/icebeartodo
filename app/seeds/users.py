from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    maria = User(
        username='marianoona', email='maria@aa.io', password='illenium')
    ashley = User(
        username='ashleynoona', email='ashley@aa.io', password='killua')
    vivian = User(
        username='viviannoona', email='vivian@aa.io', password='yuzu')

    db.session.add(demo)
    db.session.add(maria)
    db.session.add(ashley)
    db.session.add(vivian)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
