import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/App.css';
import MovieCard from './MovieCard';
import AboutUs from './about_us.js';
import ContactUs from './ContactUs.js';
import MovieDetails from './MovieDetails.tsx';


const API_URL = 'https://omdbapi.com?apikey=fe2f6c44';

const Home = ({ movies, searchTerm, setSearchTerm, searchMovies }) => (
    <div>
        <div className="search">
            <input
                placeholder="Search for Movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20230626112934/search.png"
                alt="search icon"
                onClick={() => searchMovies(searchTerm)}
            />
        </div>

        {movies?.length > 0 ? (
            <div className="container">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>
        ) : (
            <div className="empty">
                <h2>No Movies found</h2>
            </div>
        )}
    </div>
);

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    };

    useEffect(() => {
        searchMovies('SpiderMan');
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