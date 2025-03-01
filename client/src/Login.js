import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('currentUser');

    axios.post('http://localhost:3001/login', { username, role, password })
      .then(result => {
        if (result.data !== "Unauthorised") {
          sessionStorage.setItem('currentUser', JSON.stringify(result.data));
          if (result.data.role === "Admin") navigate("/Admindashboard");
          else if (result.data.role === "Police") navigate("/policedashboard");
          else if (result.data.role === "User") navigate("/Userdashboard");
        } else {
          setMessage('Unauthorized: Please check your credentials.');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="containerlog">
      <div className="cardlog">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              className="form-control"
              name="role"
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Police">Police</option>
              <option value="User">User</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                name="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="btn-primary">Login</button>
        </form>

        {message && (
          <div className="message">
            <p className="error-text">{message}</p>
          </div>
        )}

        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign up here</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
