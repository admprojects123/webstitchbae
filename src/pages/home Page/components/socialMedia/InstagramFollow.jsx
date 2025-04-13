// InstagramFollow.jsx
import React from 'react';
import './InstagramFollow.css';
import { Icon } from '@iconify/react';

// Import your images (replace with your actual image paths)
import image1 from '../../../../asset/test/product1.png';
import image2 from '../../../../asset/test/product2.png';
import image3 from '../../../../asset/test/product3.png';
import image4 from '../../../../asset/test/product1.png';

const InstagramFollow = () => {
const handleImageClick = (imageSrc) => {
    window.open(imageSrc, '_blank');
};

return (
    <div className="instagram-follow-container">
        <div className="instagram-content">
            <div className="instagram-header">
                <div className="instagram-text">
                    Follow us on Instagram
                </div>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="instagram-link">
                    <div className="instagram-link-content">
                        <span className="instagram-link-text">Stay updated with the latest trends, discover exclusive collections, get style inspiration, and be the first to know about special offers – follow us on Instagram @stichbae!</span>
                    </div>
                </a>
            </div>
            <div className="instagram-images">
                <img src={image1} alt="Instagram Post 1" className="instagram-image" onClick={() => handleImageClick(image1)} />
                <img src={image2} alt="Instagram Post 2" className="instagram-image" onClick={() => handleImageClick(image2)} />
                <img src={image3} alt="Instagram Post 3" className="instagram-image" onClick={() => handleImageClick(image3)} />
                <img src={image4} alt="Instagram Post 4" className="instagram-image" onClick={() => handleImageClick(image4)} />
            </div>
        </div>
    </div>
);
};

export default InstagramFollow;