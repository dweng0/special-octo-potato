import React from 'react';
import { Movie as MoviesProps } from '../../interface';

const Movie: React.FunctionComponent<MoviesProps> = (props) => { 

    const { title, popularity, overview, vote_average } = props;

    return (
        <div>
          <h2>{title}</h2>
          <p>
            {overview}
          </p>
          <p>Rating: {vote_average}/10</p>
          <p>Popularity: {popularity}</p>
        </div>
    );
}

export default Movie;