import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { TodoProvider } from './TodoContext';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';

const GetStarted = lazy(() => import('./pages/GetStarted'));
const YourTasks = lazy(() => import('./pages/YourTasks'));
const TodoListPage = lazy(() => import('./pages/TodoListPage'));

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  margin-left: 250px;
`;

const App = () => {
  return (
    <AuthProvider>
      <TodoProvider>
        <Router>
          <AppContainer>
            <Sidebar />
            <ContentContainer>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/tasks" element={<YourTasks />} />
                  <Route path="/list/:id" element={<TodoListPage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Suspense>
            </ContentContainer>
          </AppContainer>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
};

const Home = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Navigate to="/tasks" /> : <GetStarted />;
};

export default App;
