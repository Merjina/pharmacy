import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/Cart.css";

const CART_API_URL = "http://localhost:8080/api/cart";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${CART_API_URL}/all`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Failed to fetch cart items.");
    }
    setLoading(false);
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity less than 1
    try {
      await axios.put(`${CART_API_URL}/updateQuantity/${itemId}`, {
        quantity: newQuantity,
      });
      fetchCartItems();
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity.");
    }
  };

  const handleOrderNow = (item) => {
    navigate("/order", { state: { items: [item] } });
  };

  const handleRemoveFromCart = async (id) => {
    try {
      await axios.delete(`${CART_API_URL}/remove/${id}`);
      alert("Product removed from cart successfully!");
      fetchCartItems();
    } catch (error) {
      console.error("Error removing product from cart:", error);
      alert("Failed to remove product from cart.");
    }
  };

  const calculateTotalPrice = (item) => item.price * item.quantity;

  const calculateCartTotal = () =>
    cartItems.reduce((total, item) => total + calculateTotalPrice(item), 0);

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <h2>Your Cart</h2>
        {loading && <p>Loading cart items...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <p className="product-name">{item.productName}</p>
                    <p>Price per unit: ₹{item.price.toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p>Total Price: ₹{calculateTotalPrice(item).toFixed(2)}</p>
                    <button
                      className="order-btn"
                      onClick={() => handleOrderNow(item)}
                    >
                      Order Now
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <h3>Total Cart Value: ₹{calculateCartTotal().toFixed(2)}</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
