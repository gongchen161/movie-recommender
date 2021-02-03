
import '../App.css';
import React, { useState } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Movie from '@material-ui/icons/Movie';
import SendIcon from '@material-ui/icons/Send';
import Slider from '@material-ui/core/Slider';
import DoneIcon from '@material-ui/icons/Done';
import { CircularProgress } from '@material-ui/core';
import * as CONS from './Constants.js'

const Output = ({movieName, movieId}) => {
  
  const [clicked, setClicked] = useState(0);
  let sliderValue = 3;
  function valuetext(value) {
    return `${value}`;
  }

  const sendMovieRating = (mid, value) => {
    try {
      if (!movieId) {
          return
      }
      setClicked(1)
      fetch(CONS.ENDPOINT+'add/'+CONS.ID+'/'+mid+'/'+value)
      .then( res => {
        setClicked(2)
      }).catch(function() {
        setClicked(2)
      })
    } catch(error) {
      setClicked(2)
    }
  }

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
  ];
 
    return (

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Movie />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={ movieName }
            secondary= {<Slider
              defaultValue={3}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-small-steps"
              step={1}
              marks
              min={0}
              max={5}
              onChange = { (event, value) => { sliderValue = value;}}
              valueLabelDisplay="auto"
              disabled = {clicked !== 0}
            />}
          />
          <ListItemSecondaryAction>
            {clicked === 0 && <IconButton edge="end" aria-label="send" onClick={() => { sendMovieRating(movieId, sliderValue) }}>
              <SendIcon />
            </IconButton> }
            {clicked === 1 &&  <CircularProgress size={ 30 } /> }
            {clicked === 2 &&  <DoneIcon /> }
          </ListItemSecondaryAction>
        </ListItem>
      
    );
}

export default Output;