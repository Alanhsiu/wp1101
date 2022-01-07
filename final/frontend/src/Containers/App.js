import './App.css'
import React from 'react'
import Homepage from './Homepage'
import { BrowserRouter as Router } from 'react-router-dom'

function App(props) {
  document.title = '110-1 wpfinal'
  
  return (
    <Router>
      <Homepage />
    </Router>
  );
}

export default App;