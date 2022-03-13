# The purpose of this file is to construct an application package to call factory functions
import SQLAlchemy
from flask import Flask, request
from flask_bootstrap import Bootstrap
from flask_login import LoginManager
from config import config, Config

bootstrap = Bootstrap()
db = SQLAlchemy()

login_manager = LoginManager()
login_manager.login_view = 'auth.login'


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    bootstrap.init_app(app)
    db.init_app(app)
    login_manager.init_app(app)

    return app
