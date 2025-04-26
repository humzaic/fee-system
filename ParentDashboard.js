// // // // // import { useState, useEffect, useCallback } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { paymentService } from '../../services/paymentService';
// // // // // import PaymentModal from '../Payments/PaymentModal';
// // // // // import StatsOverview from './StatsOverview';
// // // // // import PaymentHistory from '../Payments/PaymentHistory';
// // // // // import './ParentDashboard.css';
// // // // // import AdminNavbar from '../Shared/AdminNavbar'; 

// // // // // const ParentDashboard = () => {
// // // // //   const [payments, setPayments] = useState([]);
// // // // //   const [showPaymentForm, setShowPaymentForm] = useState(false);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [stats, setStats] = useState({
// // // // //     totalPaid: 0,
// // // // //     pendingPayments: 0,
// // // // //     lastPaymentDate: null
// // // // //   });

// // // // //   const navigate = useNavigate();
// // // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // // //   useEffect(() => {
// // // // //     if (!user || user.role !== 'parent') {
// // // // //       navigate('/login');
// // // // //     }
// // // // //   }, [user, navigate]);

// // // // //   const calculateStats = useCallback((paymentsData) => {
// // // // //     const totalPaid = paymentsData
// // // // //       .filter(p => p.status === 'paid')
// // // // //       .reduce((sum, payment) => sum + payment.amount, 0);
      
// // // // //     const pendingPayments = paymentsData.filter(p => p.status === 'pending').length;
    
// // // // //     const lastPayment = paymentsData
// // // // //       .filter(p => p.status === 'paid')
// // // // //       .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    
// // // // //     setStats({
// // // // //       totalPaid,
// // // // //       pendingPayments,
// // // // //       lastPaymentDate: lastPayment?.date || null
// // // // //     });
// // // // //   }, []);

// // // // //   const loadPayments = useCallback(async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       setError(null);
// // // // //       const paymentsData = await paymentService.getParentPayments(user.id);
// // // // //       setPayments(paymentsData);
// // // // //       calculateStats(paymentsData);
// // // // //     } catch (err) {
// // // // //       console.error('Failed to load payments:', err);
// // // // //       setError('Failed to load payment history. Please try again later.');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   }, [user.id, calculateStats]);

// // // // //   useEffect(() => {
// // // // //     loadPayments();
// // // // //   }, [loadPayments]);

// // // // //   const handlePaymentSuccess = (newPayment) => {
// // // // //     setPayments(prev => [newPayment, ...prev]);
// // // // //     setShowPaymentForm(false);
// // // // //     calculateStats([newPayment, ...payments]);
// // // // //   };

// // // // //   const handleRefresh = async () => {
// // // // //     await loadPayments();
// // // // //   };

// // // // //   return (
// // // // //     <div className="parent-dashboard">
// // // // //         <AdminNavbar /> 
// // // // //       <header className="dashboard-header">
// // // // //         <h1>Parent Fee Portal</h1>
// // // // //         <div className="user-welcome">
// // // // //           <p>Welcome back, <strong>{user?.name}</strong></p>
// // // // //           {stats.lastPaymentDate && (
// // // // //             <p className="last-payment">
// // // // //               Last payment: {new Date(stats.lastPaymentDate).toLocaleDateString()}
// // // // //             </p>
// // // // //           )}
// // // // //         </div>
// // // // //       </header>
      
// // // // //       <StatsOverview 
// // // // //         stats={[
// // // // //           { title: 'Total Paid', value: `$${stats.totalPaid.toFixed(2)}`, color: '#3f8600' },
// // // // //           { title: 'Pending Payments', value: stats.pendingPayments, color: '#faad14' },
// // // // //           { title: 'Total Payments', value: payments.length }
// // // // //         ]}
// // // // //       />
      
