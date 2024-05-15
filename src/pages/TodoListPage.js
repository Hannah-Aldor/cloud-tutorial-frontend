import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from '../components/TaskList';
import { useTodo } from '../TodoContext';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;

const EditableInput = styled.input`
  border: none;
  background: none;
  font-size: 2em;
  font-weight: bold;
  &:focus {
    outline: none;
  }
`;

const TodoListPage = () => {
  const { id } = useParams();
  const { state: lists, dispatch } = useTodo();

  const list = lists.find(list => list.id === id);

  const handleListNameChange = (newName) => {
    dispatch({ type: 'UPDATE_LIST_NAME', payload: { id, newName } });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(list.tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);

    dispatch({ type: 'REORDER_TASKS', payload: { id, tasks: reorderedTasks } });
  };

  return (
    <Container>
      <Header>
        <EditableInput
          value={list.name}
          onChange={(e) => handleListNameChange(e.target.value)}
        />
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskList
          tasks={list.tasks}
          handleTaskChange={(taskId, newContent) => dispatch({ type: 'UPDATE_TASK', payload: { listId: id, taskId, newContent } })}
          handleTaskToggle={(taskId) => dispatch({ type: 'TOGGLE_TASK', payload: { listId: id, taskId } })}
          handleAddTask={() => dispatch({ type: 'ADD_TASK', payload: { listId: id } })}
          handleDeleteTask={(taskId) => dispatch({ type: 'DELETE_TASK', payload: { listId: id, taskId } })}
        />
      </DragDropContext>
    </Container>
  );
};

export default TodoListPage;
