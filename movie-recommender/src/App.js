import './App.css';
import socketIOClient from "socket.io-client";
import React, { useState } from 'react';
import Autocomplete from 'react-autocomplete';
const ENDPOINT = "http://127.0.0.1:5000";

function App() {

  const [movies, setMovieName] = useState('Your favorite movies');
  const [value, setValue] = useState('');
  const mySubmitHandler = (movieName) => {
    const socket = socketIOClient(ENDPOINT);
    console.log('done')
    socket.emit('movie',movieName);
    
    socket.on('movie', function(data) {
      // Respond with a message including this clients' id sent from the server
      setMovieName(data)
    });
  }
  return (
    
    <div>
     <Autocomplete
        key='movieInput'
        getItemValue={(item) => item.label}
        items={[
          { label: 'apple' },
          { label: 'banana' },
          { label: 'pear' }
        ]}
        renderItem={(item, isHighlighted) =>
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.label}
          </div>
        }
        value={value}
        onChange={(e) => value = e.target.value}
        onSelect={(val) => { mySubmitHandler(val) }}
      />
      <p>{movies}</p>
    </div>
    
  );
}

export default App;
