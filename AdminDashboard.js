import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import paymentService from '../../services/paymentService'; 
import PaymentModal from '../Payments/PaymentModal';
import StatsOverview from './StatsOverview';
import PaymentTable from './PaymentTable';
import FilterControls from './FilterControls';
import './AdminDashboard.css';
import Navbar from '../Shared/Navbar'; 


const AdminDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stats, setStats] = useState([
    { title: "Total Payments", value: 0, color: "#4CAF50" },
    { title: "Total Amount", value: "$0.00", color: "#2196F3" },
    { title: "Pending Payments", value: 0, color: "#FF9800" },
    { title: "Unique Parents", value: 0, color: "#9C27B0" }
  ]);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: null,
    search: ''
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  const calculateStats = useCallback((data) => {
    const totalPayments = data.length;
    const totalAmount = data.reduce((sum, payment) => sum + payment.amount, 0);
    const pendingPayments = data.filter(p => p.status === 'pending').length;
    const uniqueParents = new Set(data.map(p => p.parentId)).size;
    
    return [
      { title: "Total Payments", value: totalPayments, color: "#4CAF50" },
      { title: "Total Amount", value: `$${totalAmount.toFixed(2)}`, color: "#2196F3" },
      { title: "Pending Payments", value: pendingPayments, color: "#FF9800" },
      { title: "Unique Parents", value: uniqueParents, color: "#9C27B0" }
    ];
  }, []);

  const loadPayments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await paymentService.getPayments();
      setPayments(data);
      const statsData = calculateStats(data);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load payments:', error);
    } finally {
      setLoading(false);
    }
  }, [calculateStats]);

  const applyFilters = useCallback(() => {
    let result = [...payments];
    
    if (filters.status !== 'all') {
      result = result.filter(p => p.status === filters.status);
    }
    
    if (filters.dateRange) {
      const [start, end] = filters.dateRange;
      result = result.filter(p => {
        const paymentDate = new Date(p.date);
        return paymentDate >= new Date(start) && paymentDate <= new Date(end);
      });
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(p => 
        p.parentName.toLowerCase().includes(searchTerm) ||
        p.studentName.toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredPayments(result);
  }, [payments, filters]);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handlePaymentSuccess = (newPayment) => {
    setPayments(prev => [newPayment, ...prev]);
    setIsModalVisible(false);
    const statsData = calculateStats([newPayment, ...payments]);
    setStats(statsData);
  };

  return (
    <div className="admin-dashboard">
       <Navbar />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Fee Management Dashboard</h1>
          <p className="welcome-message">Welcome, {user?.name}</p>
        </header>
        
        <StatsOverview stats={stats} />
        
        <FilterControls 
          filters={filters}
          setFilters={setFilters}
          onAddPayment={() => setIsModalVisible(true)}
        />
        
        <PaymentTable 
          payments={filteredPayments}
          loading={loading}
          onEdit={(payment) => {
            // Handle edit functionality
          }}
        />
        
        {isModalVisible && (
          <PaymentModal
            onSuccess={handlePaymentSuccess}
            onClose={() => setIsModalVisible(false)}
            mode="create"
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;