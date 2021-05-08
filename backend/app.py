
from flask import Flask, render_template, make_response
from flask_socketio import SocketIO, emit
import knn_movie_recommender
from flask_cors import CORS
import time
import csv
from io import StringIO

app = Flask(__name__)
socketio = SocketIO(app,cors_allowed_origins='*')
CORS(app)

allMovies = ''

@app.route('/')
def home():
    return '[v3.5] Hello, this is Gong Chen. Please visit https://gongchen161.github.io/MovieRecommender/ to use the movie recommender'

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
    global allMovies
    if allMovies == '':
            print("Initialize allMovies")
            with open('data/movies.csv') as fd:
                si = StringIO()
                cw = csv.writer(si)
                reader = csv.reader(fd, delimiter=',')
                result = []
                for row in reader:
                    result.append(row)
                
                cw.writerows(result)
                allMovies = make_response(si.getvalue())
    return allMovies

if __name__ == '__main__':
     app.run(threaded=True, port=5000)