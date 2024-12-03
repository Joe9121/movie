import React from 'react';
import { Link } from 'react-router-dom'; 

const MovieCard = ({ movie }) => {
    return (
        <div className="movie">
            <Link to={`/movie/${movie.imdbID}`}>
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
                    <h3>{movie.Title}</h3>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;