import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import PostList from './components/PostList';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Router>
      <div>
        <nav style={{ padding: "10px", marginBottom: "20px", borderBottom: "1px solid gray" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
          {!isLoggedIn && <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>}
          {!isLoggedIn && <Link to="/signup" style={{ marginRight: "10px" }}>Signup</Link>}
          {isLoggedIn && <Link to="/admin" style={{ marginRight: "10px" }}>Admin Dashboard</Link>}
          {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </nav>

        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