// // // // //       <div className="payment-actions">
// // // // //         <button 
// // // // //           onClick={() => setShowPaymentForm(true)}
// // // // //           className="btn primary"
// // // // //           disabled={loading}
// // // // //         >
// // // // //           {loading ? 'Processing...' : 'Make New Payment'}
// // // // //         </button>
// // // // //         <button 
// // // // //           onClick={handleRefresh}
// // // // //           className="btn secondary"
// // // // //           disabled={loading}
// // // // //         >
// // // // //           Refresh Data
// // // // //         </button>
// // // // //       </div>
      
// // // // //       {showPaymentForm && (
// // // // //         <PaymentModal
// // // // //           onSuccess={handlePaymentSuccess}
// // // // //           onClose={() => setShowPaymentForm(false)}
// // // // //           parentId={user.id}
// // // // //           studentAdmissionNo={user.admissionNo}
// // // // //           mode="create"
// // // // //         />
// // // // //       )}
      
// // // // //       <PaymentHistory 
// // // // //         payments={payments}
// // // // //         loading={loading}
// // // // //         error={error}
// // // // //         onRetry={handleRefresh}
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default ParentDashboard;
// // // // import { useState, useEffect, useCallback } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { paymentService } from '../../services/paymentService';
// // // // import PaymentModal from '../Payments/PaymentModal';
// // // // import StatsOverview from './StatsOverview';
// // // // import PaymentHistory from '../Payments/PaymentHistory';
// // // // import './ParentDashboard.css';
// // // // import AdminNavbar from '../Shared/AdminNavbar';

// // // // const ParentDashboard = () => {
// // // //   const [payments, setPayments] = useState([]);
// // // //   const [showPaymentForm, setShowPaymentForm] = useState(false);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState(null);
// // // //   const [stats, setStats] = useState({
// // // //     totalPaid: 0,
// // // //     pendingPayments: 0,
// // // //     lastPaymentDate: null
// // // //   });

// // // //   const navigate = useNavigate();
// // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // //   useEffect(() => {
// // // //     if (!user || user.role !== 'parent') {
// // // //       navigate('/login');
// // // //     }
// // // //   }, [user, navigate]);

// // // //   const calculateStats = useCallback((paymentsData) => {
// // // //     // Convert amounts to numbers to ensure proper calculations
// // // //     const totalPaid = paymentsData
// // // //       .filter(p => p.status === 'paid')
// // // //       .reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0);
      
// // // //     const pendingPayments = paymentsData.filter(p => p.status === 'pending').length;
    
// // // //     const lastPayment = paymentsData
// // // //       .filter(p => p.status === 'paid')
// // // //       .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    
// // // //     setStats({
// // // //       totalPaid: totalPaid,
// // // //       pendingPayments,
// // // //       lastPaymentDate: lastPayment?.date || null
// // // //     });
// // // //   }, []);

// // // //   const loadPayments = useCallback(async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       setError(null);
// // // //       const paymentsData = await paymentService.getParentPayments(user.id);
// // // //       // Ensure amounts are numbers
// // // //       const formattedPayments = paymentsData.map(payment => ({
// // // //         ...payment,
// // // //         amount: parseFloat(payment.amount) || 0
// // // //       }));
// // // //       setPayments(formattedPayments);
// // // //       calculateStats(formattedPayments);
// // // //     } catch (err) {
// // // //       console.error('Failed to load payments:', err);
// // // //       setError('Failed to load payment history. Please try again later.');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, [user.id, calculateStats]);

// // // //   useEffect(() => {
// // // //     loadPayments();
// // // //   }, [loadPayments]);

// // // //   const handlePaymentSuccess = (newPayment) => {
// // // //     // Ensure new payment amount is a number
// // // //     const formattedPayment = {
// // // //       ...newPayment,
// // // //       amount: parseFloat(newPayment.amount) || 0
// // // //     };
    
// // // //     setPayments(prev => [formattedPayment, ...prev]);
// // // //     setShowPaymentForm(false);
// // // //     // Recalculate stats with the updated payments array
// // // //     calculateStats([formattedPayment, ...payments]);
// // // //   };

