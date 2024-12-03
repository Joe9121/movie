import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/MovieDetails.css';  

interface MovieDetailsType {
    Title: string;
    Year: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Poster: string;
}

function MovieDetails ()  {
    const { id } = useParams<{ id: string }>();  
    const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(null); 

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