import React from 'react'
import './App.css';
import { BrowserRouter as Router } from "react-router-dom"
import Nav from './components/Nav'


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
      </div>
    </Router>
  );
}

export default App;
