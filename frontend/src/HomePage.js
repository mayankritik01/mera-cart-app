import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Products could not be loaded.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="container">
      <h2 className="section-title">Latest Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id} // <-- YEH NAYI LINE ADD HUI HAI
              name={product.name}
              price={`₹${product.price}`}
              image={product.image}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;