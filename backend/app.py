
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import knn_movie_recommender
from flask_cors import CORS

app = Flask(__name__)
socketio = SocketIO(app,cors_allowed_origins='*')
CORS(app)

@app.route('/')
def home():
    return 'Hello,welcome to my movie recommender machine learning site'

@app.route('/movie/<movie>')
@socketio.on('movie')
def movieSent(movie):
    print('movie: ' + movie)
    result = knn_movie_recommender.knn_movie_recommendation(movie)
    socketio.emit('movie', result)
    print("send: " + result)
    return result

if __name__ == '__main__':
     app.run(threaded=True, port=5000)