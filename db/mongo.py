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
    return token

def get_email_from_token(token):
    '''
    Gets the token stored in the database
    '''
    document = DB.sessions.find_one({"token":token})
    if not document:
        return None
    return document['email']

def add_notes(email, notes, source='gmail'):
    '''
    Replaces the users notes with a new array
    '''
    DB.notes.update_one({source: email, "notes": notes}, upsert=True)

def get_notes(email, source='gmail'):
    '''
    Gets all the notes of a users
    '''
    document = DB.notes.find_one({source: email})
    return document['notes']
