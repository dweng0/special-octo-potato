import React, {useState, useEffect} from 'react';
import { MoviesProps } from '../movies/interface';
import MovieComponent from '../movie';
import FilterComponent from '../filter';
import { Movie, Genre } from '../../interface';

/**
 * Movies component renders the list of movies, handles filtering
 * @param MovieProps, an array of Movie {@see Movie} {@see MovieProps}
 * @Author Jay Martin
 */
const Movies: React.FunctionComponent<MoviesProps> = ({movies, genres}) => { 

    // handle state
    const [filteredMovies, setFilteredMovies]   = useState<Array<Movie>>(movies);
    const [availableGenres, setAvailableGenres] = useState<Array<Genre>>([]);
    const [checkedGenres, setCheckedGenres]     = useState<Array<number>>([]);
    const [reset, setReset]                     = useState<boolean>(false);

    /**
     * It: Sorts filtered movies list by popularity
     * Occurs when: new movies data is provided from parent, or reset is toggled.
     */
    useEffect(() => {
        const byPopularity = (movieA: Movie, movieB: Movie) => (movieB.popularity - movieA.popularity);
        setFilteredMovies(movies.sort(byPopularity))
    }, [movies, reset]);

    /**
     * It: Builds a list of genres based on the movies provided
     * Occurs when: new movies or genres are provided from parent
     */
    useEffect(() => {

        const getAllGenresFromMovies = (): Array<Genre> => movies.reduce(reduceAvailableGenres, []);
        
        // reducer to build a list of all available genres from list of movies.
        const reduceAvailableGenres = (acc: Array<Genre>, currentMovie: Movie, _index:number, _array:Array<Movie>): Array<Genre> => { 
            const availableGenres: Array<Genre> = [];
            const newGenres = currentMovie.genre_ids.reduce((results, current, _index, _array) => reduceMovieGenres(results, current, acc), availableGenres);            
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
       
       setAvailableGenres(getAllGenresFromMovies);
    }, [movies, genres, setAvailableGenres]);

    /**
     * It: Resets checked genre state
     * Occurs when: new genres are provided or user clicks reset
     */
    useEffect(() => { 
        setCheckedGenres([]);
    }, [genres, reset]);

    // It: renders the number of movies currently displayed
    const showNumberOfMovies = () => {         
        const movies = filteredMovies.filter(filteredCheckedIfAvailable);
        if(movies && movies.length > 0) { 
            const isSingular = (movies.length === 1)
            return <div>Showing {movies.length} {(isSingular) ? "movie" : "movies" }</div>
        }

        return <div>No movies to show.</div> ;
    }

    // It: renders all films if none have been checked, otherwise only show checked
    const  filteredCheckedIfAvailable = (movie: Movie) => { 
        if(checkedGenres.length === 0) {
            return  true
        }
        return movie.genre_ids.some(id => checkedGenres.includes(id)) 
    }

    // It: enriches genre data available for a -specific- movie
    const renderMovie = () => {                 
        return filteredMovies.filter(filteredCheckedIfAvailable).map((movie) => {
            const enrichedGenres: Array<Genre> = [];
            const availableGenres: Array<Genre> = movie.genre_ids.reduce((acc: Array<Genre>, currentGenreId: number) => {
                const genre = genres.find(genre => genre.id === currentGenreId);
                if(genre) {
                    acc.push(genre);
                }
                return acc;
            }, enrichedGenres);
            
            return <MovieComponent key={movie.id} genres={availableGenres} movie={movie}  />
        } )
    }

    const isChecked = (genreId: number): boolean => { 
        return checkedGenres.includes(genreId);
    };

    const handleChange = (event: any) => { 
        const { target } = event;
        const value = parseInt(target.value);
        if(target.checked) {
            if(!checkedGenres.includes(value)) {
                setCheckedGenres([...checkedGenres, ...[value]]);
            }
        } else {
            setCheckedGenres(checkedGenres.filter(id => id !== value));
        }
    }

    return (
        <div className={'movies'}>
            {showNumberOfMovies()}
            <FilterComponent isChecked={isChecked} availableGenres={availableGenres} handleChange={handleChange} onReset={setReset} />
            <div>
                {renderMovie()}
            </div>
        </div>
    );
}

export default Movies;