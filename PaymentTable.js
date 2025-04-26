import { useCallback } from 'react';
import './PaymentTable.css';

const PaymentTable = ({ payments, loading, onEdit }) => {
  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'green';
      case 'pending': return 'orange';
      case 'failed': return 'red';
      default: return 'blue';
    }
  };

  return (
    <div className="payment-table-container">
      {loading && payments.length === 0 ? (
        <div className="loading-message">Loading payments...</div>
      ) : payments.length === 0 ? (
        <div className="empty-message">No payments found</div>
      ) : (
        <table className="payment-table">
          <thead>
            <tr>
              <th>Parent</th>
              <th>Student</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.parentName}</td>
                <td>{payment.studentName}</td>
                <td>${payment.amount.toFixed(2)}</td>
                <td>{formatDate(payment.date)}</td>
                <td>
                  <span className="status-badge" style={{ backgroundColor: getStatusColor(payment.status) }}>
                    {payment.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="edit-btn"
                    onClick={() => onEdit(payment)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentTable;