import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const MovieCard = ({ movie }) => {
    return (
        <div className="movie">
            {/* Wrap the card in a Link to make it clickable */}
            <Link to={`/movie/${movie.imdbID}`} className="movie-link">
                <div>
                    <p>{movie.Title}</p>
                </div>
                <div>
                    <img 
                        src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/400"} 
                        alt={movie.Title} 
                    />
                </div>
                <div>
                    <span>{movie.Type}</span>
                    <h3>{movie.Title}</h3>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;