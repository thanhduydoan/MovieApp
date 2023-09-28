import React, { useState, useEffect } from "react";
import MovieDetail from "../MovieDetail/MovieDetail";
import "./SearchResult.css";
import requests from '../../requests'
const SearchResult = ({ search }) => {
  // khai báo states
  const [movies, setMovies] = useState([]);
  const [videoTrailer, setVideoTrailer] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  // endpoint của search.
  const url = `${requests.fetchSearch}&query=${search}`;

  // effect tìm movie. Nếu ko search thì setMovies để rỗng
  useEffect(() => {
    async function fetchSearch() {
      const request = await fetch(url)
      const data = await request.json()
      setMovies(data.results);
      return request;
    };

    if (search) {
      fetchSearch();
    } else {
      setMovies([]);
    }
  }, [url, search]);

  // useEffect để fetch trailer từ selectedMovie
  useEffect(() => {
    async function fetchTrailer(movie) {
      if (movie) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=c0cf4110241b44ed8625fe1ae1805076&language=en-US`
        ); // Sửa đường dẫn fetch API
        const data = await response.json();
        // Lọc ra các video có site là YouTube và type là Trailer hoặc Teaser
        const trailers = data.results.filter(
          (movie) =>
            movie.site === "YouTube" &&
            (movie.type === "Teaser" || movie.type === "Trailer")
        );
        console.log(trailers);
        // Lấy key của video Trailer đầu tiên hoặc null nếu không có
        if (trailers.length > 0) {
          const trailer = trailers.find(
            (video) => video.type === "Trailer" || video.key
          );
          if (trailer) {
            setVideoTrailer(trailer.key);
            console.log(trailer.key);
          } else {
            setVideoTrailer(null);
          }
        } else {
          setVideoTrailer(null);
        }
      }
    }

    // Fetch trailer từ selectedMovie
    fetchTrailer(selectedMovie);
  }, [selectedMovie]);

  // Xử lý sự kiện khi người dùng click vào poster để xem trailer
  const handleClick = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setVideoTrailer(null);
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };

  return (
    <div className="searchResult">
      <h2 className="searchTitle">Search Result</h2>
      <div className="moviePosterContainer">
        {/* hiển thị trailer */}
        {selectedMovie && videoTrailer && (
          <MovieDetail movieData={selectedMovie} movieTrailer={videoTrailer} />
        )}
        {selectedMovie && !videoTrailer && (
          <MovieDetail movieData={selectedMovie} />
        )}
      </div>
      <div className="row_posters searchResultContainer">
        {movies.map((movie) => {
          return (
            <div key={movie.id}>
              <>
                <img
                  onClick={() => handleClick(movie)}
                  className="searchMoviePoster"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.name}
                />
              </>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResult;
