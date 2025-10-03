import React from 'react';
import { Link } from 'react-router-dom'; // Link ko import karein
import './ProductCard.css';

const ProductCard = ({ productId, name, price, image }) => { // productId prop receive karein
  return (
    // Poore card ko Link component se wrap karein
    <Link to={`/product/${productId}`} className="product-link">
      <div className="product-card">
        <div className="product-image-container">
          <img src={image} alt={name} className="product-image" />
        </div>
        <div className="product-details">
          <h4 className="product-name">{name}</h4>
          <p className="product-price">{price}</p>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;