// // // //   const handleRefresh = async () => {
// // // //     await loadPayments();
// // // //   };

// // // //   return (
// // // //     <div className="parent-dashboard">
// // // //       <AdminNavbar /> 
// // // //       <header className="dashboard-header">
// // // //         <h1>Parent Fee Portal</h1>
// // // //         <div className="user-welcome">
// // // //           <p>Welcome back, <strong>{user?.name}</strong></p>
// // // //           {stats.lastPaymentDate && (
// // // //             <p className="last-payment">
// // // //               Last payment: {new Date(stats.lastPaymentDate).toLocaleDateString()}
// // // //             </p>
// // // //           )}
// // // //         </div>
// // // //       </header>
      
// // // //       <StatsOverview 
// // // //         stats={[
// // // //           { 
// // // //             title: 'Total Paid', 
// // // //             value: `$${stats.totalPaid.toFixed(2)}`, 
// // // //             color: '#3f8600' 
// // // //           },
// // // //           { 
// // // //             title: 'Pending Payments', 
// // // //             value: stats.pendingPayments, 
// // // //             color: '#faad14' 
// // // //           },
// // // //           { 
// // // //             title: 'Total Payments', 
// // // //             value: payments.length 
// // // //           }
// // // //         ]}
// // // //       />
      
// // // //       <div className="payment-actions">
// // // //         <button 
// // // //           onClick={() => setShowPaymentForm(true)}
// // // //           className="btn primary"
// // // //           disabled={loading}
// // // //         >
// // // //           {loading ? 'Processing...' : 'Make New Payment'}
// // // //         </button>
// // // //         <button 
// // // //           onClick={handleRefresh}
// // // //           className="btn secondary"
// // // //           disabled={loading}
// // // //         >
// // // //           Refresh Data
// // // //         </button>
// // // //       </div>
      
// // // //       {showPaymentForm && (
// // // //         <PaymentModal
// // // //           onSuccess={handlePaymentSuccess}
// // // //           onClose={() => setShowPaymentForm(false)}
// // // //           parentId={user.id}
// // // //           studentAdmissionNo={user.admissionNo}
// // // //           mode="create"
// // // //         />
// // // //       )}
      
// // // //       <PaymentHistory 
// // // //         payments={payments}
// // // //         loading={loading}
// // // //         error={error}
// // // //         onRetry={handleRefresh}
// // // //       />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ParentDashboard;
// // // import { useState, useEffect, useCallback } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { paymentService } from '../../services/paymentService';
// // // import PaymentModal from '../Payments/PaymentModal';
// // // import StatsOverview from './StatsOverview';
// // // import PaymentHistory from '../Payments/PaymentHistory';
// // // import './ParentDashboard.css';
// // // import AdminNavbar from '../Shared/AdminNavbar';

// // // const ParentDashboard = () => {
// // //   const [payments, setPayments] = useState([]);
// // //   const [showPaymentForm, setShowPaymentForm] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const [stats, setStats] = useState({
// // //     totalPaid: 0,
// // //     pendingPayments: 0,
// // //     lastPaymentDate: null
// // //   });

// // //   const navigate = useNavigate();
// // //   const user = JSON.parse(localStorage.getItem('user'));

// // //   useEffect(() => {
// // //     if (!user || user.role !== 'parent') {
// // //       navigate('/login');
// // //     }
// // //   }, [user, navigate]);

// // //   const calculateStats = useCallback((paymentsData) => {
// // //     if (!paymentsData || !Array.isArray(paymentsData)) {
// // //       console.error('Invalid payments data:', paymentsData);
// // //       return;
// // //     }

// // //     // Convert amounts to numbers and ensure status is lowercase for comparison
// // //     const formattedPayments = paymentsData.map(payment => ({
// // //       ...payment,
// // //       amount: parseFloat(payment.amount) || 0,
// // //       status: payment.status?.toLowerCase() || 'pending'
// // //     }));

