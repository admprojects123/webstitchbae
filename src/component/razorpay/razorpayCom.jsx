import React from 'react';
import axios from 'axios';
import { domain } from '../../api.service';
// import { useNavigate } from 'react-router-dom';

async function handlePayment({ amounts, cartItems, addressId, navigate, showAlert }) {
  try {
    // Get the token and user data from sessionStorage
    const token = sessionStorage.getItem('authToken');
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const userId = userData ? userData.id : '';

    // Ensure the amount is an integer rupee value only (discard decimals)
    const totalPrice = parseInt(amounts); // e.g. '156.75' -> 156
    const amountInPaise = totalPrice * 100; // Razorpay accepts integer in paise

    // Prepare order data
    const data = {
      userId,
      totalPrice, // Send to backend in rupees
      productDetails: cartItems,
      addressId,
      paymentMethod: 'credit_card',
    };

    console.log('Order Data:', data);

    // Step 1: Create order on backend
    const orderResponse = await axios.post(
      `${domain}/user/create-order`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { razorpayOrderId, orderId } = orderResponse.data;
    console.log('Order Response:', orderResponse.data);

    if (!razorpayOrderId) {
      showAlert("Failed to create an order. Please try again.");
      return;
    }

    // Step 2: Razorpay configuration
    const options = {
      key: 'rzp_test_0NvZR3weubP2f7',
      amount: amountInPaise, // Always integer
      currency: 'INR',
      name: 'Stitch',
      description: 'Order Payment',
      image: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1738147419/lgo_ys4t0z.png',
      order_id: razorpayOrderId,
      handler: async (response) => {
        const paymentData = {
          userId,
          orderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        try {
          const result = await axios.post(
            `${domain}/user/verify-payment`,
            paymentData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (result.data.success) {
            navigate('/sucess-order', { replace: true });
            showAlert('Payment Successful! Order has been placed.');
          } else {
            showAlert('Payment Verification Failed. Please contact support.');
          }
        } catch (verificationError) {
          console.error('Error verifying payment:', verificationError);
          showAlert('Payment verification failed. Please try again.');
        }
      },
      prefill: {
        name: 'John Doe',
        email: 'iriswomenonline@gmail.com',
        contact: '9029992215',
      },
      theme: {
        color: '#3399cc',
      },
    };

    // Step 3: Open Razorpay modal
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();

    // Step 4: Handle failure
    razorpayInstance.on('payment.failed', (response) => {
      console.error('Payment Failed:', response.error);
      showAlert(`Payment Failed. Reason: ${response.error.description}`);
    });

  } catch (error) {
    console.error('Payment error:', error?.response?.data?.error || error.message);
    showAlert(error?.response?.data?.error || 'An unexpected error occurred');
  }
}

export default handlePayment;
