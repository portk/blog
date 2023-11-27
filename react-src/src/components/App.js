import React from 'react';
import '../css/App.css';
import Sidebar from './Sidebar';
import Home from './Home';
import Header from './Header';
// import { Route } from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <div className="wrapper">
        <Sidebar/>
        <Header/>
        <div className='content'>
          <Home/>
        </div>
      </div>
    </div>
  );
}

export default App;
