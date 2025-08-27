import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaHome, FaList, FaUpload, FaShoppingCart, 
  FaComments, FaSignOutAlt, FaUserCircle, FaQuestionCircle 
} from "react-icons/fa";
import { Heart } from "lucide-react";
import { SearchContext } from "./SearchContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { setSearchTerm } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (inputValue.trim().length > 0) {
      setSearchTerm(inputValue);
      navigate("/browseproducts");
    }
  }, [inputValue, setSearchTerm, navigate]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleUploadPrescriptionClick = (e) => {
    e.preventDefault();
    navigate("/prescription");
  };

  return (
    <nav className="Navbar-nav">
      <div className="Navbar-div">BonvenMedicals</div>
      <ul className="Navbar-ul text-white">
        <li><Link to="/home"><FaHome /> Home</Link></li>
        <li><Link to="/browseproducts"><FaList /> Browse Products</Link></li>
        <li>
          <a href="#" onClick={handleUploadPrescriptionClick}>
            <FaUpload /> Upload Prescription
          </a>
        </li>
        <li><Link to="/cart"><FaShoppingCart /> Cart</Link></li>
        <li><Link to="/wishlist"><Heart className="wishlist-icon-navbar" /> Wishlist</Link></li>
        <li><Link to="/opinionBoard"><FaComments /> Opinion Board</Link></li>
        <li><Link to="/profile"><FaUserCircle /> Profile</Link></li>
        <li><Link to="/help"><FaQuestionCircle /> Help</Link></li> {/* ✅ Help Button */}
        <li><Link to="/"><FaSignOutAlt /> Logout</Link></li>
      </ul>
      <form className="Navbar-search">
        <input
          type="text"
          className="Navbar-search-input"
          placeholder="Search for products..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
    </nav>
  );
};

export default Navbar;
