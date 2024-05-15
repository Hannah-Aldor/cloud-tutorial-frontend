import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useTodo } from '../TodoContext';

const Container = styled.div`
  padding: 20px;
  color: #2c3e50;
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  color: #34495e;
`;

const ListContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ecf0f1;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Subheading = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #1abc9c;
`;

const TaskContainer = styled.div`
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: ${({ completed }) => (completed ? '#e0f7f1' : 'white')};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TaskText = styled.input`
  flex-grow: 1;
  border: none;
  background: none;
  padding: 8px;
  font-size: 1em;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  margin-left: 10px;
  color: #34495e;
  font-family: 'Inter', sans-serif;
  &:focus {
    outline: none;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #2c3e50;
  cursor: pointer;
  margin-left: 8px;
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
  width: 16px;
  height: 16px;
  appearance: none;
  border: 2px solid #1abc9c;
  border-radius: 4px;
  position: relative;
  outline: none;
  &:checked {
    background-color: #1abc9c;
    border: none;
  }
  &:checked::after {
    content: '\\2713';
    font-size: 14px;
    color: white;
    position: absolute;
    top: -2px;
    left: 2px;
  }
`;

const NoTasksMessage = styled.p`
  font-size: 1em;
  color: #7f8c8d;
`;

const YourTasks = () => {
  const { state: lists, dispatch } = useTodo();

  const openTasks = lists
    .flatMap(list => (list.tasks || []).map(task => ({ ...task, listName: list.name, listId: list.id })))
    .filter(task => !task.completed);

  const completedTasks = lists
    .flatMap(list => (list.tasks || []).map(task => ({ ...task, listName: list.name, listId: list.id })))
    .filter(task => task.completed);

  const handleTaskInputChange = (listId, taskId, newContent) => {
    dispatch({ type: 'UPDATE_TASK', payload: { listId, taskId, newContent } });
  };

  return (
    <Container>
      <Title>Your Tasks</Title>
      {openTasks.length > 0 ? (
        lists.map(list => (
          <ListContainer key={list.id}>
            <Subheading>{list.name}</Subheading>
            {openTasks
              .filter(task => task.listId === list.id)
              .map(task => (
                <TaskContainer key={task.id} completed={task.completed}>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: { listId: list.id, taskId: task.id } })}
                  />
                  <TaskText
                    completed={task.completed}
                    value={task.content}
                    onChange={(e) => handleTaskInputChange(list.id, task.id, e.target.value)}
                  />
                  <IconButton onClick={() => dispatch({ type: 'DELETE_TASK', payload: { listId: list.id, taskId: task.id } })}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </IconButton>
                </TaskContainer>
              ))}
          </ListContainer>
        ))
      ) : (
        <NoTasksMessage>No open tasks</NoTasksMessage>
      )}
      <Title>Completed Tasks</Title>
      {completedTasks.length > 0 ? (
        lists.map(list => (
          <ListContainer key={list.id}>
            <Subheading>{list.name}</Subheading>
            {completedTasks
              .filter(task => task.listId === list.id)
              .map(task => (
                <TaskContainer key={task.id} completed={task.completed}>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: { listId: list.id, taskId: task.id } })}
                  />
                  <TaskText
                    completed={task.completed}
                    value={task.content}
                    onChange={(e) => handleTaskInputChange(list.id, task.id, e.target.value)}
                  />
                  <IconButton onClick={() => dispatch({ type: 'DELETE_TASK', payload: { listId: list.id, taskId: task.id } })}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </IconButton>
                </TaskContainer>
              ))}
          </ListContainer>
        ))
      ) : (
        <NoTasksMessage>No completed tasks</NoTasksMessage>
      )}
    </Container>
  );
};

export default YourTasks;
