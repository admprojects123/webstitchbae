import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { domain } from '../../api.service';
import axios from 'axios';
import { useAlert } from '../../component/alert_popup/AlertContext';
import loginimage from '../../asset/loginpagestitch.PNG';

const LoginForm = () => {
  const navigate = useNavigate();
  const alertContext = useAlert();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${domain}/user/login`, { email });
      alertContext.showAlert(`OTP sent successfully to ${response.data.data.email}`);
      navigate('/verify', { state: { email: email } });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error during login:', error);
      alertContext.showAlert('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
      setEmail('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Side - Image */}
        <div className="login-image">
          <img src={loginimage} alt="Login Visual" />
        </div>

        {/* Right Side - Login Form */}
        <div className="login-content">
          <h2>Login</h2>
          <p style={{ fontWeight: 600, color: 'black' }}>Log In to Save Your Fashion</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Sending...' : 'Continue'}
            </button>
          </form>

          <p className="register-link">
            Don't have an account?{' '}
            <span onClick={() => navigate('/register')} className="register-text">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
