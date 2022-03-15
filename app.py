from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


@app.route('/', methods=['GET'])
def hello_world():  # put application's code here
    return jsonify('Hello World!')


if __name__ == '__main__':
    app.run()
