import React from 'react';
import './App.css';
import Search from './components/Search';
import LaunchContextProvider from './store';
import Card from './components/Card';

function App() {
  return (
  <div className="App">
    <LaunchContextProvider>
      <Search/>
      <Card/>
    </LaunchContextProvider>
  </div>
  )
}

export default App;
