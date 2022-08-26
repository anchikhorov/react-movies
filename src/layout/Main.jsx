import React from "react";
import { Movies } from "../components/Movies";
import { Preloader } from "../components/Preloader";
import { Search } from "../components/Search";

const API_KEY = process.env.REACT_APP_API_KEY

class Main extends React.Component {

  state = {
    movies: [],
    loading: false,
  };

  componentDidMount() {
    this.searchMovies("", "matrix");
  }

  searchMovies = (type, str) => {
    this.setState({ loading: true });
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&type=${type}&s=${str}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          this.setState({ movies: data.Search, loading: false , error: ''});
        } else {
          this.setState({ error: data.Error, loading: false });
        }
      });
  };

  render() {
    const { movies, loading, error } = this.state;
    return (
      <main className="container content">
        <Search searchMovies={this.searchMovies} />
        {loading ? <Preloader /> : (error ? error : <Movies movies={movies} />)}
      </main>
    );
  }
}

export { Main };
