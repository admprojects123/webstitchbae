import React from 'react';
import { useNavigate } from 'react-router-dom';
import './product.css'; // Import the Product.css file

const Product = ({ product ,onClick}) => {
  


  return (
    <div className="product" onClick={onClick}>
      <div className="product-image-container">
        <div 
          className="product-image-home" 
          style={{ backgroundImage: `url(${product.images[0]})` }} 
        />
      </div>
      <div className="product-details-home">
        <div className="product-name">{product.name}</div>
        <div className="current-price">₹ {product.price}</div>
         
        
      </div>
    </div>
  );
};

export default Product;