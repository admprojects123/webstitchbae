// Banner.jsx
import React, { useEffect, useState } from 'react';
import './Banner.css';
import { domain } from '../../../../api.service';

const Banner = ({}) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        const response = await fetch(`${domain}/user/banner`);
        const data = await response.json();
        if (data.url) {
          setImageUrl(data.url);
        }
      } catch (error) {
        console.error('Error fetching banner image:', error);
      }
    };

    fetchBannerImage();
  }, []);

  return (
    <div className="banner-container">
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Banner" 
          className="banner-image"
          onError={() => setImageUrl('')}
        />
      )}
    </div>
  );
};

export default Banner;