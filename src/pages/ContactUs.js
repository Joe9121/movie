import React, { useState } from 'react';
import '../styles/contact_us.css';
import axios from 'axios';

function ContactUs ()  {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = () => {
        let formErrors = {};
        let valid = true;

        if (!formData.name) {   
            valid = false;
            formErrors.name = 'Name is required';
        }

        if (!formData.email) {
            valid = false;
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            valid = false;
            formErrors.email = 'Email is invalid';
        }

        if (!formData.message) {
            valid = false;
            formErrors.message = 'Message is required';
        }

        setErrors(formErrors);
        return valid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.post('http://localhost:5000/complaint', formData);
                setSuccessMessage('Complaint submitted successfully!');
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
                setErrors({
                    name: '',
                    email: '',
                    message: ''
                });
            } catch (error) {
                console.error('Error submitting complaint', error);
                setErrors({ message: 'Error submitting complaint. Please try again.' });
            }
        }
    };

    return (
        <div className="contact-us">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                    {errors.message && <span className="error">{errors.message}</span>}
                </div>
                <button type="submit">Submit</button>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </form>
        </div>
    );
};

export default ContactUs;