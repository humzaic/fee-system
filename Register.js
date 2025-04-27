
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import { authService } from '../../services/authService';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'parent', // Default role set — KISS principle
    studentName: '',
    admissionNo: '',
    studentClass: '',
    section: '',
    adminCode: '',
    cnicNo: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to handle form input changes — DRY principle
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Function to validate CNIC for admin registration — SRP (Single Responsibility Principle)
  const validateAdmin = () => {
    if (!/^\d{13}$/.test(formData.cnicNo)) {
      throw new Error('Invalid CNIC format (13 digits required)');
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.role === 'admin') validateAdmin(); // SOLID - SRP
      const newUser = await authService.register(formData);
      alert(`Registration successful! Welcome ${newUser.name}`);
      navigate('/login');
    } catch (err) {
      setError(err.message.includes('ER_DUP_ENTRY') 
        ? 'Registration failed: Duplicate entry' 
        : err.message);
    }
  };

  return (
    <div className={`register-container ${formData.role === 'admin' ? 'admin-mode' : ''}`}>
      <Navbar />
      
      <div className="register-card">
        <div className="register-header">
          <h2>{formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} Registration</h2>
          <p>Join our school management system</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Common Fields */}
          {[
            { label: "Full Name", type: "text", field: "name" },
            { label: "Email Address", type: "email", field: "email" },
            { label: "Password", type: "password", field: "password", minLength: 6 }
          ].map(({ label, type, field, minLength }) => (
            <div className="form-group" key={field}>
              <label>{label}</label>
              <input
                type={type}
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                required
                {...(minLength && { minLength })}
              />
            </div>
          ))}

          {/* Role Selector */}
          <div className="form-group">
            <label>Account Type</label>
            <select
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
            >
              <option value="parent">Parent</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Parent Specific Fields */}
          {formData.role === 'parent' && (
            <>
              {[
                { label: "Student Name", field: "studentName" },
                { label: "Admission Number", field: "admissionNo" },
                { label: "Class", field: "studentClass" },
                { label: "Section", field: "section" }
              ].map(({ label, field }) => (
                <div className="form-group" key={field}>
                  <label>{label}</label>
                  <input
                    type="text"
                    value={formData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    required
                  />
                </div>
              ))}
            </>
          )}

          {/* Admin Specific Fields */}
          {formData.role === 'admin' && (
            <>
              <div className="form-group">
                <label>Admin Security Code</label>
                <input
                  type="password"
                  value={formData.adminCode}
                  onChange={(e) => handleChange('adminCode', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>CNIC Number</label>
                <input
                  type="text"
                  value={formData.cnicNo}
                  onChange={(e) => handleChange('cnicNo', e.target.value)}
                  required
                  pattern="\d{13}"
                />
              </div>
            </>
          )}

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
