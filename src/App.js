import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import useAuth from './hooks/useAuth';
import { LoadingProvider, useLoading } from './context/LoadingContext';

import Layout from './components/Layout/Layout';
import LoginComponent from './pages/Login';
import SignupComponent from './pages/Signup';
import AdminComponent from './pages/Admin';
import ForgotPasswordComponent from './pages/ForgotPassword';
import ServerComponent from './pages/Room';
import LandingComponent from './pages/Landing';
import MyAccountComponent from './pages/MyAccount';
import ProtectedRoutes from './routes/ProtectedRoutes';
import Loader from './components/Loader/Loader';
import socket from './socket';

const App = () => {
  const { currentUser } = useAuth();
  const isLoading = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    return () => {
      socket.off('connect');
    };
  }, [socket]);

  useEffect(() => {
    if (currentUser && (window.location.pathname === '/login' || window.location.pathname === '/signup')) {
      navigate('/');
    }
  }, [currentUser, navigate]);
  
  return (
    <LoadingProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingComponent />} />
          <Route element={<ProtectedRoutes isAllowed={currentUser} />}>
            <Route path="/myaccount" element={<MyAccountComponent />} />
          </Route>
          <Route path="/server/:id" element={<ServerComponent />} />
          <Route element={<ProtectedRoutes isAllowed={currentUser && currentUser.role === 'admin'} />}>
            <Route path="/admin" element={<AdminComponent />} />
          </Route>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/forgot" element={<ForgotPasswordComponent />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Layout>
      {isLoading && <Loader />} {/* Add this line to render the Loader component */}
    </LoadingProvider>
  );
};

export default App;