// // //     const totalPaid = formattedPayments
// // //       .filter(p => p.status === 'paid')
// // //       .reduce((sum, payment) => sum + payment.amount, 0);
      
// // //     const pendingPayments = formattedPayments.filter(p => p.status === 'pending').length;
    
// // //     const lastPayment = formattedPayments
// // //       .filter(p => p.status === 'paid')
// // //       .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    
// // //     setStats({
// // //       totalPaid,
// // //       pendingPayments,
// // //       lastPaymentDate: lastPayment?.date || null
// // //     });

// // //     return formattedPayments;
// // //   }, []);

// // //   const loadPayments = useCallback(async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);
// // //       const paymentsData = await paymentService.getParentPayments(user.id);
      
// // //       if (!paymentsData) {
// // //         throw new Error('No payment data received');
// // //       }

// // //       const formattedPayments = calculateStats(paymentsData);
// // //       setPayments(formattedPayments || []);
// // //     } catch (err) {
// // //       console.error('Failed to load payments:', err);
// // //       setError('Failed to load payment history. Please try again later.');
// // //       setPayments([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [user.id, calculateStats]);

// // //   useEffect(() => {
// // //     loadPayments();
// // //   }, [loadPayments]);

// // //   const handlePaymentSuccess = (newPayment) => {
// // //     if (!newPayment) return;

// // //     const formattedPayment = {
// // //       ...newPayment,
// // //       amount: parseFloat(newPayment.amount) || 0,
// // //       status: newPayment.status?.toLowerCase() || 'pending',
// // //       date: newPayment.date || new Date().toISOString()
// // //     };

// // //     const updatedPayments = [formattedPayment, ...payments];
// // //     setPayments(updatedPayments);
// // //     calculateStats(updatedPayments);
// // //     setShowPaymentForm(false);
// // //   };

// // //   const handleRefresh = async () => {
// // //     await loadPayments();
// // //   };

// // //   return (
// // //     <div className="parent-dashboard">
// // //       <AdminNavbar /> 
// // //       <header className="dashboard-header">
// // //         <h1>Parent Fee Portal</h1>
// // //         <div className="user-welcome">
// // //           <p>Welcome back, <strong>{user?.name}</strong></p>
// // //           {stats.lastPaymentDate && (
// // //             <p className="last-payment">
// // //               Last payment: {new Date(stats.lastPaymentDate).toLocaleDateString()}
// // //             </p>
// // //           )}
// // //         </div>
// // //       </header>
      
// // //       <StatsOverview 
// // //         stats={[
// // //           { 
// // //             title: 'Total Paid', 
// // //             value: `$${stats.totalPaid.toFixed(2)}`, 
// // //             color: '#3f8600' 
// // //           },
// // //           { 
// // //             title: 'Pending Payments', 
// // //             value: stats.pendingPayments, 
// // //             color: '#faad14' 
// // //           },
// // //           { 
// // //             title: 'Total Payments', 
// // //             value: payments.length 
// // //           }
// // //         ]}
// // //       />
      
// // //       <div className="payment-actions">
// // //         <button 
// // //           onClick={() => setShowPaymentForm(true)}
// // //           className="btn primary"
// // //           disabled={loading}
// // //         >
// // //           {loading ? 'Processing...' : 'Make New Payment'}
// // //         </button>
// // //         <button 
// // //           onClick={handleRefresh}
// // //           className="btn secondary"
// // //           disabled={loading}
// // //         >
// // //           Refresh Data
// // //         </button>
// // //       </div>
      
// // //       {showPaymentForm && (
// // //         <PaymentModal
// // //           onSuccess={handlePaymentSuccess}
// // //           onClose={() => setShowPaymentForm(false)}
// // //           parentId={user.id}
// // //           studentAdmissionNo={user.admissionNo}
// // //           mode="create"
// // //         />
// // //       )}
      
