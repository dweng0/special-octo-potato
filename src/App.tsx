import { useState, useEffect} from 'react';
import { fetchGenres, fetchMovies } from "./api"; // you may add functionality to these functions, but please use them
import "./index.css"; // have a look at this file and feel free to use the classes
import { Movie } from './interface';
import Title from './components/title';
import Movies from './components/movies';

export default function App() {

    const [moviesList, setMoviesList] = useState<Array<Movie>>([]);

    const getMoviesFromJSON = async () => {
        const response = await fetchMovies();
        const data = await response.json();
        return data;
    }

    useEffect(() => {
       const fetchResponseData = async () => { 
           const movies = await getMoviesFromJSON();
           setMoviesList(movies);
       }
       fetchResponseData();
    }, [moviesList, setMoviesList]);
    
    return (
        <div className={'container'}>
            <Title text={"Now Playing"}/>
            <Movies movies={moviesList}/>       
        </div>
    );
}
