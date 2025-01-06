import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/about_us.css'; // Ensure this imports the styles from about_us.css

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            setMessage('Login successful!');
            navigate('/'); // Redirect to the homepage
        } catch (error) {
            console.error('Error logging in', error);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="contact-us">
            <div className="contact">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group team-member">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group team-member">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn">Login</button>
                </form>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default Login;