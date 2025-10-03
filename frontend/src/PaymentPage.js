import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from './context/CartContext';

const PaymentPage = () => {
  const { shippingAddress, paymentMethod, savePaymentMethod } = useContext(CartContext);
  const navigate = useNavigate();

  // Agar shipping address nahi hai, to wapas shipping page par bhej dein
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const [paymentMethodSelection, setPaymentMethodSelection] = useState(paymentMethod || 'PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethodSelection);
    navigate('/placeorder'); // Agle page par jaayein
  };

  return (
    <div className="container">
      <div className="shipping-container"> {/* Hum wahi CSS istemaal karenge */}
        <h1>Payment Method</h1>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label>Select Method</label>
            <div className="payment-options">
              <input
                type="radio"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethodSelection === 'PayPal'}
                onChange={(e) => setPaymentMethodSelection(e.target.value)}
              />
              <label htmlFor="PayPal">PayPal or Credit Card</label>
            </div>
            {/* Aap yahan aur payment options (jaise UPI, COD) add kar sakte hain */}
          </div>
          <button type="submit" className="btn-checkout">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;