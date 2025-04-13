import React from 'react';
import './Collection.css';
import collectionwom from '../../../../asset/womencollection.png';
import collectionman from '../../../../asset/collectionman.png';

const CollectionHighlight = () => {
  return (
    <section className="collection-highlight">
      <div className="collection-images">
        <img
          src={collectionwom}
          alt="Woman fashion"
          className="collection-image"
        />
        <img
          src={collectionman}
          alt="Man fashion"
          className="collection-image"
        />
      </div>
      <div className="collection-text">
        <p className="section-subtitle">Our Collection Highlights</p>
        <h2 className="section-title">Passion for Fashion</h2>
        <p className="section-description">
          Explore our handpicked collection, where style meets comfort and quality.
          Each piece is designed with care to elevate your wardrobe and reflect your unique personality.
        </p>
        <p className="section-description">
          Discover the perfect blend of modern trends and timeless elegance.
        </p>
      </div>
    </section>
  );
};

export default CollectionHighlight;
