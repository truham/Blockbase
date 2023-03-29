from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo1 = User(
        first_name='Satoshi',
        last_name='Nakamoto',
        username='satoshinakamoto',
        email='demo1@user.io',
        password='password',
        profile_picture='https://blockbase-bucket.s3.us-west-1.amazonaws.com/nakamoto.png',
    )
    demo2 = User(
        first_name='Punk',
        last_name='6529',
        username='6529',
        email='demo2@user.io',
        password='password',
        profile_picture="https://blockbase-bucket.s3.us-west-1.amazonaws.com/6529.jpeg",
    )
    demo3 = User(
        first_name='Llama',
        last_name='0x',
        username='llamas',
        email='demo3@user.io',
        password='password',
        profile_picture="https://blockbase-bucket.s3.us-west-1.amazonaws.com/llama.jpeg",
    )

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()