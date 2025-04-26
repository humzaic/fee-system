// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import './Login.css';
// import Navbar from '../Shared/Navbar';
// import { authService } from '../../services/authService';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('parent@school.com');
//   const [password, setPassword] = useState('parent123');
//   const [error, setError] = useState('');
//   const [loginType, setLoginType] = useState('parent');
//   const [navbarPadding, setNavbarPadding] = useState('0');
//   const [admissionNo, setAdmissionNo] = useState('STU2023001');
//   const [adminCode, setAdminCode] = useState('SCHOOL123');
//   const [isLoading, setIsLoading] = useState(false);

//   // Toggle between test credentials when login type changes
//   useEffect(() => {
//     if (loginType === 'parent') {
//       setEmail('parent@school.com');
//       setPassword('parent123');
//       setAdmissionNo('STU2023001');
//     } else {
//       setEmail('admin@school.com');
//       setPassword('admin123');
//       setAdminCode('SCHOOL123');
//     }
//   }, [loginType]);

//   useEffect(() => {
//     const handleNavbarVisibility = (isVisible) => {
//       setNavbarPadding(isVisible ? '80px' : '0');
//     };

//     const timer = setTimeout(() => {
//       window.dispatchEvent(new Event('navbar-hidden'));
//     }, 10000);

//     window.addEventListener('navbar-visible', () => {
//       clearTimeout(timer);
//       handleNavbarVisibility(true);
//     });
//     window.addEventListener('navbar-hidden', () => handleNavbarVisibility(false));

//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener('navbar-visible', () => handleNavbarVisibility(true));
//       window.removeEventListener('navbar-hidden', () => handleNavbarVisibility(false));
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
    
//     try {
//       const userData = {
//         email,
//         password,
//         role: loginType,
//         ...(loginType === 'parent' && { admissionNo }),
//         ...(loginType === 'admin' && { adminCode })
//       };

//       const user = await authService.login(userData);
      
//       localStorage.setItem('user', JSON.stringify({
//         role: user.role,
//         name: user.name,
//         email: user.email,
//         ...(user.role === 'parent' && { admissionNo: user.admissionNo }),
//         ...(user.role === 'admin' && { adminCode: user.adminCode })
//       }));

//       if (user.role === 'parent') {
//         navigate('/parentDashboard');
//       } else {
//         navigate('/adminDashboard');
//       }
//     } catch (err) {
//       setError(err.message || 'Invalid credentials. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-page" style={{ paddingTop: navbarPadding }}>
//       <Navbar />
//       <div className={`login-card ${loginType === 'admin' ? 'admin-mode' : ''}`}>
//         <div className="login-header">
//           <img src="/logo.png" alt="School Logo" className="logo" />
//           <h2>School Fee Portal</h2>
//           <p>Please login to continue</p>
//           <p className="test-credentials">
//             <small>Test {loginType} credentials pre-filled</small>
//           </p>
//         </div>

//         <div className="login-type-selector">
//           <button
//             className={`login-type-btn ${loginType === 'parent' ? 'active' : ''}`}
//             onClick={() => setLoginType('parent')}
//           >
//             Parent/Guardian Login
//           </button>
//           <button
//             className={`login-type-btn ${loginType === 'admin' ? 'active' : ''}`}
//             onClick={() => setLoginType('admin')}
//           >
//             Admin Login
//           </button>
//         </div>

//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               id="email"
//               type="email"
//               placeholder={`Enter your ${loginType} email`}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               type="password"
//               placeholder={`Enter your ${loginType} password`}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {loginType === 'parent' && (
//             <div className="form-group">
//               <label htmlFor="admissionNo">Student Admission Number</label>
//               <input
//                 id="admissionNo"
//                 type="text"
//                 placeholder="Enter student admission number"
//                 value={admissionNo}
//                 onChange={(e) => setAdmissionNo(e.target.value)}
//                 required
//               />
//             </div>
//           )}

//           {loginType === 'admin' && (
//             <div className="form-group">
//               <label htmlFor="adminCode">Admin Security Code</label>
//               <input
//                 id="adminCode"
//                 type="password"
//                 placeholder="Enter admin security code"
//                 value={adminCode}
//                 onChange={(e) => setAdminCode(e.target.value)}
//                 required
//               />
//             </div>
//           )}

//           <button 
//             type="submit" 
//             className="login-button"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Signing In...' : `Sign In as ${loginType === 'admin' ? 'Admin' : 'Parent'}`}
//           </button>

//           <div className="login-footer">
//             <Link to="/forgot-password">Forgot password?</Link>
//             {loginType === 'parent' && (
//               <p>Don't have an account? <Link to="/register">Register here</Link></p>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import Navbar from '../Shared/Navbar';
import { Link } from 'react-router-dom'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [isLoading, setIsLoading] = useState(false); // Added missing state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Added loading state management
    try {
      const user = await authService.login({
        email: loginData.email,
        password: loginData.password,
        role: loginData.role,
        ...(loginData.role === 'parent' && { admissionNo: loginData.admissionNo }),
        ...(loginData.role === 'admin' && { adminCode: loginData.adminCode })
      });

      localStorage.setItem('user', JSON.stringify(user));
      navigate(user.role === 'parent' ? '/parentDashboard' : '/adminDashboard');
      
    } catch (err) {
      setError(err.message.includes(401) 
        ? 'Invalid credentials' 
        : 'Login failed');
    } finally {
      setIsLoading(false); // Added loading state cleanup
    }
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

        <div className="login-type-selector">
          <button
            className={`login-type-btn ${loginData.role === 'parent' ? 'active' : ''}`}
            onClick={() => setLoginData({...loginData, role: 'parent'})}
          >
            Parent/Guardian Login
          </button>
          <button
            className={`login-type-btn ${loginData.role === 'admin' ? 'active' : ''}`}
            onClick={() => setLoginData({...loginData, role: 'admin'})}
          >
            Admin Login
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              required
            />
          </div>

          {loginData.role === 'parent' && (
            <div className="form-group">
              <label>Student Admission Number</label>
              <input
                type="text"
                value={loginData.admissionNo}
                onChange={(e) => setLoginData({...loginData, admissionNo: e.target.value})}
                required
              />
            </div>
          )}

          {loginData.role === 'admin' && (
            <div className="form-group">
              <label>Admin Security Code</label>
              <input
                type="password"
                value={loginData.adminCode}
                onChange={(e) => setLoginData({...loginData, adminCode: e.target.value})}
                required
              />
            </div>
          )}

          <button type="submit" className="login-button">
            {isLoading ? 'Signing In...' : `Sign In as ${loginData.role === 'admin' ? 'Admin' : 'Parent'}`}
          </button>
        </form>

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