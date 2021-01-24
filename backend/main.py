
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import knn_movie_recommender

app = Flask(__name__)
socketio = SocketIO(app,cors_allowed_origins='*')

@socketio.on('movie')
def movieSent(movie):
    print('movie: ' + movie)
    result = knn_movie_recommender.knn_movie_recommendation(movie)
    socketio.emit('movie', result)
    print("send: " + result)

if __name__ == '__main__':
     app.run(ssl_context='adhoc', host='0.0.0.0', port=5000, debug = True)