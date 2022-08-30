import React, {useState, useEffect} from "react";
import { Movies } from "../components/Movies";
import { Preloader } from "../components/Preloader";
import { Search } from "../components/Search";

const API_KEY = process.env.REACT_APP_API_KEY

function Main(){
  const [state, setState] = useState(
    {
      movies: [],
      loading: false,
      error: '',
    }
  
  )

  const searchMovies = (type, str) => {
    setState({...state, loading: true });
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&type=${type}&s=${str}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          setState({ ...state, movies: data.Search, loading: false , error: ''});
        } else {
          setState({ ...state, error: data.Error, loading: false });
        }
      }).catch(err => {
        console.error(err)
        setState({...state, error: err, loading: false });
    });
  };

    const { movies, loading, error } = state;
    useEffect(() => {
      searchMovies("", "matrix")
    })
    return (
      <main className="container content">
        <Search searchMovies={searchMovies} />
        {loading ? <Preloader /> : (error ? error : <Movies movies={movies} />)}
      </main>
    );
}

export { Main };
