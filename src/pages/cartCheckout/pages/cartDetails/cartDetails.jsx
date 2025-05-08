import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CartItem from '../../component/cartItem/cartItem';
import {CartSummary} from '../../component/cartSummary/cartSummary';
import { domain } from '../../../../api.service';
import './cartDetails.css';

const CartDetails = () => {
  const navigate = useNavigate();
  const [products, setCartItems] = useState([]);
  const [summary, setSummary] = useState({
    orderTotal: 0,
    deliveryCharges: 40,
    tax: 0,
    totalAmount: 0,
  });
  const fetchCart = async () => {
    const token = sessionStorage.getItem('authToken');
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const userId = userData ? userData.id : '';
  
    if (userId) {
      try {
        const response = await fetch(`${domain}/user/getCartProduct/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
  
        const data = await response.json();
  
        if (data && data.cart) {
          const processedItems = data.cart
            .filter(item => item.productId) // Ensure productId is present
            .map(item => ({
              id: item._id,
              productId: item.productId._id, // Now safe to access
              name: item.productId.name,
              price: item.productId.price,
              size: item.size,
              color: item.color,
              quantity: item.quantity,
              image: item.productId.images[0], // Assuming at least one image exists
            }));
  
          setCartItems(processedItems);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        navigate('/login'); // Redirect to login on error
      }
    } else {
      console.error('User ID not found in session storage');
      navigate('/login');
    }
  };
  
  useEffect(() => {
    fetchCart();
  }, [navigate]);

  useEffect(() => {
    calculateSummary();
  }, [products]);

  const calculateSummary = () => {
    let orderTotal = products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const deliveryCharges = 40;
    const tax = (orderTotal * 0.05).toFixed(2); // Assuming 5% tax
    const totalAmount = (orderTotal + deliveryCharges + parseFloat(tax)).toFixed(2);

    setSummary({
      orderTotal,
      deliveryCharges,
      tax,
      totalAmount,
    });
  };

  return (
    <div className="cart-details">
      <h1>Cart Details</h1>
      <div className="cart-progress">
        <span className="step step-active"><span className='circleforone'>1</span> Cart Details</span>
        <span className="step step-inactive"><span className='circleforone'>2</span> Checkout details</span>
        <span className="step step-inactive"><span className='circleforone'>3</span> Order complete</span>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-header">
            <span style={{ textAlign: "jus" }}>Product</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Subtotal</span>
          </div>
          {products.map((product, index) => (
            <CartItem key={index} product={product} fetchCart={fetchCart} />
          ))}
        </div>
        <CartSummary summary={summary} cartItems={products} />
      </div>
    </div>
  );
};

export default CartDetails;
