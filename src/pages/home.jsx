import React from 'react';
import MovieCard from '../components/MovieCard';  // Import MovieCard component

function Home({ movies, searchTerm, setSearchTerm, searchMovies }){
  console.log()
    return (
      <div>
        <div className="search">
          <input
            placeholder="Search for Movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-icon-search-orange-png-image_5238731.jpg"
            alt="search icon"
            style={{ width: '40px', height: '40px' }}
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