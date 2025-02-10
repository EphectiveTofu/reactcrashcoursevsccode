// import React from 'react'
import Spinner from './components/Spinner'
import { useState, useEffect } from 'react'
import Search from './components/Search'
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMBD_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `bearer ${API_KEY}`,
  },
}


const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');


  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm])

  const fetchMovies = async ( query  = ' ') => {
    setIsLoading(true); // Set loading to true
    setErrorMessage(''); // Clear any error messages

    try {
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Something went wrong while fetching your movies');
      }

      const data = await response.json();
      // console.log(data);

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
    } catch (error) {
      console.error(`Error grabbing your movie: ${error}`);
      setErrorMessage('Sorry, we could not find any movies for you.');
    } finally {
      setIsLoading(false); // Set loading to false
    }

  }


  useEffect(() => {
    fetchMovies( debouncedSearchTerm );
  }, [ debouncedSearchTerm ]);

  return (
    <main>

      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src='./src/assets/hero.png' alt="" />
          <h1>Find <span className="text-gradient">Movies </span>You will Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='all-movies'>
          <h2 className="mt-[40px]">All Movies</h2>
          {/* {errorMessage && <p className='text-red-500'>{errorMessage}</p>} */}

          {isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className='text-re-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>

    </main>


  )
}

export default App