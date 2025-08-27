import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "../styles/Order.css";

const ORDER_API_URL = "http://localhost:8080/api/order";
const CART_API_URL = "http://localhost:8080/api/cart";

const Order = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stateItems = state?.items;
    if (stateItems && stateItems.length > 0) {
      setItems(stateItems);
      localStorage.setItem("orderItems", JSON.stringify(stateItems));
    } else {
      const storedItems = JSON.parse(localStorage.getItem("orderItems")) || [];
      setItems(storedItems);
    }
  }, [state]);

  if (items.length === 0) {
    return <div>No items selected for order.</div>;
  }

  const grandTotal = items.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderRequests = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      // Place each order individually
      for (const order of orderRequests) {
        await axios.post(`${ORDER_API_URL}/place`, order);
      }

      alert("Order placed successfully!");
      localStorage.removeItem("orderItems");

      // Navigate to payment page with all items
      navigate("/payment", { state: { items } });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
    setLoading(false);
  };

  const handleRemoveFromCart = async (itemId, productName) => {
    try {
      await axios.delete(`${CART_API_URL}/remove/${itemId}`);
      alert(`${productName} removed from cart successfully!`);

      const updatedItems = items.filter((item) => item.id !== itemId);
      setItems(updatedItems);
      localStorage.setItem("orderItems", JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Error removing product from cart:", error);
      alert("Failed to remove product from cart.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="order-page-container">
        <h2>Order Confirmation</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="order-product-image"
                  />
                </td>
                <td>{item.productName}</td>
                <td>₹{Number(item.price).toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>₹{(Number(item.price) * Number(item.quantity)).toFixed(2)}</td>
                <td>
                  <button
                    className="remove-btn-small"
                    onClick={() => handleRemoveFromCart(item.id, item.productName)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="order-summary">
          <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
        </div>

        <div className="order-buttons">
          <button onClick={() => navigate("/cart")} className="back-btn">
            Back to Cart
          </button>
          <button onClick={handlePlaceOrder} className="pay-btn" disabled={loading}>
            {loading ? "Placing Order..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
