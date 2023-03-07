import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Link } from 'react-router-dom';
import HomeComponent from '../Home/HomeComponent.jsx';
import LoginComponent from '../Login/LoginComponent';
import SignupComponent from '../Signup/SignupComponent';
import AdminComponent from '../Admin/AdminComponent';
import PlayerComponent from '../Player/PlayerComponent';
import LandingComponent from '../Landing/LandingComponent';
import ProtectedRoutes from '../Routes/ProtectedRoutes';

import './App.css';

const App = () => {
  const [user, setUser] = React.useState(null);

  const handleLogin = () =>
    setUser({
      id: '1',
      name: 'robin',
      roles: ['admin'],
    });
  const handleLogout = () => setUser(null);

  return (
    <>
      <Router>
        <Navigation />

        {user ? (
          <button onClick={handleLogout}>Sign Out</button>
        ) : (
          <button onClick={handleLogin}>Sign In</button>
        )}

        <Routes>
          <Route path="/" element={<LandingComponent />} />
          <Route element={<ProtectedRoutes isAllowed={!!user} />}>
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/player" element={<PlayerComponent />} />
          </Route>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
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
        </Routes>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Router>
    </>
  );
};

const Navigation = () => (
  <nav>
    <ul>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/player">Player</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">Create account</Link></li>
      <li><Link to="/admin">Admin (protected)</Link></li>
    </ul>
  </nav>
);

export default App;
