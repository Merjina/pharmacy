import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Payment.css"; // Optional: Add styling

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const items = location.state?.items || [];

  const grandTotal = items.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const handlePayment = () => {
    alert("Payment successful!");
    navigate("/cart"); // Redirect to homepage or orders page
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="payment-page">
      <h2>Payment Page</h2>

      {items.length === 0 ? (
        <p>No items to pay for.</p>
      ) : (
        <>
          <table className="payment-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>₹{Number(item.price).toFixed(2)}</td>
                  <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="payment-summary">
            <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
          </div>

          <div className="payment-options">
            <h4>Select Payment Method:</h4>
            <div className="payment-methods">
              <button onClick={handlePayment}>Pay with Card</button>
              <button onClick={handlePayment}>Pay with UPI</button>
              <button onClick={handlePayment}>Pay with Net Banking</button>
            </div>
          </div>
        </>
      )}

      <button className="back-btn" onClick={handleBack}>Back</button>
    </div>
  );
};

export default Payment;
