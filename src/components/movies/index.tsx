import React, {useState} from 'react';
import { MoviesProps } from '../movies/interface';
import Movie from '../movie';

const Movies: React.FunctionComponent<MoviesProps> = ({movies}) => { 

    const [filteredMovies, setFilteredMovies] = useState(movies);


    const showNumberOfMovies = () => {         
        if(movies && movies.length > 0) { 
            const isSingular = (movies.length === 1)
            return <div>Showing {movies.length} {(isSingular) ? "movie" : "movies" }</div>
        }
        return null;
    }

    return (
        <div className={'movies'}>
            {showNumberOfMovies()}
            <div>
                {filteredMovies.map(Movie)}
            </div>
        </div>
    );
}

export default Movies;