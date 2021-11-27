import { fetchGenres, fetchMovies } from "./api"; // you may add functionality to these functions, but please use them
import "./index.css"; // have a look at this file and feel free to use the classes

import Title from './components/title';
import Movies from './components/movies';

export default function App() {
  return (
    <div>
        <Title text={"Now Playing"}/>
        <Movies movies={[]}/>
    </div>
  );
}
