import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LoginComponent from './pages/Login';
import SignupComponent from './pages/Signup';
import AdminComponent from './pages/Admin';
import ForgotPasswordComponent from './pages/ForgotPassword';
import PlayerComponent from './pages/Player/Player';
import LandingComponent from './pages/Landing';
import ProtectedRoutes from './routes/ProtectedRoutes';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));


  return (
        <Layout>
          <Routes>
            <Route path="/" element={<LandingComponent />} />
            <Route element={<ProtectedRoutes isAllowed={!!user} />}>
              <Route path="/home" element={<LandingComponent />} />
              <Route path="/player" element={<PlayerComponent />} />
            </Route>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="/forgot" element={<ForgotPasswordComponent />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoutes
                  isAllowed={user?.roles.includes('admin')}
                  redirectPath="/home">
                  <AdminComponent />
                </ProtectedRoutes>
              }
            />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </Layout>
  );
};

export default App;
