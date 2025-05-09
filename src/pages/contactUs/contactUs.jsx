import React, { useState } from 'react';
import './ContactUs.css';
import { useNavigate } from 'react-router-dom';
import { domain } from '../../api.service';
import { useAlert } from '../../component/alert_popup/AlertContext';

const ContactUs = () => {
    const alertContext=useAlert()
    const navigate = useNavigate();
    console.log("Contact Us Page");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiPayload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phoneNumber,
            message: formData.message,
        };

        try {
            const response = await fetch(`${domain}/user/addContactUs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiPayload),
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const result = await response.json();
            console.log("Response from server:", result);
            alertContext.showAlert("Form successfully submitted!");
            navigate('/', { replace: true });

            // Reset form after submission
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                message: '',
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            alertContext.showAlert("Failed to submit the form. Please try again later.");
        }
    };

    return (
        <div className="contact-us-container">
            <div className="contact-content">
                <h1>Contact@stitchbae.com</h1>
                <p>Use our contact form for inquiries, and we'll get back to you as soon as possible.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <input type="text" id="firstName" name="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <input type="text" id="lastName" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Phone number" value={formData.phoneNumber} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-group message-group">
                        <textarea id="message" name="message" placeholder="Type your message..." value={formData.message} onChange={handleChange} required></textarea>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
