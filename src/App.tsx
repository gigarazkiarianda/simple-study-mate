import React from 'react';
import Navigation from './components/Navbar';
import Timer from './components/Timer';
import TaskList from './components/TaskList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navigation />
      <div className="container mt-4">
        <Timer />
        <TaskList />
      </div>
    </div>
  );
};

export default App;
