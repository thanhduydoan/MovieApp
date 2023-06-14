import React, { useEffect, useState } from 'react';
import './Banner.css';

const Banner = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/discover/tv?api_key=0469acb94fe75afee08ef1bcd67c785d&with_network=123');
        const data = await response.json();
		// lấy ngẫu nhiên một bộ phim trong array
        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length - 1);
          setData(data.results[randomIndex]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <header
			className="banner"
			style={{
				backgroundSize: "cover",
				backgroundImage: `url("https://image.tmdb.org/t/p/original/${data?.backdrop_path}")`,
				backgroundPosition: "center center",
			}}>
			<div className="banner__contents">
				<h1 className="banner__title">
					{data?.title || data?.name || data.original_name}
				</h1>
				<div className="banner__buttons">
					<button className="banner__button">Play</button>
					<button className="banner__button">My List</button>
				</div>
				<h1 className="banner__description">
					{data.overview}
				</h1>
			</div>
			<div className="banner__fadeBottom" />
		</header>
  );
};

export default Banner;