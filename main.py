from flask import Flask, send_file

app = Flask(__name__)


@app.route('/')
def index():
    return send_file('templates/index.html')


@app.route('/tests')
def tests():
    return send_file('templates/test.html')


if __name__ == '__main__':
    app.debug = True
    app.run()
