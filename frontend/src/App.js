import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './Navbar';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import ShippingPage from './ShippingPage';
import PaymentPage from './PaymentPage';
import PlaceOrderPage from './PlaceOrderPage';
import OrderPage from './OrderPage';
import MyOrdersPage from './MyOrdersPage'; // <-- Naya import
import ProfilePage from './ProfilePage'; // <-- Naya import
import SearchPage from './SearchPage'; // <-- Naya import


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:keyword" element={<SearchPage />} /> {/* <-- Naya route */}
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/myorders" element={<MyOrdersPage />} /> {/* <-- Naya route */}
          <Route path="/profile" element={<ProfilePage />} /> {/* <-- Naya route */}


        </Routes>
      </div>
    </Router>
  );
}

export default App;