import React from 'react';
import { Movie as MoviesProps } from '../../interface';

const Movie: React.FunctionComponent<MoviesProps> = (props) => { 

    const { title, popularity, overview, vote_average, poster_path } = props;

    return (
        <div className={'movie'}>
            <div className={'movie-title'}>
                <h2 >{title}</h2>
            </div>
            <img className={'movie-image'} src={poster_path} alt={`${title} image`} />                      
            <div className={'movie-content'}>
                <p >
                    {overview}
                </p>
            </div>
            <div className={'movie-meta'}>
                <p>Rating: {vote_average}/10</p>
                <p>Popularity: {popularity}</p>
            </div>
        </div>
    );
}

export default Movie;