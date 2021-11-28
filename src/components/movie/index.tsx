import React from 'react';
import {MovieProps} from './interface';

/**
 * Renders a movie item. 
 * @param props. {@see MoviesProps}
 * @author Jay Martin
 */
const Movie: React.FunctionComponent<MovieProps> = (props) => { 

    // Spread the props
    const { title, popularity, overview, vote_average, poster_path } = props.movie;
    
    // return the results
    return (
        <div className={'movie'}>
             <img className={'movie-image'} src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={`${title} image`} />   
             <div className={'movie-contents'}>
                <div className={'movie-title'}>
                    <h2 >{title}</h2>
                </div>                            
                <div className={'movie-content'}>
                    <p >
                        {overview}
                    </p>                        
                </div>
                <div className={'movie-meta'}>
                    <p>Rating: {vote_average}/10</p>
                    <p>Popularity: {popularity}</p>
                    <div className={'genres'}>
                        {props.genres.map(genre => <div>{genre.name}</div>)}
                    </div>
                </div>
             </div>            
        </div>
    );
}

export default Movie;