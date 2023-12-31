//Tạo 1 biến lưu trữ các đường dẫn API
const requests = {
    fetchTrending: `https://api.themoviedb.org/3/trending/all/week?api_key=c0cf4110241b44ed8625fe1ae1805076&language=en-US`,
    fetchNetflixOriginals: `https://api.themoviedb.org/3/discover/tv?api_key=c0cf4110241b44ed8625fe1ae1805076&with_network=123`,
    fetchTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=c0cf4110241b44ed8625fe1ae1805076&language=en-US`,
    fetchActionMovies: `https://api.themoviedb.org/3/discover/movie?api_key=c0cf4110241b44ed8625fe1ae1805076&with_genres=28`,
    fetchComedyMovies: `https://api.themoviedb.org/3/discover/movie?api_key=c0cf4110241b44ed8625fe1ae1805076&with_genres=35`,
    fetchHorrorMovies: `https://api.themoviedb.org/3/discover/movie?api_key=c0cf4110241b44ed8625fe1ae1805076&with_genres=27`,
    fetchRomanceMovies: `https://api.themoviedb.org/3/discover/movie?api_key=c0cf4110241b44ed8625fe1ae1805076&with_genres=10749`,
    fetchDocumentaries: `https://api.themoviedb.org/3/discover/movie?api_key=c0cf4110241b44ed8625fe1ae1805076&with_genres=99`,
    fetchSearch: `https://api.themoviedb.org/3/search/movie?api_key=c0cf4110241b44ed8625fe1ae1805076&language=en-US`,
}
export default requests;