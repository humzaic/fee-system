import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import { authService } from '../../services/authService';
import './Login.css';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: 'parent@school.com',
    password: 'parent123',
    role: 'parent',
    admissionNo: 'STU2023001',
    adminCode: 'SCHOOL123'
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // SOLID: Single Responsibility Principle (SRP) - handleLogin function only focuses on the login process.
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const userCredentials = {
        email: loginData.email,
        password: loginData.password,
        role: loginData.role,
        ...(loginData.role === 'parent' && { admissionNo: loginData.admissionNo }),
        ...(loginData.role === 'admin' && { adminCode: loginData.adminCode })
      };

      const user = await authService.login(userCredentials);
      localStorage.setItem('user', JSON.stringify(user));

      // KISS: Directly navigate based on user role
      navigate(user.role === 'parent' ? '/parentDashboard' : '/adminDashboard');
    } catch (err) {
      setError(
        err.message.includes('401') 
          ? 'Invalid credentials' 
          : 'Login failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // SOLID: Open/Closed Principle (OCP) - The renderRoleSpecificField function is open for extension (new roles could be added without changing the main login logic).
  const renderRoleSpecificField = () => {
    if (loginData.role === 'parent') {
      return (
        <div className="form-group">
          <label>Student Admission Number</label>
          <input
            type="text"
            value={loginData.admissionNo}
            onChange={(e) => setLoginData({ ...loginData, admissionNo: e.target.value })}
            required
          />
        </div>
      );
    }

    if (loginData.role === 'admin') {
      return (
        <div className="form-group">
          <label>Admin Security Code</label>
          <input
            type="password"
            value={loginData.adminCode}
            onChange={(e) => setLoginData({ ...loginData, adminCode: e.target.value })}
            required
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`login-page ${loginData.role === 'admin' ? 'admin-mode' : ''}`}>
      <Navbar />

      <div className="login-card">
        <div className="login-header">
          <img src="/logo.png" alt="School Logo" className="logo" />
          <h2>School Fee Portal</h2>
          <p>Please login to continue</p>
          <p className="test-credentials">
            <small>Test {loginData.role} credentials pre-filled</small>
          </p>
        </div>

        {/* Role Selector */}
        <div className="login-type-selector">
          <button
            className={`login-type-btn ${loginData.role === 'parent' ? 'active' : ''}`}
            onClick={() => setLoginData({ ...loginData, role: 'parent' })}
          >
            Parent/Guardian Login
          </button>
          <button
            className={`login-type-btn ${loginData.role === 'admin' ? 'active' : ''}`}
            onClick={() => setLoginData({ ...loginData, role: 'admin' })}
          >
            Admin Login
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
          </div>

          {/* Role-Specific Extra Field */}
          {renderRoleSpecificField()}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Signing In...' : `Sign In as ${loginData.role === 'admin' ? 'Admin' : 'Parent'}`}
          </button>
        </form>

        {/* Footer Links */}
        <div className="login-footer">
          <Link to="/forgot-password">Forgot password?</Link>
          {loginData.role === 'parent' && (
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
