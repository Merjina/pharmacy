import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { SearchContext } from "./SearchContext";
import { Heart } from "lucide-react";
import "../styles/Browseproduct.css";

const API_URL = "http://localhost:8080/api/products";
const CART_API_URL = "http://localhost:8080/api/cart";
const WISHLIST_API_URL = "http://localhost:8080/api/wishlist";

const Browseproduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState(new Set());
  const [wishlistItems, setWishlistItems] = useState(new Set(
    JSON.parse(localStorage.getItem("wishlistItems")) || []
  ));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { searchTerm } = useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/all`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products.");
    }
    setLoading(false);
  };

  const handleAddToCart = async (product) => {
    try {
        const cartItem = {
            productName: product.productName,
            productDescription: product.productDescription,
            price: product.price, // Price per unit
            quantity: 1, // Ensure this is greater than 0
            imageUrl: product.imageUrl,
        };

        const response = await axios.post("http://localhost:8080/api/cart/add", cartItem, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        alert(response.data);
    } catch (error) {
        console.error("Error adding product to cart:", error);
        alert("Failed to add product to cart.");
    }
};


  const handleOrderNow = (product) => {
    navigate("/cart");
  };

  const handleAddToWishlist = async (product) => {
    try {
      await axios.post(`${WISHLIST_API_URL}/add`, {
        productId: product.id,
        productName: product.productName,
        price: product.price,
        imageUrl: product.imageUrl,
      });
      alert("Product added to wishlist successfully!");

      // Update local wishlist state and save to localStorage
      setWishlistItems((prevItems) => {
        const updatedItems = new Set(prevItems).add(product.id);
        localStorage.setItem("wishlistItems", JSON.stringify([...updatedItems]));
        return updatedItems;
      });
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      alert("Failed to add product to wishlist.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="browse-products">
        <h2>Browse Products</h2>
        {loading && <p>Loading products...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="product-list">
          {filteredProducts.length === 0 ? (
            <p>No products available.</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="image-container">
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="product-image"
                  />
                </div>
                <p className="product-name">{product.productName}</p>
                <p className="product-description">{product.productDescription}</p>
                <p className="price">₹{product.price}</p>
                <div className="action-buttons">
                  {cartItems.has(product.id) ? (
                    <button
                      className="order-now-btn"
                      onClick={() => handleOrderNow(product)}
                    >
                      Order Now
                    </button>
                  ) : (
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  )}
                  <Heart
                    className={`wishlist-icon ${wishlistItems.has(product.id) ? "active" : ""}`}
                    onClick={() => handleAddToWishlist(product)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Browseproduct;
