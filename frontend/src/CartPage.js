import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from './context/CartContext';
import AuthContext from './context/AuthContext';

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping');
    } else {
      navigate('/login?redirect=/shipping');
    }
  };

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          Your cart is empty. <Link to="/">Go Back</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                  <p>Price: ₹{item.price}</p>
                  <p>Qty: {item.qty}</p>
                </div>
                <div className="cart-item-actions">
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </h2>
            <p className="total-price">
              Total: ₹
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </p>
            <button className="btn-checkout" onClick={checkoutHandler}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;