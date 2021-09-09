import pandas
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
import simplejson as json

number_of_movies = 10

# read initial data
movies = None
ratings = None
data_table = None
csr_data_table = None
knn = None

COUNT = 0

def readData():
    global movies
    global ratings
    global data_table
    global csr_data_table
    global knn
    global COUNT
    
    print("RETRAIN MODEL")
    movies = pandas.read_csv("data/movies.csv")
    ratings = pandas.read_csv("data/ratings.csv")

    print("NUM OF RATING: ", len(ratings))
    data_table = ratings.pivot(index='movieId',columns='userId',values='rating')
    data_table.fillna(0,inplace=True)

    csr_data_table = csr_matrix(data_table.values)
    data_table.reset_index(inplace=True)

    knn = NearestNeighbors(metric='cosine', algorithm='auto', n_neighbors=number_of_movies+1)
    knn.fit(csr_data_table)

def knn_movie_recommendation(movie_name):
    global movies
    global ratings
    global data_table
    global csr_data_table
    global knn
    global COUNT

    #Add new training data every 100 times
    print("-----", COUNT ,"------")
    if COUNT % 100 == 0:
        readData()
    
    COUNT += 1

    selected_movie = movies[movies['title'].str.lower() == movie_name.lower()]  
    if len(selected_movie) == 1:        
        id = selected_movie.iloc[0]['movieId']
        data_table_id = data_table[data_table['movieId'] == id].index[0]
        
        distances,indices = knn.kneighbors(csr_data_table[data_table_id],n_neighbors=number_of_movies+1)    

        result_tp = zip(indices.squeeze().tolist(),distances.squeeze().tolist())
        result_movie_id = sorted(list(result_tp),key=lambda x: x[1])[:0:-1]
        
        recommended_movies = []
        for val in result_movie_id:
            movie_id = data_table.iloc[val[0]]['movieId']
            idx = movies[movies['movieId'] == movie_id].index
            recommended_movies.append({'Id':movie_id,'Title':movies.iloc[idx]['title'].values[0],'Distance':val[1]})

        return json.dumps(recommended_movies)
    else:
        return "Unknown Error"
 