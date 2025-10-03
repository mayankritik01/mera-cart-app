import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import AuthContext from './context/AuthContext';
import CartContext from './context/CartContext';

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Mera Cart 🛒</Link>
      </div>

      <form onSubmit={submitHandler} className="navbar-search">
        <input
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search for products, brands and more"
        />
        <button type="submit">🔍</button>
      </form>

      <div className="navbar-links">
        {userInfo ? (
          <div className="navbar-user-menu">
            <span className="navbar-username">{userInfo.name}</span>
            <div className="navbar-dropdown">
              <Link to="/profile">My Profile</Link>
              <Link to="/myorders">My Orders</Link>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="navbar-btn">Login</Link>
        )}
        <Link to="/cart">
          Cart
          {cartItems.length > 0 && (
            <span className="cart-badge">
              {cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;