import React, { createContext, useReducer, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return [...state, { id: uuidv4(), name: 'New List', tasks: [] }];
    case 'UPDATE_LIST_NAME':
      return state.map(list =>
        list.id === action.payload.id ? { ...list, name: action.payload.newName } : list
      );
    case 'ADD_TASK':
      return state.map(list =>
        list.id === action.payload.listId
          ? { ...list, tasks: [...list.tasks, { id: uuidv4(), content: '', completed: false }] }
          : list
      );
    case 'UPDATE_TASK':
      return state.map(list =>
        list.id === action.payload.listId
          ? {
              ...list,
              tasks: list.tasks.map(task =>
                task.id === action.payload.taskId ? { ...task, content: action.payload.newContent } : task
              ),
            }
          : list
      );
    case 'TOGGLE_TASK':
      return state.map(list =>
        list.id === action.payload.listId
          ? {
              ...list,
              tasks: list.tasks.map(task =>
                task.id === action.payload.taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : list
      );
    case 'DELETE_TASK':
      return state.map(list =>
        list.id === action.payload.listId
          ? { ...list, tasks: list.tasks.filter(task => task.id !== action.payload.taskId) }
          : list
      );
    case 'DELETE_LIST':
      return state.filter(list => list.id !== action.payload.listId);
    case 'REORDER_LISTS':
      return action.payload;
    case 'REORDER_TASKS':
      return state.map(list =>
        list.id === action.payload.id ? { ...list, tasks: action.payload.tasks } : list
      );
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, [
    { id: '1', name: 'Work', tasks: [{ id: '1', content: 'Add a new task', completed: false }] },
    { id: '2', name: 'Personal', tasks: [] },
  ]);

  return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
};

export const useTodo = () => useContext(TodoContext);
