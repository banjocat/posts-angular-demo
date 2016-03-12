"""
Handles all database calls to mongodb
"""
import random
import pymongo

CLIENT = pymongo.MongoClient()
DB = CLIENT.postit

def create_token(email):
    '''
    Creates a token and stores it in the database
    '''
    token = random.randrange(1, 100000000)
    DB.sessions.delete_many({"email": email})
    DB.insert_one({"email": email, "token":token})

def get_email_from_token(token):
    '''
    Gets the token stored in the database
    '''
    document = DB.sessions.find_one({"token":token})
    if not document:
        return None
    return document['email']

def add_posts(email, posts):
    '''
    Replaces the users posts with a new array
    '''
    DB.posts.delete_many({"email": email})
    DB.insert_one({"email": email, "posts": posts})

def get_posts(email):
    '''
    Gets all the posts of a users
    '''
    document = DB.posts.find_one({"email": email})
    return document['posts']
