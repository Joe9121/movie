import React from 'react';
import MovieCard from '../components/MovieCard';  // Import MovieCard component

function Home({ movies, searchTerm, setSearchTerm, searchMovies }){
    return (
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
  }
export default Home;