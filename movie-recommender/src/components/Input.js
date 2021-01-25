
import '../App.css';
import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress, LinearProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import socketIOClient from "socket.io-client";
import Output from './Output'
const Input = () => {


    const ENDPOINT = "https://gc-movie-recommender.herokuapp.com/movie/";
    const URL = "https://raw.githubusercontent.com/gongchen161/MovieRecommender/master/backend/data/movies.csv";

    const [loading, setLoading] = useState(true);
    const [recommendMovies, setRecommendedMovies] = useState([]);
    const [allMovie, setAllMovie] = useState([]);
    const [analyzingMovie, setAnalyzingMovie] = useState(0)
    const mySubmitHandler =  (event, movie) => {
        try {
            if (!movie) {
                return
            }

            const response = fetch(ENDPOINT+movie.label)
            .then(response => response.json())
            .then( data => {
                setRecommendedMovies(data)
                setAnalyzingMovie(2)
            }).catch(function() {
                setAnalyzingMovie(3)
            })
        } catch(error) {
            setAnalyzingMovie(3)
        }
    }

   

    const getAllMovies = async () => {
        const response = await fetch(URL)
        .then(response => response.text())
        .then( data => {
           const arr = data.split(/\r?\n/);
           arr.shift();
           arr.forEach( (e) => {
               const strArr = e.split(',');
               const name = strArr[1];
    
               if (name) {
                  setAllMovie( old => [...old, { label : name }]);
               }
           });
           setLoading(false);
           
        });
    }
    useEffect( () => {
        getAllMovies()
    }, [])

    const filterOptions = createFilterOptions({
        limit: 10,
      });
      
    return (
        <div>
        { loading && <div className='center'><CircularProgress/><h2>Loading movie list...</h2></div>}
        { !loading && <div>
            <form>
            <Autocomplete
                id="combo-box-demo"
                filterOptions={filterOptions}
                options={allMovie}
                getOptionLabel={(option) => option.label}
                style={{ width: 300 }}
                onChange={mySubmitHandler}
                renderInput={(params) => <TextField {...params} label="Pick a Movie" variant="outlined" />}
                />
            </form>
            { analyzingMovie === 1 && <div className="center"> <CircularProgress /> </div>}
            { analyzingMovie === 2 && <div className="output-container">
                <ul className="output-list">
                    {recommendMovies.map( (item) => {
                         if (item && item.Title) {
                            return <Output movieName={item.Title }></Output>
                         }
                    })}
                </ul>
            </div>} 
        </div>}
      </div>
    );
}

export default Input;