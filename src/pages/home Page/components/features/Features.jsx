import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <div className="features-container">
      <div className="features-content">
        <div className="feature">
          <div className="feature-number">1.</div>
          <div className="feature-text">
            <h3 className="feature-title">Trendy Designs</h3>
            <p className="feature-description">
              Stay ahead in fashion with our exclusive, trendsetting collections tailored to make you stand out
            </p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-number">2.</div>
          <div className="feature-text">
            <h3 className="feature-title">Premium Quality</h3>
            <p className="feature-description">
              Enjoy unmatched comfort and durability with our carefully curated, high-quality fabrics.
            </p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-number">3.</div>
          <div className="feature-text">
            <h3 className="feature-title">Hassle-Free Returns</h3>
            <p className="feature-description">
              Shop worry-free with our easy & convenient return policy for complete peace of mind
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
