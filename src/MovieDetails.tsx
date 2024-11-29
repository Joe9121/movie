import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';  // Import the CSS file

// Define the type for movie details
interface MovieDetailsType {
    Title: string;
    Year: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Poster: string;
}

const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();  // Make sure to specify that 'id' is a string
    const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(null); // Define the state type

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const response = await fetch(`https://omdbapi.com?apikey=fe2f6c44&i=${id}`);
            const data = await response.json();
            setMovieDetails(data);
        };

        fetchMovieDetails();
    }, [id]);

    return (
        <div className="movie-details">
            {movieDetails ? (
                <div>
                    <h2>{movieDetails.Title}</h2>
                    <img
                        src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : "https://via.placeholder.com/400"}
                        alt={movieDetails.Title}
                    />
                    <p><strong>Year:</strong> {movieDetails.Year}</p>
                    <p><strong>Genre:</strong> {movieDetails.Genre}</p>
                    <p><strong>Director:</strong> {movieDetails.Director}</p>
                    <p><strong>Actors:</strong> {movieDetails.Actors}</p>
                    <p>{movieDetails.Plot}</p>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
};

export default MovieDetails;