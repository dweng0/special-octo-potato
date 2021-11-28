import { useState, useEffect} from 'react';
import { fetchGenres, fetchMovies } from "./api"; // you may add functionality to these functions, but please use them
import "./index.css"; // have a look at this file and feel free to use the classes
import { Movie, Genre } from './interface';
import Title from './components/title';
import Movies from './components/movies';

export default function App() {

    const [moviesList, setMoviesList] = useState<Array<Movie>>([]);
    const [genreList, setGenreList] = useState<Array<Genre>>([]);

    useEffect(() => {        
       const fetchMovieData = async () => { 
           const movies = await getJSON(fetchMovies);
           setMoviesList(movies);         
       }
       fetchMovieData();

    }, [setMoviesList]);

    useEffect(() => {        
        const fetchGenreData = async () => { 
            const genres = await getJSON(fetchGenres);
            setGenreList(genres);
        }
        fetchGenreData();
 
     }, [setGenreList]);
     
    // generic fetcher that extracts the json from the API with each fetch api passed in as required
    const getJSON = async (fetch: () => Promise<Response>) => {
        const response = await fetch();
        const data = await response.json();
        return data;
    }
    
    return (
        <div className={'container'}>
            <Title text={"Now Playing"}/>
            <Movies movies={moviesList} genres={genreList} />       
        </div>
    );
}
