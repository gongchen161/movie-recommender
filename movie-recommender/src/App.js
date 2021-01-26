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
        <hr className="line"></hr>
        <a href="https://github.com/gongchen161" title="Github" target="_blank" >
        <i className="fa fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/gongchen68" title="LinkedIn" target="_blank">
            <i className="fa fa-linkedin"></i>
        </a>
        <p>&copy; 2021 Gong Chen</p>
        <div>Movie data info from <a href='http://files.grouplens.org/datasets/movielens/ml-latest-small-README.html' target="_blank">grouplens</a></div>
      </div>
    </div>
    
  );
}

export default App;
