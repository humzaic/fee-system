// // import { useState } from 'react';
// // import { useNavigate, Link  } from 'react-router-dom';
// // import { authService } from '../../services/authService';
// // import './Register.css';
// // import Navbar from '../Shared/Navbar';

// // const Register = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     password: '',
// //     role: 'parent',
// //     // Parent-specific fields
// //     studentName: '',
// //     admissionNo: '',
// //     // Admin-specific fields
// //     adminCode: '',
// //     cnicNo: ''
// //   });
// //   const [error, setError] = useState('');
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setIsSubmitting(true);
    
// //     try {
// //       // Validate role-specific fields
// //       if (formData.role === 'parent' && (!formData.studentName || !formData.admissionNo)) {
// //         throw new Error('Student name and admission number are required');
// //       }
      
// //       if (formData.role === 'admin' && (!formData.adminCode || !formData.cnicNo)) {
// //         throw new Error('Admin security code and CNIC are required');
// //       }

// //       // Admin code validation
// //       if (formData.role === 'admin' && formData.adminCode !== 'SCHOOL123') {
// //         throw new Error('Invalid admin security code');
// //       }

// //       // Call authService.register() with form data
// //       const newUser = await authService.register(formData);
      
// //       // Show success message and redirect to login
// //       alert(`Registration successful! Welcome ${newUser.name}`);
// //       navigate('/login');
// //     } catch (err) {
// //       setError(err.message || 'Registration failed. Please try again.');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className={`register-container ${formData.role === 'admin' ? 'admin-mode' : ''}`}>
// //       <Navbar />
// //       <div className="register-card">
// //         <div className="register-header">
// //           <h2>Create {formData.role === 'admin' ? 'Admin' : 'Parent'} Account</h2>
// //           <p>Join our school fee management system</p>
// //         </div>

// //         {error && <div className="error-message">{error}</div>}

// //         <form onSubmit={handleSubmit} className="register-form">
// //           <div className="form-group">
// //             <label htmlFor="name">Full Name</label>
// //             <input
// //               id="name"
// //               type="text"
// //               name="name"
// //               placeholder="Enter your full name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>

// //           <div className="form-group">
// //             <label htmlFor="email">Email Address</label>
// //             <input
// //               id="email"
// //               type="email"
// //               name="email"
// //               placeholder="Enter your email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>

// //           <div className="form-group">
// //             <label htmlFor="password">Password</label>
// //             <input
// //               id="password"
// //               type="password"
// //               name="password"
// //               placeholder="Create a password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               required
// //               minLength="6"
// //             />
// //             <small className="hint-text">At least 6 characters</small>
// //           </div>

// //           <div className="form-group">
// //             <label htmlFor="role">Account Type</label>
// //             <select
// //               id="role"
// //               name="role"
// //               value={formData.role}
// //               onChange={handleChange}
// //               className="role-select"
// //             >
// //               <option value="parent">Parent/Guardian</option>
// //               <option value="admin">School Administrator</option>
// //             </select>
// //           </div>

// //           {/* Parent-specific fields */}
// //           {formData.role === 'parent' && (
// //             <>
// //               <div className="form-group">
// //                 <label htmlFor="studentName">Student Name</label>
// //                 <input
// //                   id="studentName"
// //                   type="text"
// //                   name="studentName"
// //                   placeholder="Enter student's full name"
// //                   value={formData.studentName}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               </div>

// //               <div className="form-group">
// //                 <label htmlFor="admissionNo">Admission Number</label>
// //                 <input
// //                   id="admissionNo"
// //                   type="text"
// //                   name="admissionNo"
// //                   placeholder="Enter student admission number"
// //                   value={formData.admissionNo}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               </div>
// //             </>
// //           )}

// //           {/* Admin-specific fields */}
// //           {formData.role === 'admin' && (
// //             <>
// //               <div className="form-group">
// //                 <label htmlFor="adminCode">Admin Security Code</label>
// //                 <input
// //                   id="adminCode"
// //                   type="password"
// //                   name="adminCode"
// //                   placeholder="Enter admin security code"
// //                   value={formData.adminCode}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //                 <small className="hint-text">Provided by school administration</small>
// //               </div>

