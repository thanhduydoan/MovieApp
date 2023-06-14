import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
import requests from '../../requests';
import MovieList from '../../components/MovieList/MovieList';
function Browse() {
	return (
		<div className="app">
			<Navbar/>
			<Banner />
			<MovieList title="Original" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
			<MovieList title="Xu hướng " fetchUrl={requests.fetchTrending}/>
			<MovieList title="Xếp hạng cao" fetchUrl={requests.fetchTopRated}/>
			<MovieList title="Hành động" fetchUrl={requests.fetchActionMovies}/>
			<MovieList title="Hài" fetchUrl={requests.fetchComedyMovies}/>
			<MovieList title="Kinh dị" fetchUrl={requests.fetchHorrorMovies}/>
			<MovieList title="Lãng mạn" fetchUrl={requests.fetchRomanceMovies}/>
			<MovieList title="Tài liệu" fetchUrl={requests.fetchDocumentaries}/>
		</div>
	);
}

export default Browse;

