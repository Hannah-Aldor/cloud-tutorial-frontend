import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  background-color: #f7f9fc;
  color: #2c3e50;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.2em;
  margin-bottom: 40px;
`;

const LoginButton = styled.button`
  background-color: #1abc9c;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 1.2em;
  cursor: pointer;
  &:hover {
    background-color: #16a085;
  }
`;

const GetStarted = () => {
  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container>
      <Title>Welcome to Your Todo List App</Title>
      <Subtitle>Please login to manage your tasks</Subtitle>
      {!isAuthenticated && <LoginButton onClick={login}>Get Started with Auth0</LoginButton>}
      {error && <p style={{ color: 'red' }}>Authentication Error: {error.message}</p>}
    </Container>
  );
};

export default GetStarted;