// //               <div className="form-group">
// //                 <label htmlFor="cnicNo">CNIC Number</label>
// //                 <input
// //                   id="cnicNo"
// //                   type="text"
// //                   name="cnicNo"
// //                   placeholder="Enter your CNIC without dashes"
// //                   value={formData.cnicNo}
// //                   onChange={handleChange}
// //                   required
// //                   pattern="[0-9]{13}"
// //                   maxLength="13"
// //                 />
// //                 <small className="hint-text">13 digits without dashes</small>
// //               </div>
// //             </>
// //           )}

// //           <button 
// //             type="submit" 
// //             className="register-button"
// //             disabled={isSubmitting}
// //           >
// //             {isSubmitting ? 'Creating Account...' : 'Register'}
// //           </button>

// //           <div className="login-link">
// //             Already have an account? <Link to="/login">Sign in</Link>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Register;

// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import Navbar from '../Shared/Navbar';
// import { authService } from '../../services/authService';
// import './Register.css';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'parent',
//     studentName: '',
//     admissionNo: '',
//     studentClass: '',
//     section: '',
//     adminCode: '',
//     cnicNo: ''
//   });
  
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (formData.role === 'admin' && !/^\d{13}$/.test(formData.cnicNo)) {
//         throw new Error('Invalid CNIC format (13 digits required)');
//       }

//       const newUser = await authService.register(formData);
//       alert(`Registration successful! Welcome ${newUser.name}`);
//       navigate('/login');
//     } catch (err) {
//       setError(err.message.includes('ER_DUP_ENTRY') 
//         ? 'Registration failed: Duplicate entry' 
//         : err.message);
//     }
//   };

//   return (
//     <div className={`register-container ${formData.role === 'admin' ? 'admin-mode' : ''}`}>
//        <Navbar />
//       <div className="register-card">
//         <div className="register-header">
//           <h2>{formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} Registration</h2>
//           <p>Join our school management system</p>
//         </div>

//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Full Name</label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => setFormData({...formData, name: e.target.value})}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Email Address</label>
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) => setFormData({...formData, email: e.target.value})}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               value={formData.password}
//               onChange={(e) => setFormData({...formData, password: e.target.value})}
//               required
//               minLength="6"
//             />
//           </div>

//           <div className="form-group">
//             <label>Account Type</label>
//             <select
//               value={formData.role}
//               onChange={(e) => setFormData({...formData, role: e.target.value})}
//             >
//               <option value="parent">Parent</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           {formData.role === 'parent' && (
//             <>
//               <div className="form-group">
//                 <label>Student Name</label>
//                 <input
//                   type="text"
//                   value={formData.studentName}
//                   onChange={(e) => setFormData({...formData, studentName: e.target.value})}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label>Admission Number</label>
//                 <input
//                   type="text"
//                   value={formData.admissionNo}
//                   onChange={(e) => setFormData({...formData, admissionNo: e.target.value})}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label>Class</label>
//                 <input
//                   type="text"
//                   value={formData.studentClass}
//                   onChange={(e) => setFormData({...formData, studentClass: e.target.value})}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label>Section</label>
//                 <input
//                   type="text"
//                   value={formData.section}
//                   onChange={(e) => setFormData({...formData, section: e.target.value})}
//                   required
//                 />
//               </div>
//             </>
//           )}

//           {formData.role === 'admin' && (
//             <>
//               <div className="form-group">
//                 <label>Admin Security Code</label>
//                 <input
//                   type="password"
//                   value={formData.adminCode}
//                   onChange={(e) => setFormData({...formData, adminCode: e.target.value})}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label>CNIC Number</label>
//                 <input
//                   type="text"
//                   value={formData.cnicNo}
//                   onChange={(e) => setFormData({...formData, cnicNo: e.target.value})}
//                   required
//                   pattern="\d{13}"
//                 />
//               </div>
//             </>
//           )}

//           <button type="submit" className="register-button">
//             Register
//           </button>
//         </form>

//         <div className="login-link">
//           Already have an account? <Link to="/login">Login here</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
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
