import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Login from './security/Login';
import Register from './security/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState(null); // selected board

  // Check localStorage when app mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogin = () => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(loggedUser);
  };

  return (
    <Router>
      <Routes>
        {/* Register Page */}
        <Route
          path="/register"
          element={!user ? <Register onRegister={handleLogin} /> : <Navigate to="/" />}
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
        />

        {/* Protected Dashboard */}
        <Route
          path="/"
          element={
            user ? (
              <>
                <Header onLogout={() => setUser(null)} />
                <div className="content flex">
                  <Sidebar onSelectBoard={setSelectedBoard} /> {/* pass callback */}
                  <Main board={selectedBoard} /> {/* pass selected board */}
                </div>
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Catch all unknown routes */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