// // //       <PaymentHistory 
// // //         payments={payments}
// // //         loading={loading}
// // //         error={error}
// // //         onRetry={handleRefresh}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default ParentDashboard;
// // import { useState, useEffect, useCallback } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import paymentService from '../../services/paymentService'; // Fixed import
// // import PaymentModal from '../Payments/PaymentModal';
// // import StatsOverview from './StatsOverview';
// // import PaymentHistory from '../Payments/PaymentHistory';
// // import './ParentDashboard.css';
// // import AdminNavbar from '../Shared/AdminNavbar';

// // const ParentDashboard = () => {
// //   const [payments, setPayments] = useState([]);
// //   const [showPaymentForm, setShowPaymentForm] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [stats, setStats] = useState({
// //     totalPaid: 0,
// //     pendingPayments: 0,
// //     lastPaymentDate: null
// //   });

// //   const navigate = useNavigate();
// //   const user = JSON.parse(localStorage.getItem('user'));

// //   useEffect(() => {
// //     if (!user || user.role !== 'parent') {
// //       navigate('/login');
// //     }
// //   }, [user, navigate]);

// //   const calculateStats = useCallback((paymentsData) => {
// //     if (!Array.isArray(paymentsData)) return;

// //     const formattedPayments = paymentsData.map(p => ({
// //       ...p,
// //       amount: parseFloat(p.amount) || 0,
// //       status: p.status?.toLowerCase()
// //     }));

// //     const totalPaid = formattedPayments
// //       .filter(p => p.status === 'paid')
// //       .reduce((sum, p) => sum + p.amount, 0);
      
// //     const pendingPayments = formattedPayments.filter(p => p.status === 'pending').length;
    
// //     const lastPayment = formattedPayments
// //       .filter(p => p.status === 'paid')
// //       .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    
// //     setStats({
// //       totalPaid,
// //       pendingPayments,
// //       lastPaymentDate: lastPayment?.date || null
// //     });

// //     return formattedPayments;
// //   }, []);

// //   const loadPayments = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const paymentsData = await paymentService.getParentPayments(user.id);
      
// //       if (!Array.isArray(paymentsData)) {
// //         throw new Error('Invalid payments data format');
// //       }

// //       const formattedPayments = calculateStats(paymentsData);
// //       setPayments(formattedPayments || []);
// //     } catch (err) {
// //       console.error('Payment load error:', err);
// //       setError(err.message || 'Failed to load payments');
// //       setPayments([]);
// //       setStats({
// //         totalPaid: 0,
// //         pendingPayments: 0,
// //         lastPaymentDate: null
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [user.id, calculateStats]);

// //   useEffect(() => {
// //     loadPayments();
// //   }, [loadPayments]);

// //   const handlePaymentSuccess = (newPayment) => {
// //     if (!newPayment) return;

// //     const formattedPayment = {
// //       ...newPayment,
// //       amount: parseFloat(newPayment.amount) || 0,
// //       status: newPayment.status?.toLowerCase() || 'pending',
// //       date: newPayment.date || new Date().toISOString(),
// //       studentName: newPayment.studentName || 'Unknown Student'
// //     };

// //     setPayments(prev => {
// //       const updatedPayments = [formattedPayment, ...prev];
// //       calculateStats(updatedPayments);
// //       return updatedPayments;
// //     });
    
// //     setShowPaymentForm(false);
// //   };

// //   const handleRefresh = async () => {
// //     await loadPayments();
// //   };

// //   return (
// //     <div className="parent-dashboard">
// //       <AdminNavbar />
// //       <header className="dashboard-header">
// //         <h1>Parent Fee Portal</h1>
// //         <div className="user-welcome">
// //           <p>Welcome back, <strong>{user?.name}</strong></p>
// //           {stats.lastPaymentDate && (
// //             <p className="last-payment">
// //               Last payment: {new Date(stats.lastPaymentDate).toLocaleDateString()}
// //             </p>
// //           )}
// //         </div>
// //       </header>
      
