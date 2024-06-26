// src/components/TaskList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasksRequest } from '../redux/actions';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>{task.completed ? 'Completed' : 'Incomplete'}</p>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
