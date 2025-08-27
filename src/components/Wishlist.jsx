import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import "../styles/Browseproduct.css";

const WISHLIST_API_URL = "http://localhost:8080/api/wishlist";

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlistProducts();
  }, []);

  const fetchWishlistProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${WISHLIST_API_URL}/all`);
      console.log("Fetched Wishlist Products:", response.data);
      setWishlistProducts(response.data);
    } catch (error) {
      console.error("Error fetching wishlist products:", error);
      setError("Failed to fetch wishlist products.");
    }
    setLoading(false);
  };

  const handleOrderNow = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
    const existingIndex = cartItems.findIndex((item) => item.id === product.id);
  
    if (existingIndex !== -1) {
      cartItems[existingIndex].quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
    console.log("Updated Cart Items:", cartItems); // ✅ Confirm in devtools
    navigate("/cart");
  };
  
  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.delete(`${WISHLIST_API_URL}/remove/${productId}`);
      setWishlistProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      console.log("Product removed from wishlist successfully");
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      setError("Failed to remove product from wishlist.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="browse-products">
        <h2>Your Wishlist</h2>
        {loading && <p>Loading wishlist products...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="product-list">
          {wishlistProducts.length === 0 ? (
            <p>No products in your wishlist.</p>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="image-container">
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="product-image"
                  />
                </div>
                <div className="product-details">
                  <p className="product-name">{product.productName}</p>
                  <p className="product-description">{product.productDescription}</p>
                  <p className="price">Price: ₹{product.price.toFixed(2)}</p>
                </div>
                <div className="action-buttons">
                  <button
                    className="order-now-btn"
                    onClick={() => handleOrderNow(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
