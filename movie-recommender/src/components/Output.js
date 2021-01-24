
import '../App.css';
import React, { useState } from 'react';

const Output = ({movieName}) => {


 
    return (
      <div className="output">
        <li className="output-item">{movieName}</li>
      </div>
    );
}

export default Output;