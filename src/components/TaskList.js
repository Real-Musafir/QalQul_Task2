// src/components/TaskList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasksRequest } from '../redux/actions';
import styled from 'styled-components';

const TaskListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TaskItem = styled.li`
  padding: 20px;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
`;

const TaskTitle = styled.h2`
  margin: 0 0 10px 0;
  color: #007bff;
`;

const TaskDescription = styled.p`
  margin: 5px 0;
`;

const TaskStatus = styled.p`
  margin: 5px 0;
`;

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state);

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
    <TaskListContainer>
      {tasks.map((task) => (
        <TaskItem key={task.id}>
          <TaskTitle>{task.title}</TaskTitle>
          <TaskDescription>{task.description}</TaskDescription>
          <TaskStatus>{task.completed ? 'Completed' : 'Incomplete'}</TaskStatus>
        </TaskItem>
      ))}
    </TaskListContainer>
  );
};

export default TaskList;
