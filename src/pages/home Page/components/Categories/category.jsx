import React from 'react';
import './category.css';
import mensphoto from '../../../../asset/mens.png';
import womensphoto from '../../../../asset/womens.png';
import allproducts from '../../../../asset/allproducts.png';

const Categories = () => {
  return (
    <div className="categories-container">
      <h2 className="categories-title">CATEGORIES</h2>
      <div className="categories-grid">
        <div className="category-card mens-card">
          <img src={mensphoto} alt="Men's" className="category-image" />
          <div className="category-label">MEN'S</div>
        </div>
        <div className="category-card">
          <img src={womensphoto} alt="Women's" className="category-image" />
          <div className="category-label">WOMEN'S</div>
        </div>
        <div className="category-card">
          <img src={allproducts} alt="All Products" className="category-image" />
          <div className="category-label">ALL PRODUCTS</div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