// //       <StatsOverview 
// //         stats={[
// //           { 
// //             title: 'Total Paid', 
// //             value: `$${stats.totalPaid.toFixed(2)}`, 
// //             color: '#3f8600' 
// //           },
// //           { 
// //             title: 'Pending Payments', 
// //             value: stats.pendingPayments, 
// //             color: '#faad14' 
// //           },
// //           { 
// //             title: 'Total Payments', 
// //             value: payments.length 
// //           }
// //         ]}
// //       />
      
// //       <div className="payment-actions">
// //         <button 
// //           onClick={() => setShowPaymentForm(true)}
// //           className="btn primary"
// //           disabled={loading}
// //         >
// //           {loading ? 'Processing...' : 'Make New Payment'}
// //         </button>
// //         <button 
// //           onClick={handleRefresh}
// //           className="btn secondary"
// //           disabled={loading}
// //         >
// //           {loading ? 'Refreshing...' : 'Refresh Data'}
// //         </button>
// //       </div>
      
// //       {showPaymentForm && (
// //         <PaymentModal
// //           onSuccess={handlePaymentSuccess}
// //           onClose={() => setShowPaymentForm(false)}
// //           parentId={user.id}
// //           studentAdmissionNo={user.admissionNo}
// //           mode="create"
// //         />
// //       )}
      
// //       <PaymentHistory 
// //         payments={payments}
// //         loading={loading}
// //         error={error}
// //         onRetry={handleRefresh}
// //       />
// //     </div>
// //   );
// // };

// // export default ParentDashboard;
// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { paymentService } from '../../services/paymentService';
// import PaymentModal from '../Payments/PaymentModal';
// import StatsOverview from './StatsOverview';
// import PaymentHistory from '../Payments/PaymentHistory';
// import './ParentDashboard.css';
// import AdminNavbar from '../Shared/AdminNavbar';

// const ParentDashboard = () => {
//   const [payments, setPayments] = useState([]);
//   const [showPaymentForm, setShowPaymentForm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [stats, setStats] = useState({
//     totalPaid: 0,
//     pendingPayments: 0,
//     totalPayments: 0
//   });

//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     if (!user || user.role !== 'parent') {
//       navigate('/login');
//     }
//   }, [user, navigate]);

//   const loadData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const [paymentsData, statsData] = await Promise.all([
//         paymentService.getParentPayments(user.id),
//         paymentService.getPaymentStats()
//       ]);

