import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LoginComponent from './pages/Login';
import SignupComponent from './pages/Signup';
import AdminComponent from './pages/Admin';
import ForgotPasswordComponent from './pages/ForgotPassword';
import PlayerComponent from './pages/Player/Player';
import LandingComponent from './pages/Landing';
import MyAccountComponent from './pages/MyAccount';
import ProtectedRoutes from './routes/ProtectedRoutes';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && (window.location.pathname === '/login' || window.location.pathname === '/signup')) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingComponent />} />
        <Route element={<ProtectedRoutes isAllowed={currentUser} />}>
          <Route path="/player" element={<PlayerComponent />} />
          <Route path="/myaccount" element={<MyAccountComponent />} />
        </Route>
        <Route element={<ProtectedRoutes isAllowed={currentUser && currentUser.role === 'admin'} />}>
          <Route path="/admin" element={<AdminComponent />} />
        </Route>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/forgot" element={<ForgotPasswordComponent />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Layout>
  );
};

export default App;
