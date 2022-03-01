import React from 'react';
import logo from './logo.svg';
import './App.css';
import Feed from './components/Feed'
import Header from './components/AppBar'

function App() {
  return (
    <div className="App">
      <Header />
      <Feed />
    </div>
  );
}

export default App;
