import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useTodo } from '../TodoContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const SidebarContainer = styled.div`
  background-color: #2c3e50;
  padding: 20px;
  height: 100vh;
  color: #ecf0f1;
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  background-color: #34495e;
  border-radius: 4px;
  position: relative;
  &:hover {
    background-color: #1abc9c;
  }
`;

const ListItemLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
  flex-grow: 1;
`;

const EditableInput = styled.input`
  border: none;
  background: none;
  color: #ecf0f1;
  padding: 0;
  margin: 0;
  font-size: 1em;
  &:focus {
    outline: none;
  }
`;

const AddButton = styled.button`
  background-color: #1abc9c;
  color: #ecf0f1;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  &:hover {
    background-color: #16a085;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #ecf0f1;
  cursor: pointer;
  font-size: 1em;
`;

const Menu = styled.div`
  background-color: #1c2b3a;
  border-radius: 4px;
  padding: 5px;
  position: absolute;
  top: 35px;
  right: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  color: #ecf0f1;
  padding: 10px;
  text-align: left;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #1abc9c;
  }
`;

const Sidebar = () => {
  const { logout, isAuthenticated } = useAuth();
  const { state: lists, dispatch } = useTodo();
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();

  const handleListNameChange = (id, newName) => {
    dispatch({ type: 'UPDATE_LIST_NAME', payload: { id, newName } });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedLists = Array.from(lists);
    const [movedList] = reorderedLists.splice(result.source.index, 1);
    reorderedLists.splice(result.destination.index, 0, movedList);

    dispatch({ type: 'REORDER_LISTS', payload: reorderedLists });
  };

  const handleMenuClick = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleDeleteList = (id) => {
    dispatch({ type: 'DELETE_LIST', payload: { listId: id } });
    setMenuOpen(null);
  };

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <SidebarContainer>
      <Header>
        <h2>Todo Lists</h2>
        <AddButton onClick={() => dispatch({ type: 'ADD_LIST' })}>+</AddButton>
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lists">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {isAuthenticated && (
                <ListItem onClick={() => handleClick('/tasks')}>
                  <ListItemLink to="/tasks">Your Tasks</ListItemLink>
                </ListItem>
              )}
              {lists.map((list, index) => (
                <Draggable key={list.id} draggableId={list.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ListItem>
                        <ListItemLink to={`/list/${list.id}`}>
                          <EditableInput
                            value={list.name}
                            onChange={(e) => handleListNameChange(list.id, e.target.value)}
                          />
                        </ListItemLink>
                        <IconButton onClick={() => handleMenuClick(list.id)}>
                          <FontAwesomeIcon icon={faEllipsisV} />
                        </IconButton>
                        {menuOpen === list.id && (
                          <Menu>
                            <MenuItem onClick={() => handleDeleteList(list.id)}>Delete</MenuItem>
                          </Menu>
                        )}
                      </ListItem>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {isAuthenticated && <AddButton onClick={() => logout({ returnTo: window.location.origin })}>Logout</AddButton>}
    </SidebarContainer>
  );
};

export default Sidebar;
