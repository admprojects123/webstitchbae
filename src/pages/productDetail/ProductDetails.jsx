import React, { useState, useEffect } from 'react';
import './ProductDetails.css';
import { Icon } from '@iconify/react';
import { domain } from '../../api.service';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from '../../component/alert_popup/AlertContext';
import ProductDisReview from './component/ProductDisReview';

const ProductDetails = ({ match }) => {
    const showAlert = useAlert().showAlert;
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { productId } = useParams();

    useEffect(() => {
        const fetchProductDetails = async () => {
            const token = sessionStorage.getItem('authToken');

            try {
                const response = await fetch(`${domain}/product/getProductDetail/${productId}?viewProduct=true`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        navigate('/login');
                    } else {
                        throw new Error('Failed to fetch product details');
                    }
                }

                const data = await response.json();

                if (data.status === 200) {
                    const productData = data.data;
                    setProduct(data.data);
                    if (productData.sizes && productData.sizes.length > 0) {
                        const availableSizes = productData.sizes.filter(sizeObj => sizeObj.quantity > 0);
                        setSelectedSize(availableSizes.length > 0 ? availableSizes[0].size : null);
                    }

                    if (productData.colors && productData.colors.length > 0) {
                        setSelectedColor(productData.colors[0]);
                    }
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProductDetails();
    }, [productId, navigate]);

    async function handleAddToCart(path) {
        showAlert("Please wait...");
        const userData = sessionStorage.getItem('userData');
        if (!userData) {
            navigate('/login');
            showAlert('User not logged in');
            return;
        }

        const { id: userId } = JSON.parse(userData);

        if (!userId || !selectedColor || !selectedSize || !product) {
            showAlert('Please select a color, size, and ensure the product details are loaded.');
            return;
        }

        try {
            const response = await axios.post(
                `${domain}${path}`,
                {
                    userId: userId,
                    productId: product._id,
                    quantity: 1,
                    color: selectedColor,
                    size: selectedSize
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
                    }
                }
            );

            showAlert(response.data.message);
        } catch (error) {
            navigate('/login');
            console.error("Error adding to cart:", error);
            showAlert('There was an issue adding the item to your cart. Please try again.');
        }
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    // Function to generate a hex color from a string
    const stringToColor = (str) => {
        if (str.toLowerCase() === 'white') return '#ffffff';
        if (str.toLowerCase() === 'black') return '#000000';
        if (str.toLowerCase() === 'red') return '#ff0000';
        if (str.toLowerCase() === 'blue') return '#0000ff';
        if (str.toLowerCase() === 'green') return '#008000';
        if (str.toLowerCase() === 'yellow') return '#ffff00';
        if (str.toLowerCase() === 'pink') return '#ffc0cb';
        if (str.toLowerCase() === 'purple') return '#800080';
        if (str.toLowerCase() === 'orange') return '#ffa500';
        if (str.toLowerCase() === 'gray' || str.toLowerCase() === 'grey') return '#808080';
        if (str.toLowerCase() === 'brown') return '#a52a2a';
        
        // For other colors, generate a consistent color from the string
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).substr(-2);
        }
        return color;
    };

    return (
        <div className='root-product-container'>
            <div className="product-details-container">
                <div className="product-details-left">
                    <div className="product-details-images">
                        {product.images.map((image, index) => (
                            <div
                                key={index}
                                className="product-details-image"
                                style={{ backgroundImage: `url(${image})` }}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="product-details-right">
                    <div className="product-details-info">
                        <h1 className="product-details-name">{product.name}</h1>

                        <div className="product-details-price-parent">
                            <div className="product-details-price">₹ {product.price}</div>
                            <div className="product-details-tax">Incl. of all Taxes</div>
                        </div>

                        <div className="product-details-details">
                        <div className="product-details-color-selection">
    <label><strong>Colour</strong></label>
    <div className="color-options-container">
        {product.colors.map((color) => (
            <div key={color} className="color-option-wrapper">
                <div
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => handleColorClick(color)}
                    style={{ backgroundColor: stringToColor(color) }}
                    title={color}
                >
                    {selectedColor === color && (
                        <Icon icon="mdi:check" className="color-check-icon" />
                    )}
                </div>
                <span className="color-name">{color}</span>
            </div>
        ))}
    </div>
</div>
                        </div>

                        <div className="product-details-size-selection">
                            <p style={{ textAlign: "justify" }}><strong>Size</strong></p>
                            <div className="product-details-sizes">
                                {product.sizes
                                    .filter((sizeObj) => sizeObj.quantity > 0)
                                    .map((sizeObj) => (
                                        <button
                                            key={sizeObj._id}
                                            className={`product-details-size-button ${selectedSize === sizeObj.size ? 'product-details-selected' : ''}`}
                                            onClick={() => handleSizeClick(sizeObj.size)}
                                        >
                                            {sizeObj.size}
                                        </button>
                                    ))}
                            </div>
                        </div>

                        <div className="product-details-actions">
                            <button className="product-details-add-to-cart" onClick={() => handleAddToCart("/user/addToCart")}>Add to Cart</button>
                            <div className="product-details-add-to-wishlist" onClick={() => handleAddToCart("/user/addToWishlist")}>
                                <Icon icon="mdi:heart-outline" /> Add to Wishlist
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductDisReview discription={product.description} productId={product._id} />
        </div>
    );
};

export default ProductDetails;