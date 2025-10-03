import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from './context/CartContext';

const ShippingPage = () => {
  const { shippingAddress, saveShippingAddress } = useContext(CartContext);

  // State ko localStorage se initialize karein taaki data refresh par na jaaye
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    navigate('/payment'); // Agle page par jaayein
  };

  return (
    <div className="container">
      <div className="shipping-container">
        <h1>Shipping</h1>
        <form onSubmit={submitHandler}>
          {/* Form fields jaisi thi waisi hi rahengi */}
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text" id="address" placeholder="Enter address"
              value={address} required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text" id="city" placeholder="Enter city"
              value={city} required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text" id="postalCode" placeholder="Enter postal code"
              value={postalCode} required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text" id="country" placeholder="Enter country"
              value={country} required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-checkout">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default ShippingPage;