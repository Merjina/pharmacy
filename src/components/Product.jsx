import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChartLine, FaUser, FaMoneyBill, FaPills, FaCog } from "react-icons/fa";
import "../styles/Admin.css";
import "../styles/Product.css";

const API_URL = "http://localhost:8080/api/products";

const Product = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [preview, setPreview] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/all`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products.");
    }
    setLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const resetForm = () => {
    setProductName("");
    setProductDescription("");
    setPrice("");
    setImage(null);
    setPreview("");
    setQuantity("");
    setEditingProductId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !productDescription || !price || !quantity) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const base64Image = image ? await convertImageToBase64(image) : preview;
      const productData = {
        productName,
        productDescription,
        price: Number(price),
        quantity: Number(quantity),
        imageUrl: base64Image,
      };

      if (editingProductId) {
        await axios.put(`${API_URL}/update/${editingProductId}`, productData);
        alert("Product updated successfully!");
      } else {
        await axios.post(`${API_URL}/create`, productData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        alert("Product added successfully!");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Failed to add/update product.");
    }
  };

  const handleEdit = (product) => {
    setProductName(product.productName);
    setProductDescription(product.productDescription);
    setPrice(product.price);
    setQuantity(product.quantity.toString());
    setPreview(product.imageUrl);
    setEditingProductId(product.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Pharmacy</h2>
        </div>
        <ul className="sidebar-menu">
          <li><a href="/admin"><FaChartLine /> Dashboard</a></li>
          <li className="active"><a href="/product-management"><FaMoneyBill /> Product Management</a></li>
          <li><a className="prescription" href="userprescription"><FaPills /> Prescription Management</a></li>
          <li><a href="/user"><FaUser /> User Management</a></li>
          <li><a className="customer" href="feedbacklist"><FaPills /> Customer Feedback Reports</a></li>
          <li><a href="#settings"><FaCog /> Settings</a></li>
        </ul>
      </aside>

      <main className="admin-main">
        <div className="product-management">
          <h2>Product Management</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Upload Image:</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {preview && <img src={preview} alt="Product Preview" className="image-preview" />}
            </div>
            <div>
              <label>Product Name:</label>
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
            </div>
            <div>
              <label>Product Description:</label>
              <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} required />
            </div>
            <div>
              <label>Price:</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div>
              <label>Quantity:</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
            </div>
            <button className="add-button" type="submit">{editingProductId ? "Update Product" : "Add Product"}</button>
          </form>

          <hr />
          <h2>Available Products</h2>
          {loading && <p>Loading products...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="product-card-container">
            {products.length === 0 ? (
              <p>No products available.</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="image-container">
                    <img src={product.imageUrl} alt={product.productName} className="product-image" />
                  </div>
                  <p className="product-name-overlay">{product.productName}</p>
                  <p className="product-description">{product.productDescription}</p>
                  <p className="price">₹{product.price}</p>
                  <p className="quantity">Quantity: {product.quantity}</p>
                  <div className="product-actions">
                    <button onClick={() => handleEdit(product)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="delete-btn">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Product;
