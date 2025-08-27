import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import ResetPassword from "./components/ResetPassword";
import Forgot from "./components/Forgot";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import Product from "./components/Product";
import User from "./components/User";
import Browseproduct from "./components/Browseproduct";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Order from "./components/Order";
import Staff from "./components/Staff";
import Feedback from "./components/Feedback";
import FeedbackList from "./components/FeedbackList";
import Payment from "./components/Payment"; 
import Prescription from "./components/Prescription";
import Profile from "./components/Profile";
import ProfileUpdate from "./components/ProfileUpdate";
import UploadPrescription from "./components/UploadPrescription";
import UserPrescription from "./components/UserPrescription";
import { SearchProvider } from "./components/SearchContext";
import Help from "./components/Help"; // cleaned path
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/product-management" element={<Product />} />
            <Route path="/user" element={<User />} />
            <Route path="/browseproducts" element={<Browseproduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/order" element={<Order />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/opinionboard" element={<Feedback />} />
            <Route path="/feedbacklist" element={<FeedbackList />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-success" element={<h2>Order Successful!</h2>} />
            <Route path="/prescription" element={<Prescription />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/userprescription" element={<UserPrescription />} />
            <Route path="/profileupdate" element={<ProfileUpdate />} />
            <Route path="/uploadprescription" element={<UploadPrescription />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </Router>
      </SearchProvider>
    </div>
  );
}

export default App;
