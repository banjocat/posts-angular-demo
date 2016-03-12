'''
Main app
'''
import os
import sys

import json
from flask import Flask, send_file, request, jsonify, session
import requests

APP = Flask(__name__)

@APP.route('/')
def index():
    '''
    Landing page
    '''
    return send_file('templates/index.html')



@APP.route('/auth/google', methods=['POST'])
def google():
    '''
    Handles google login
    '''
    access_token_url = 'https://accounts.google.com/o/oauth2/token'
    people_api_url = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect'
    if 'PRODUCTION' in os.environ:
        google_secrete = os.environ['GOOGLE_SECRET']
    else:
        google_secret = 'zsu7pzGn7Bf4FW0OD4rOidHE'

    payload = dict(client_id=request.json['clientId'],
                   redirect_uri=request.json['redirectUri'],
                   client_secret=google_secret,
                   code=request.json['code'],
                   grant_type='authorization_code')

    context = requests.post(access_token_url, data=payload)
    token = json.loads(context.text)
    headers = {'Authorization': 'Bearer {0}'.format(token['access_token'])}
    context = requests.get(people_api_url, headers=headers)
    profile = json.loads(context.text)
    print 'profile', profile

    # read db for token
    return jsonify(token=token)

@APP.route('/notes', methods=['POST'])
def list_post():
    '''
    handles saving a notes
    '''
    pass


if __name__ == '__main__':
    PORT = int(os.environ.get("PORT", 5000))
    if 'PRODUCTION' not in os.environ:
        APP.debug = True
    APP.run(host='0.0.0.0', port=PORT)
