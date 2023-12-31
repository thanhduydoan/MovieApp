import React from "react";
import YouTube from "react-youtube";
import "./MovieDetail.css";
// các thuộc tính của video
const opts = {
  height: "400",
  width: "100%",
  playerVars: {
    autoplay: 0,
  },
};

const MovieDetail = ({ movieData, movieTrailer }) => {
  // movieData và movieTrailer được chuyển vào từ component cha.
  const {
    release_date,
    title,
    name,
    overview,
    vote_average,
    backdrop_path,
    poster_path,
  } = movieData;

  //movieData được chuyển vào đúng, nó trả về một div rỗng.
  if (!movieData) {
    return <div></div>;
  }

  return (
    <div className="movieDetailContainer">
      <div className="movieDetailDescription">
        <h2>{name || title}</h2>
        <hr />
        <h4>Release Date: {release_date}</h4>
        <h4>Vote: {vote_average}/10</h4>
        <p>{overview}</p>
      </div>
      <div className="movieDetailTrailer">
        {/* hiển thị video nếu có movieTrailer  */}
        {movieTrailer && <YouTube videoId={movieTrailer} opts={opts} />}
        {/* hiển thị poster nếu ko có movieTrailer */}
        {!movieTrailer && (
          <img
            src={`https://image.tmdb.org/t/p/original${
              backdrop_path || poster_path
            }`}
            alt={name}
            className="trailerPoster"
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
