import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, History, AlertCircle, CheckCircle, Download } from 'lucide-react';
import './Modules.css';

const PaymentInfo = () => {
  const payments = [
    { id: 1, type: "Tuition Fee", amount: "$4,500", date: "Jan 15, 2026", status: "Paid" },
    { id: 2, type: "Library Fee", amount: "$200", date: "Feb 01, 2026", status: "Paid" },
    { id: 3, type: "Lab Fee", amount: "$500", date: "Feb 10, 2026", status: "Pending" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="module-container"
    >
      <div className="payment-cards-container">
        <div className="invoice-card glass-card-premium">
          <div className="invoice-header">
            <h3><CreditCard size={20} color="var(--primary)" /> Outstanding Balance</h3>
            <span className="badge-warning">Due in 5 days</span>
          </div>
          <h2 className="amount-large">$500.00</h2>
          <p className="payment-details">Spring 2026 - Laboratory & Research Fee</p>
          <button className="pay-btn-premium">Pay Securely with Razorpay</button>
        </div>

        <div className="invoice-card glass-card-premium">
          <div className="invoice-header">
            <h3><History size={20} color="var(--primary)" /> Recent Payment</h3>
          </div>
          <h2 className="amount-large">$200.00</h2>
          <p className="payment-details">University Library Membership Renewal</p>
          <button className="edit-profile-btn-premium" style={{ width: '100%' }}>
            <Download size={18} /> Download Receipt
          </button>
        </div>
      </div>

      <div className="glass-card-premium">
        <h3><History size={20} /> Transaction History</h3>
        <div className="table-responsive">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td>#TXN-992{p.id}</td>
                  <td>{p.type}</td>
                  <td>{p.amount}</td>
                  <td>{p.date}</td>
                  <td>
                    <span className={`status-pill ${p.status.toLowerCase()}`}>
                      {p.status === "Paid" ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentInfo;
