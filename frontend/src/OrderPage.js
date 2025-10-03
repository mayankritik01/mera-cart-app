import React from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderPage = () => {
  const { id: orderId } = useParams();

  return (
    <div className="container">
      <div className="order-success">
        <h1>Thank You!</h1>
        <h2>Your order has been placed.</h2>
        <p>Order ID: {orderId}</p>
        <Link to="/" className="btn-back">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderPage;