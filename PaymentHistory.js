// import './PaymentHistory.css';

// const PaymentHistory = ({ payments, loading, error, onRetry }) => {
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   return (
//     <div className="payment-history">
//       <h2>Payment History</h2>
      
//       {error ? (
//         <div className="error-state">
//           <p>{error}</p>
//           <button onClick={onRetry}>Retry</button>
//         </div>
//       ) : loading ? (
//         <div className="loading-state">Loading payment history...</div>
//       ) : payments.length === 0 ? (
//         <div className="empty-state">No payment records found</div>
//       ) : (
//         <div className="history-items">
//           {payments.map(payment => (
//             <div key={payment.id} className="history-item">
//               <div className="item-main">
//                 <span className="amount">${payment.amount.toFixed(2)}</span>
//                 <span className="date">{formatDate(payment.date)}</span>
//                 <span className={`status ${payment.status}`}>
//                   {payment.status}
//                 </span>
//               </div>
//               <div className="item-details">
//                 <span>Student: {payment.studentName}</span>
//                 <span>Receipt: #{payment.receiptNumber}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentHistory;
import './PaymentHistory.css';

const PaymentHistory = ({ payments, loading, error, onRetry }) => {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const formatAmount = (amount) => {
    const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="payment-history">
      <h2>Payment History</h2>
      
      {error ? (
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
      ) : loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading payment history...</p>
        </div>
      ) : payments.length === 0 ? (
        <div className="empty-state">
          <p>No payment records found</p>
          <button onClick={onRetry} className="refresh-button">
            Refresh
          </button>
        </div>
      ) : (
        <div className="history-items">
          {payments.map(payment => (
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
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;