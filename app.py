'''
Main app
'''
import os

from flask import Flask, send_file, request, jsonify
import requests
import json

app = Flask(__name__)

@app.route('/')
def index():
    '''
    Landing page
    '''
    return send_file('templates/index.html')


@app.route('/auth/google', methods=['POST'])
def google():
    access_token_url = 'https://accounts.google.com/o/oauth2/token'
    people_api_url = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect'
    GOOGLE_SECRET = 'zsu7pzGn7Bf4FW0OD4rOidHE'

    payload = dict(client_id=request.json['clientId'],
                   redirect_uri=request.json['redirectUri'],
                   client_secret=GOOGLE_SECRET,
                   code=request.json['code'],
                   grant_type='authorization_code')

    r = requests.post(access_token_url, data=payload)
    token = json.loads(r.text)
    headers = {'Authorization': 'Bearer {0}'.format(token['access_token'])}
    r = requests.get(people_api_url, headers=headers)
    profile = json.loads(r.text)
    print 'profile', profile

    # read db for token
    return jsonify(token=token)




@app.route('/tests')
def tests():
    return send_file('templates/test.html')


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    if 'PRODUCTION' not in os.environ:
        app.debug = True
    app.run(host='0.0.0.0', port=port)