//       setPayments(paymentsData);
//       setStats({
//         totalPaid: statsData.totalAmount || 0,
//         pendingPayments: statsData.pendingPayments || 0,
//         totalPayments: statsData.totalPayments || 0
//       });
//     } catch (err) {
//       console.error('Failed to load data:', err);
//       setError('Failed to load data. Please try again.');
//       setPayments([]);
//       setStats({
//         totalPaid: 0,
//         pendingPayments: 0,
//         totalPayments: 0
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, [user.id]);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const handlePaymentSuccess = (newPayment) => {
//     setPayments(prev => [newPayment, ...prev]);
//     setStats(prev => ({
//       ...prev,
//       totalPaid: prev.totalPaid + parseFloat(newPayment.amount),
//       totalPayments: prev.totalPayments + 1,
//       pendingPayments: newPayment.status === 'pending' ? prev.pendingPayments + 1 : prev.pendingPayments
//     }));
//     setShowPaymentForm(false);
//   };

//   const handleRefresh = () => {
//     loadData();
//   };

//   return (
//     <div className="parent-dashboard">
//       <AdminNavbar />
//       <header className="dashboard-header">
//         <h1>Parent Fee Portal</h1>
//         <div className="user-welcome">
//           <p>Welcome back, <strong>{user?.name}</strong></p>
//         </div>
//       </header>
      
//       <StatsOverview 
//         stats={[
//           { title: 'Total Paid', value: `$${stats.totalPaid.toFixed(2)}`, color: '#3f8600' },
//           { title: 'Pending Payments', value: stats.pendingPayments, color: '#faad14' },
//           { title: 'Total Payments', value: stats.totalPayments }
//         ]}
//       />
      
//       <div className="payment-actions">
//         <button 
//           onClick={() => setShowPaymentForm(true)}
//           className="btn primary"
//           disabled={loading}
//         >
//           {loading ? 'Processing...' : 'Make New Payment'}
//         </button>
//         <button 
//           onClick={handleRefresh}
//           className="btn secondary"
//           disabled={loading}
//         >
//           Refresh Data
//         </button>
//       </div>
      
//       {showPaymentForm && (
//         <PaymentModal
//           onSuccess={handlePaymentSuccess}
//           onClose={() => setShowPaymentForm(false)}
//           parentId={user.id}
//           studentAdmissionNo={user.admissionNo}
//           mode="create"
//         />
//       )}
      
//       <PaymentHistory 
//         payments={payments}
//         loading={loading}
//         error={error}
//         onRetry={handleRefresh}
//       />
//     </div>
//   );
// };

// export default ParentDashboard;
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import paymentService from '../../services/paymentService'; 
import PaymentModal from '../Payments/PaymentModal';
import StatsOverview from './StatsOverview';
import PaymentHistory from '../Payments/PaymentHistory';
import './ParentDashboard.css';
import AdminNavbar from '../Shared/AdminNavbar';

const ParentDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalPaid: 0,
    pendingPayments: 0,
    totalPayments: 0
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role !== 'parent') {
      navigate('/login');
    }
  }, [user, navigate]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [paymentsData, statsData] = await Promise.all([
        paymentService.getParentPayments(user.id),
        paymentService.getPaymentStats(user.id)
      ]);

      setPayments(paymentsData);
      setStats({
        totalPaid: statsData.totalAmount || 0,
        pendingPayments: statsData.pendingPayments || 0,
        totalPayments: statsData.totalPayments || 0
      });
    } catch (err) {
      console.error('Failed to load data:', err);
      setError('Failed to load data. Please try again.');
      setPayments([]);
      setStats({
        totalPaid: 0,
        pendingPayments: 0,
        totalPayments: 0
      });
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handlePaymentSuccess = (newPayment) => {
    setPayments(prev => [newPayment, ...prev]);
    setStats(prev => ({
      ...prev,
      totalPaid: prev.totalPaid + parseFloat(newPayment.amount),
      totalPayments: prev.totalPayments + 1,
      pendingPayments: newPayment.status === 'pending' ? prev.pendingPayments + 1 : prev.pendingPayments
    }));
    setShowPaymentForm(false);
  };

  const handleRefresh = () => {
    loadData();
  };

  return (
    <div className="parent-dashboard">
      <AdminNavbar />
      <header className="dashboard-header">
        <h1>Parent Fee Portal</h1>
        <div className="user-welcome">
          <p>Welcome back, <strong>{user?.name}</strong></p>
        </div>
      </header>
      
      <StatsOverview 
        stats={[
          { title: 'Total Paid', value: `$${stats.totalPaid.toFixed(2)}`, color: '#3f8600' },
          { title: 'Pending Payments', value: stats.pendingPayments, color: '#faad14' },
          { title: 'Total Payments', value: stats.totalPayments }
        ]}
      />
      
      <div className="payment-actions">
        <button 
          onClick={() => setShowPaymentForm(true)}
          className="btn primary"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Make New Payment'}
        </button>
        <button 
          onClick={handleRefresh}
          className="btn secondary"
          disabled={loading}
        >
          Refresh Data
        </button>
      </div>
      
      {showPaymentForm && (
        <PaymentModal
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPaymentForm(false)}
          parentId={user.id}
          studentAdmissionNo={user.admissionNo}
          mode="create"
        />
      )}
      
      <PaymentHistory 
        payments={payments}
        loading={loading}
        error={error}
        onRetry={handleRefresh}
      />
    </div>
  );
};

export default ParentDashboard;