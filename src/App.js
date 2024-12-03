import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/App.css';
import MovieCard from './components/MovieCard.jsx';
import AboutUs from './pages/about_us.js';
import ContactUs from './pages/ContactUs.js';
import MovieDetails from './components/MovieDetails.tsx';
import Home from './pages/home.jsx';


const API_URL = 'https://omdbapi.com?apikey=fe2f6c44';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    };

    useEffect(() => {
        searchMovies('monsters');
    }, []);

    return (
        <Router>
            <div className="app">
                {/* Navbar */}
                <header className="header">
                    <h1 className="title">Movie Mania</h1>
                    <nav className="navbar">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </nav>
                </header>

                {/* Routes */}
                <Routes>
                    <Route
                        path="/"
                        element={<Home
                            movies={movies}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            searchMovies={searchMovies}
                        />}
                    />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    {/* Movie details route */}
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;