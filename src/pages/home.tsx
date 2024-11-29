// src/components/Home/Home.tsx
import React from 'react';
import MovieCard from '../components/MovieCard';  // Import MovieCard component

interface HomeProps {
    movies: Array<any>; // Adjust the type as needed
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    searchMovies: (term: string) => void;
}

const Home: React.FC<HomeProps> = ({ movies, searchTerm, setSearchTerm, searchMovies }) => (
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

export default Home;