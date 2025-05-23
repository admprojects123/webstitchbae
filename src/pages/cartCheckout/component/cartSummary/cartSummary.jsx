import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../pages/cartDetails/cartDetails.css';
export var rootSummary={}
export var cartProducts={}
export const CartSummary = ({ summary,cartItems, }) => {
  rootSummary=summary;
  cartProducts=cartItems;
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/cart-checkout-form' ,{replace: true},);
  };

  return (
    <div className="checkout-cart-summary">
      <div className="cartsummaryhead">Cart Summary</div>
      <p>Order Total: <span style={{ fontWeight: "600" }}>Rs. {summary.orderTotal}</span></p>
      <p>Delivery Charges: <span style={{ fontWeight: "600" }}>Rs. {summary.deliveryCharges}</span></p>
      <p style={{ borderBottom: "1px solid #D9D9D9", paddingBottom: "15px" }}>
        GST and Service Tax (5%): <span style={{ fontWeight: "600" }}>Rs. {summary.tax}</span>
      </p>
      <p className="total-amount">Total Amount: <span>Rs. {summary.totalAmount}</span></p>
      <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

