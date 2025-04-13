import React, { useEffect, useState, useRef } from 'react';
import './ProductGrid.css';
import Product from '../../../../component/product/product.jsx';
import { useNavigate } from 'react-router-dom';
import { domain } from '../../../../api.service';
import axios from 'axios';

const ProductGrid = ({ title, description, path }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${domain}${path}`);
        if (response.data.status === 200) {
          setProducts(response.data.data);
        } else {
          setError('Failed to fetch products.');
        }
      } catch (err) {
        setError('Error fetching products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [path]);

  const handleClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth / 1.5;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-grid-container">
      <div className="product-grid-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="product-scroll-wrapper">
        <div className="scroll-arrow left" onClick={() => scroll('left')}>
          &#8249;
        </div>

        <div className="product-grid" ref={scrollRef}>
          {products.map((product) => (
            <Product
              key={product._id}
              product={{
                id: product._id,
                name: product.name,
                price: product.price,
                images: product.images,
              }}
              onClick={() => handleClick(product._id)}
            />
          ))}
        </div>

        <div className="scroll-arrow right" onClick={() => scroll('right')}>
          &#8250;
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
