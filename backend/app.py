
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import knn_movie_recommender
from flask_cors import CORS
import time
import csv

app = Flask(__name__)
socketio = SocketIO(app,cors_allowed_origins='*')
CORS(app)

@app.route('/')
def home():
    return '[v3.3] Hello, this is Gong Chen. Please visit https://gongchen161.github.io/MovieRecommender/ to use the movie recommender'

@app.route('/movie/<movie>')
@socketio.on('movie')
def movieSent(movie):
    print('movie-recommender: ', movie)
    result = knn_movie_recommender.knn_movie_recommendation(movie)
    socketio.emit('movie', result)
    print("send: ", result)
    return result

@app.route('/movie/add/<uid>/<mid>/<rating>')
def addMovie(uid, mid, rating):
    print('add-movie: ', uid, " ", mid , " ", rating)
    with open('data/ratings.csv','a') as fd:
        writer=csv.writer(fd)
        writer.writerow([uid,mid,rating,round(time.time() * 1000)])

    return "Added"

@app.route('/get-all-movies')
def getAllMovies():
    print('get-movie-recommender: ')
    with open('data/movies.csv') as fd:
        return fd.read()
        
    return ''

if __name__ == '__main__':
     app.run(threaded=True, port=5000)