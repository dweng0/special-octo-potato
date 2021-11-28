import React, {useState, useEffect} from 'react';
import { MoviesProps } from '../movies/interface';
import MovieComponent from '../movie';
import { Movie, Genre } from '../../interface';

/**
 * Movies component renders the list of movies, handles filtering
 * @param MovieProps, an array of Movie {@see Movie} {@see MovieProps}
 * @Author Jay Martin
 */
const Movies: React.FunctionComponent<MoviesProps> = ({movies, genres}) => { 

    const [filteredMovies, setFilteredMovies] = useState<Array<Movie>>(movies);
    const [availableGenres, setAvailableGenres] = useState<Array<Genre>>([]);

    useEffect(() => {
        const byPopularity = (movieA: Movie, movieB: Movie) => (movieB.popularity - movieA.popularity);
        setFilteredMovies(movies.sort(byPopularity))
    }, [movies]);

    useEffect(() => {

        const getAllGenresFromFilteredMovies = (): Array<Genre> => filteredMovies.reduce(reduceAvailableGenres, []);
        
        // reducer to build a list of all available genres from list of movies.
        const reduceAvailableGenres = (acc: Array<Genre>, currentMovie: Movie, _index:number, _array:Array<Movie>): Array<Genre> => { 
        const availableGenres: Array<Genre> = [];
        const newGenres = currentMovie.genre_ids.reduce((results, current, _index, _array) => { return reduceMovieGenres(results, current, acc) }, availableGenres);            
                return [...acc, ...newGenres];
        }

        // reducer to enrich movie genre_ids into an array of Genres
        const reduceMovieGenres = (accumulatedResults: Array<Genre>, currentId: number, existingGenres: Array<Genre>): Array<Genre> => {

                const newGenre = genres.find(genre => genre.id === currentId);
            
                // if its not found, and it exists in our genres list push it
                if(!existingGenres.find(genre => genre.id === currentId) && newGenre ) {
                    accumulatedResults.push(newGenre);
                }
            return accumulatedResults
        }
       
       setAvailableGenres(getAllGenresFromFilteredMovies);
    }, [filteredMovies, genres, setAvailableGenres]);

    /**
     * Conditional rendering
     */

    // renders the number of movies currently displayed
    const showNumberOfMovies = () => {         
        if(filteredMovies && filteredMovies.length > 0) { 
            const isSingular = (filteredMovies.length === 1)
            return <div>Showing {filteredMovies.length} {(isSingular) ? "movie" : "movies" }</div>
        }

        return <div>No movies to show.</div> ;
    }

    const renderGenre = (genre: Genre) => { 
        return <div>{genre.name}</div>
    }

    console.log('genres', availableGenres);
    return (
        <div className={'movies'}>
            {showNumberOfMovies()}
            <div className={'genres'}>
                {availableGenres.map(renderGenre)}
            </div>
            <div>
                {filteredMovies.map((movie) => <MovieComponent key={movie.id} {...movie} />)}
            </div>
        </div>
    );
}

export default Movies;