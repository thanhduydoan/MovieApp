import React, { useEffect, useState } from "react";
import movieTrailer from "movie-trailer";
import MovieDetail from "../MovieDetail/MovieDetail";
import "./MovieList.css";

//Các props của component bao gồm title: tiêu đề của danh sách phim.
//fetchUrl: URL để truy vấn API để lấy danh sách phim.
//isLargeRow: một boolean để hiển thị kích thước poster lớn hơn.
function MovieLists({ title, fetchUrl, isLargeRow }) {
  //Danh sách các phim
  const [movies, setMovies] = useState([]);
  //Phim được chọn để xem trailer
  const [selectingMovie, setSelectingMovie] = useState(null);
  //ID của trailer tương ứng
  const [trailerId, setTralerId] = useState("");
  // lấy danh sách phim từ API khi component được mount hoặc fetchUrl thay đổi.
  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch(fetchUrl);
      const data = await request.json();
      setMovies(data.results);
      return request;
    }
    // async function fetchData() {
    //   const request = await fetch(fetchUrl);
    //   const data = await request.json();
    //   setMovies(data.results);
    //   return request;
    // }
    fetchData();
  }, [fetchUrl]);
  //Khi click vào poster, phim tương ứng sẽ được chọn để xem trailer
  const handleClick = async (movie) => {
    setSelectingMovie(movie);
    //lấy URL của trailer tương ứng và lưu trữ trailerId vào state.
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
            className={`movieList__poster ${isLargeRow && "movieList__posterLarge"
              }`}
            src={`https://image.tmdb.org/t/p/original${isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* Khi một poster được click, nếu trailerId đã được lưu trữ, thì component MovieDetail sẽ được hiển thị để xem trailer. */}
      <div className="movieList__youtube">
        {!!selectingMovie && !!trailerId && (
          <MovieDetail movieData={selectingMovie} movieTrailer={trailerId} />
        )}
      </div>
    </div>
  );
}

export default MovieLists;
