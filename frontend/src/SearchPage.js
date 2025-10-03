import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';

const SearchPage = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products?keyword=${keyword}`);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch search results.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]); // Jab bhi keyword badlega, yeh dobara run hoga

  return (
    <main className="container">
      <h2 className="section-title">Search Results for "{keyword}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="product-grid">
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                name={product.name}
                price={`₹${product.price}`}
                image={product.image}
              />
            ))
          )}
        </div>
      )}
    </main>
  );
};

export default SearchPage;