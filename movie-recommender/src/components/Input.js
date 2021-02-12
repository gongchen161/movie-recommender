
import '../App.css';
import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress, LinearProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { readString } from 'react-papaparse'
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import Output from './Output'
import * as CONS from './Constants.js'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
const Input = () => {

    const [loading, setLoading] = useState(true);
    const [recommendMovies, setRecommendedMovies] = useState([]);
    const [allMovie, setAllMovie] = useState([]);
    const [analyzingMovie, setAnalyzingMovie] = useState(0)
    const mySubmitHandler =  (event, movie) => {
        try {
            if (!movie) {
                return
            }
            setAnalyzingMovie(1)
            fetch(CONS.ENDPOINT+movie.label)
            .then(response => response.json())
            .then( data => {
               
                setRecommendedMovies(data)
                setTimeout(() => {   setAnalyzingMovie(2) }, 1000);
            }).catch(function() {
                setAnalyzingMovie(3)
            })
        } catch(error) {
            setAnalyzingMovie(3)
        }
    }

   

    const getAllMovies =  () => {

        const lst = []
        fetch(CONS.URL)
        .then(response => response.text())
        .then( async data => {
            setLoading(true)
            const csv = readString(data)
            const arr = csv.data;
            arr.shift();
            arr.forEach( (e) => {
                 const name = e[1];
                 if (e[1]) {
                     lst.push( { label : name } );
                }
            });
            setAllMovie(lst);
            setTimeout(() => { setLoading(false) }, 1500);
        
        });
    };

    useEffect( () => {
     getAllMovies()
    }, [])

    const filterOptions = createFilterOptions({
        limit: 50,
      });
      
    return (
        <div>
        { loading && <div className='center'><CircularProgress/><h2>Loading movie list ...</h2></div>}
        { !loading && <div>
            <form>
            <Autocomplete
                id="combo-box-demo"
                filterOptions={filterOptions}
                options={allMovie}
                getOptionLabel={(option) => option.label}
                style={{ width: 300 }}
                onChange={mySubmitHandler}
                renderInput={(params) => <TextField {...params} label="Pick or enter a movie" variant="outlined" />}
                />
            </form>
            { analyzingMovie === 1 && <div className="center"> <CircularProgress /> Looking for movies you may like ...</div>}
            { analyzingMovie === 2 && <div>
            <div className="center"> We think you may like these movies. Help us improve the prediction by sending your ratings.</div>
            <div className='recommend-body'>
            <Container maxWidth="sm">
                <List >
                    {recommendMovies.map( (item) => {
                         if (item && item.Title) {
                            return <Output movieName={item.Title } movieId={item.Id} key={item.Title}></Output>
                         }
                         return <div></div>
                    })}
                </List>
                </Container>
            </div></div>}
            { analyzingMovie === 3 && <div className="center"> <ErrorOutlineIcon/> Error. Please try again</div>} 
        </div>}
      </div>
    );
}

export default Input;