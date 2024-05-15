import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

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

const TaskListContainer = styled.div`
  padding: 8px;
`;

const EditableInput = styled.input`
  width: 100%;
  border: none;
  background: none;
  padding: 8px;
  font-size: 1em;
  &:focus {
    outline: none;
  }
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
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

const AddTaskButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #1abc9c;
  cursor: pointer;
  font-size: 1em;
  padding: 8px;
  width: 100%;
  &:hover {
    background-color: #16a085;
    color: #ffffff;
  }
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

const TaskList = ({ tasks = [], handleTaskChange, handleTaskToggle, handleAddTask, handleDeleteTask }) => {
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const handleBlur = (id, content) => {
    handleTaskChange(id, content);
  };

  return (
    <Droppable droppableId="tasks">
      {(provided) => (
        <TaskListContainer ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <TaskContainer
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  completed={task.completed}
                >
                  <IconButton {...provided.dragHandleProps}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </IconButton>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleTaskToggle(task.id)}
                  />
                  <EditableInput
                    value={task.content}
                    onChange={(e) => handleTaskChange(task.id, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, task.id)}
                    onBlur={(e) => handleBlur(task.id, e.target.value)}
                    placeholder="Add a new task"
                    completed={task.completed}
                  />
                  <IconButton onClick={() => handleDeleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </IconButton>
                </TaskContainer>
              )}
            </Draggable>
          ))}
          <Draggable key="add-task" draggableId="add-task" index={tasks.length}>
            {(provided) => (
              <TaskContainer
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <AddTaskButton onClick={handleAddTask}>
                  <FontAwesomeIcon icon={faPlus} />
                  <span style={{ marginLeft: '8px' }}>Add Task</span>
                </AddTaskButton>
              </TaskContainer>
            )}
          </Draggable>
          {provided.placeholder}
        </TaskListContainer>
      )}
    </Droppable>
  );
};

export default TaskList;
