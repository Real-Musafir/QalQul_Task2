import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasksRequest, updateTaskStatusRequest, removeTaskRequest } from '../redux/actions';
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

const StatusButton = styled.button`
  padding: 10px;
  background-color: ${props => props.completed ? '#dc3545' : '#28a745'};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;

  &:hover {
    background-color: ${props => props.completed ? '#c82333' : '#218838'};
  }
`;

const RemoveButton = styled.button`
  padding: 10px;
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #cc0000;
  }
`;

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  const handleStatusToggle = (taskId, currentStatus) => {
    dispatch(updateTaskStatusRequest(taskId, !currentStatus));
  };

  const handleRemoveTask = (taskId) => {
    dispatch(removeTaskRequest(taskId));
  };

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
          <StatusButton
            completed={task.completed}
            onClick={() => handleStatusToggle(task.id, task.completed)}
          >
            {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
          </StatusButton>
          <RemoveButton onClick={() => handleRemoveTask(task.id)}>Remove Task</RemoveButton>
        </TaskItem>
      ))}
    </TaskListContainer>
  );
};

export default TaskList;
