import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomeComponent from './pages/Home/index.js';
import LoginComponent from './pages/Login';
import SignupComponent from './pages/Signup';
import AdminComponent from './pages/Admin';
import PlayerComponent from './pages/Player/Player';
import LandingComponent from './pages/Landing';
import ProtectedRoutes from './routes/ProtectedRoutes';

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
      <Layout>
        <Router>
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
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </Router>


      </Layout>
    </>
  );
};

export default App;
