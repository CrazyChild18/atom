import os

from backEnd import create_app, db

app = create_app(os.getenv('FLASK_CONFIG') or 'default')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
