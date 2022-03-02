import React from 'react';
import logo from './logo.svg';
import './App.css';
import Feed from './components/Feed'
import Header from './components/AppBar'
import { createStore } from 'react-redux'

function App() {
  return (
    <div className="App">
      <Header />
      <Feed />
    </div>
  );
}

export default App;
