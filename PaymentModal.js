import { useState, useEffect } from 'react';
import { paymentService } from '../../services/paymentService';
import './PaymentModal.css';

const PaymentModal = ({ 
  onSuccess, 
  onClose, 
  mode = 'create', 
  initialData = {},
  parentId,
  studentAdmissionNo,
  additionalFields = [] // LSP: Allow flexibility for future modal extensions
}) => {
  const [formData, setFormData] = useState({
    studentName: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    method: 'credit_card',
    ...initialData
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        ...initialData,
        date: initialData.date?.split('T')[0] || new Date().toISOString().split('T')[0]
      });
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const paymentData = {
        ...formData,
        parentId,
        studentAdmissionNo,
        amount: parseFloat(formData.amount),
        date: new Date(formData.date).toISOString()
      };

      const result = await paymentService.createPayment(paymentData);
      onSuccess(result); // LSP: Return data consistently to any extended modal
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{mode === 'create' ? 'Add New Payment' : 'Edit Payment'}</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Amount ($)</label>
            <input
              type="number"
              name="amount"
              min="0.01"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Payment Method</label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              required
            >
              <option value="credit_card">Credit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          {/* LSP: Flexibility to add custom fields in future */}
          {additionalFields.map((field, index) => (
            <div key={index} className="form-group">
              <label>{field.label}</label>
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
              />
            </div>
          ))}
          
          <div className="form-actions">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Submit Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
