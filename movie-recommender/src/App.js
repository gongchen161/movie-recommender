import './App.css';
import React from 'react';
import Input from './components/Input';
import 'font-awesome/css/font-awesome.min.css'; 

function App() {

  
  return (
    
    <div className="body-card">
  
      <header>
        Movie Recommender
      </header>
      < Input />

      <div className="footer">
        <div>Movie data source: <a href='http://files.grouplens.org/datasets/movielens/ml-latest-small-README.html' target="_blank">GroupLens</a></div>
      </div>
    </div>
    
  );
}

export default App;
