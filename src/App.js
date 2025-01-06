import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles/App.css";
import MovieCard from "./components/MovieCard.jsx";
import AboutUs from "./pages/about_us.js";
import ContactUs from "./pages/ContactUs.js";
import MovieDetails from "./components/MovieDetails.tsx";
import Home from "./pages/home.jsx";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chatbot from "./components/Chatbot";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const API_URL = "https://omdbapi.com?apikey=fe2f6c44";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("monsters");
  }, []);

  return (
    <Router>
      <div className="app">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/privacy-policy">Privacy and Policy</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/chatbot">Chatbot</Link> {/* Add Chatbot link */}
        </nav>
        <Routes>
          <Route path="/" element={<Home movies={movies} searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchMovies={searchMovies} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chatbot" element={<Chatbot />} /> {/* Add Chatbot route */}
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;