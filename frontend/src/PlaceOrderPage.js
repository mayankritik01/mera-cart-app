import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartContext from './context/CartContext';
import AuthContext from './context/AuthContext';

const PlaceOrderPage = () => {
  const { cartItems, shippingAddress, paymentMethod, clearCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
const shippingPrice = cartItems.length === 0 ? 0 : (itemsPrice > 100 ? 0 : 10);  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data: createdOrder } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        },
        config
      );
      clearCart();
      navigate(`/order/${createdOrder._id}`);
    } catch (error) {
      console.error(error);
      alert('Order could not be placed.');
    }
  };

  return (
    <div className="container">
      <div className="place-order-grid">
        <div className="place-order-details">
          <div>
            <h2>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city}{' '}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>
          <hr />
          <div>
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {paymentMethod}
            </p>
          </div>
          <hr />
          <div>
            <h2>Order Items</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div className="cart-items-list">
                {cartItems.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                      <p>
                        {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Items:</span>
            <span>₹{itemsPrice.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Shipping:</span>
            <span>₹{shippingPrice.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Tax:</span>
            <span>₹{taxPrice.toFixed(2)}</span>
          </div>
          <hr />
          <div className="summary-item total-price">
            <span>Total:</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <button
            type="button"
            className="btn-checkout"
            disabled={cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;