import './PaymentHistory.css';

const PaymentHistory = ({ payments, loading, error, onRetry }) => {
  
  // DRY Principle: Reusable function to format date
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date'; // KISS: Simple fallback on error
    }
  };

  // DRY Principle: Reusable function to format amount
  const formatAmount = (amount) => {
    const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
    return `$${num.toFixed(2)}`;
  };

  // SOLID Principle (Single Responsibility): 
  // UI Rendering is clearly separated from formatting logic (formatDate, formatAmount)
  const renderPaymentItem = (payment) => (
    <div key={payment.id || payment.receiptNumber} className="history-item">
      <div className="item-main">
        <span className="amount">{formatAmount(payment.amount)}</span>
        <span className="date">{formatDate(payment.date)}</span>
        <span className={`status ${payment.status.toLowerCase()}`}>
          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1).toLowerCase()}
        </span>
      </div>
      <div className="item-details">
        {payment.studentName && (
          <span className="student">Student: {payment.studentName}</span>
        )}
        {payment.receiptNumber && (
          <span className="receipt">Receipt: #{payment.receiptNumber}</span>
        )}
      </div>
    </div>
  );

  // KISS Principle: Simple clear render blocks
  const renderContent = () => {
    if (error) {
      return (
        <div className="error-state">
          <p>Failed to load payment history. Please try again.</p>
          <button 
            onClick={onRetry}
            className="retry-button"
            disabled={loading}
          >
            {loading ? 'Retrying...' : 'Retry'}
          </button>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading payment history...</p>
        </div>
      );
    }

    if (payments.length === 0) {
      return (
        <div className="empty-state">
          <p>No payment records found</p>
          <button onClick={onRetry} className="refresh-button">
            Refresh
          </button>
        </div>
      );
    }

    return (
      <div className="history-items">
        {payments.map(renderPaymentItem)} {/* DRY: using reusable renderPaymentItem */}
      </div>
    );
  };

  return (
    <div className="payment-history">
      <h2>Payment History</h2>
      {renderContent()}
    </div>
  );
};

export default PaymentHistory;
