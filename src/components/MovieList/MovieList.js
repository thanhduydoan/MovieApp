import React, { useEffect, useState } from "react";
import movieTrailer from "movie-trailer";
import MovieDetail from "../MovieDetail/MovieDetail";
import "./MovieList.css";

function MovieLists({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [selectingMovie, setSelectingMovie] = useState(null);

  const [trailerId, setTralerId] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(fetchUrl);
      const data = await request.json();
      setMovies(data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = async (movie) => {
    setSelectingMovie(movie);
    const url = await movieTrailer(movie?.original_name || movie?.title || "");
    if (url) {
      const urlParams = new URLSearchParams(new URL(url).search);
      setTralerId(urlParams.get("v"));
    }
  };

  return (
    <div className="movieList">
      <h1>{title}</h1>
      <div className="movieList__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`movieList__poster ${
              isLargeRow && "movieList__posterLarge"
            }`}
            src={`https://image.tmdb.org/t/p/original${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      <div className="movieList__youtube">
        {!!selectingMovie && !!trailerId && (
          <MovieDetail movieData={selectingMovie} movieTrailer={trailerId} />
        )}
      </div>
    </div>
  );
}

export default MovieLists;
