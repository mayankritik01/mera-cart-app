import React, { useState, useEffect, useContext } from 'react'; // useContext ko import karein
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CartContext from './context/CartContext'; // CartContext ko import karein

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1); // Quantity ke liye state

  // Context se addToCart function nikalein
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Product not found.');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    // Context se mile function ko call karein
    addToCart({ ...product, qty });
    alert('Product added to cart!'); // Abhi ke liye ek alert dikhayein
  };

  return (
    <div className="container">
      <Link to="/" className="btn-back">
        Go Back
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="product-details-grid">
          <div className="product-image-large">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Rating:</strong> {product.rating} from {product.numReviews} reviews</p>
            <hr />
            <p className="product-price-large">Price: ₹{product.price}</p>
            <hr />
            <p><strong>Description:</strong> {product.description}</p>
          </div>
          <div className="product-actions">
            <p>Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
            
            {/* Quantity Selector */}
            {product.countInStock > 0 && (
              <div className="qty-selector">
                <label htmlFor="qty">Qty:</label>
                <select id="qty" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={addToCartHandler}
              className="add-to-cart-btn-large"
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;