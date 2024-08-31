import axios from "axios";
import React from "react";
import PropTypes from "prop-types";

export default class ListMovie extends React.Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    this.fecthMovies();
  }

  componentDidUpdate(prevProps) {
    if (this.props.search !== prevProps.search) {
      if (!this.props.search) {
        this.fecthMovies();
        return;
      }

      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=d64465f835d027114fd469afd4e2de72&query=${this.props.search}`
        )
        .then((response) => {
          this.setState({
            movies: response.data.results,
          });
        });
    }
  }

  componentWillUnmount() {
    this.setState({
      movies: [],
    });
  }

  fecthMovies() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=d64465f835d027114fd469afd4e2de72"
      )
      .then((response) => {
        this.setState({
          movies: response.data.results,
        });
      });
  }

  render() {
    return (
      <div className="grid grid-cols-5 gap-12 px-5">
        {this.state.movies.map((movie) => (
          <div
            className="relative group rounded-lg dark:text-gray-200 text-gray-200 overflow-hidden z-0 hover:scale-110 transition-transform"
            key={movie.id}
          >
            <img
              alt={movie.title}
              className="rounded-md"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
            <div className="absolute top-0 left-0 transition-colors bg-black/30 group-hover:bg-transparent z-10 w-full h-full" />
            <div className="p-2 absolute bottom-0 bg-gradient-to-t z-20 from-black to-transparent transition-all">
              <h5 className="text-2xl shadow-lg font-semibold">{movie.title}</h5>
              <p className="transition-all shadow-lg group-hover:line-clamp-none line-clamp-1 overflow-hidden">
                {movie.overview.slice(0, 120)}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

ListMovie.propTypes = {
  search: PropTypes.string,
};
