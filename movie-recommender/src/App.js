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
        <p>&copy; 2020-2021 <a href="https://gongchen161.github.io/" title="Home">Gong Chen</a></p>
        <div>Movie data info from <a href='http://files.grouplens.org/datasets/movielens/ml-latest-small-README.html' target="_blank">grouplens</a></div>
      </div>
    </div>
    
  );
}

export default App;
