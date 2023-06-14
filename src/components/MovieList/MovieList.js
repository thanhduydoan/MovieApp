import React, { useEffect, useState } from "react";
import "./MovieList.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import MovieDetail from "../MovieDetail/MovieDetail";


function MovieList({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState("");
	useEffect(() => {
		async function fetchData() {
			const request = await fetch(fetchUrl)
            const data = await request.json()
			setMovies(data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]);

	const opts = {
		height: "400",
		width: "100%",
		playerVars: {
			autoplay: 0,
		},
	};
	const handleClick = (movie) => {
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			movieTrailer(movie?.original_name || movie?.title || "")
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get("v"));
				})
				.catch((error) => console.log(error));
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
						className={`movieList__poster ${isLargeRow && "movieList__posterLarge"}`}
						src={`https://image.tmdb.org/t/p/original${
							isLargeRow ? movie.poster_path : movie.backdrop_path
						}`}
						alt={movie.name}
					/>
				))}
			</div>
			<div className="movieList__youtube">
				{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
				{/* {movies && trailerUrl && (
        <MovieDetail movieData={movies} movieTrailer={trailerUrl} />
      )}
      {movies && !trailerUrl && (
        <MovieDetail movieData={movies} />
      )} */}
			</div>
		</div>
	);
}

export default MovieList;
