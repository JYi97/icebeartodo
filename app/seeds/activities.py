from app.models import db, Activity
from datetime import date, timedelta, datetime


# Adds a demo user, you can add other users here if you want
def seed_activities():
    eat = Activity(
        title='Prepare Dinner', folder_id='3', context='Ice Bear needs fish heavy meals.', date=date.today(), completed=False)
    coding = Activity(
        title='Practice Coding', folder_id='1', context='Ice Bear wants to make code look cleaner.', date=date.today(), completed=False)
    basketball = Activity(
        title='Play Basketball', folder_id='2', context='Ice Bear going into the city with his brothers to play basketball.', date=date.today() - timedelta(days=1), completed=False)
    ninja = Activity(
        title='Practice Ninja Stars', folder_id='4', context='Ice Bear will throw ninja stars at practice dummies to keep his aim up.', date=date.today() + timedelta(days=4), completed=False)
    vacation = Activity(
        title='North Pole Trip', folder_id='5', context='Ice Bear will go to North Pole for vacation.', date=date.today() + timedelta(days=20), completed=False)
    cooking = Activity(
        title='Cooking for bros', folder_id='3', context='Ice Bear will make a feast for his brothers', date=date.today() - timedelta(days=30), completed=False)
    maria1 = Activity(
        title='EDC', folder_id='6', context='You already know...', date=date.today()+ timedelta(days=20), completed=False)
    maria2 = Activity(
        title='GET DRUNK LIKE ALWAYS', folder_id='7', context='Party all day nonstop and relive SB days.', date=date.today() - timedelta(days=20), completed=False)
    maria3 = Activity(
        title='Always being the best noona', folder_id='8', context='Hanging out with dongseng and being the best noona LIKE ALWAYS', date=date.today() , completed=False)
    ashley1 = Activity(
        title='Get boba', folder_id='9', context='Getting daily boba fix', date=date.today(), completed=False)
    ashley2 = Activity(
        title='Go out and buy things for receipts', folder_id='10', context='Need more receipts so I can get more points!!!', date=date.today() - timedelta(days=1), completed=False)
    ashley3 = Activity(
        title='Rotations', folder_id='11', context='This is okay. EVERYTHING IS FINE.', date=date.today() + timedelta(days=6), completed=False)
    vivian1 = Activity(
        title='Adopt another cat', folder_id='12', context='Need to adopt a fifth cat soon!!', date=date.today() + timedelta(days=14), completed=False)
    vivian2 = Activity(
        title='Try new vegan place with little', folder_id='13', context='Going to try the new vegan hotspot that just popped up in DTLA.', date=date.today(), completed=False)
    vivian3 = Activity(
        title='ICE BEAR COLLAB', folder_id='14', context='FRONDANDFRAME X ICE BEAR COOKING BATTLE! SO EXCITING', date=date.today() - timedelta(days=3), completed=False)

    db.session.add(eat)
    db.session.add(coding)
    db.session.add(basketball)
    db.session.add(ninja)
    db.session.add(vacation)
    db.session.add(cooking)
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


# Uses a raw SQL query to TRUNCATE the activities table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_activities():
    db.session.execute('TRUNCATE activities RESTART IDENTITY CASCADE;')
    db.session.commit()
