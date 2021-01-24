
import '../App.css';
import React, { useState } from 'react';

const Output = ({movieName}) => {


 
    return (
      <div className='inner-card'>
        <li className='fade-in'>{movieName}</li>
      </div>
    );
}

export default Output;