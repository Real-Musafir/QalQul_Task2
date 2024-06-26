// src/App.js
import React from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <h1>Task List</h1>
      <AddTask />
      <TaskList />
    </div>
  );
};

export default App;
