import React, {useState} from 'react';
import { MoviesProps } from '../movies/interface';
import MovieComponent from '../movie';
import { Movie } from '../../interface';

/**
 * Movies component renders the list of movies, handles filtering
 * @param MovieProps, an array of Movie {@see Movie} {@see MovieProps}
 * @Author Jay Martin
 */
const Movies: React.FunctionComponent<MoviesProps> = ({movies}) => { 

    // Array methods
    const byPopularity = (movieA: Movie, movieB: Movie) => (movieA.popularity - movieB.popularity);
 
    /**
     * Handling of state
     */
    const [filteredMovies, setFilteredMovies] = useState(movies.sort(byPopularity));
    const [availableGenres, setAvailableGenres] = useState([]);
    
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

    return (
        <div className={'movies'}>
            {showNumberOfMovies()}
            <div>
                {filteredMovies.map(MovieComponent)}
            </div>
        </div>
    );
}

export default Movies;