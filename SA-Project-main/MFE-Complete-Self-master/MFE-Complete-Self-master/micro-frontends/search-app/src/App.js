import logo from './logo.svg';
import './App.css';
import React from 'react';
import Search from './pages/search/search';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //     <h3>Search-App</h3>
    //   </header>
    // </div>
    // <BrowserRouter>
    <Search/>
    // </BrowserRouter>
  );
}

export default App;
