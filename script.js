const API_KEY = '6af74714';
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const movieDetails = document.getElementById('movieDetails');
const errorMessage = document.getElementById('errorMessage');

const moviePoster = document.getElementById('moviePoster');
const movieTitle = document.getElementById('movieTitle');
const movieYear = document.getElementById('movieYear');
const movieGenre = document.getElementById('movieGenre');
const movieDirector = document.getElementById('movieDirector');

document.addEventListener('DOMContentLoaded', () => {
    const lastSearch = localStorage.getItem('lastMovieSearch');
    if (lastSearch) {
        searchInput.value = lastSearch;
        fetchMovie(lastSearch);
    }
});

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMovie(query);
    }
});

async function fetchMovie(query) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "True") {
            localStorage.setItem('lastMovieSearch', query);
            
            movieTitle.textContent = data.Title;
            movieYear.textContent = data.Year;
            movieGenre.textContent = data.Genre;
            movieDirector.textContent = data.Director;
            moviePoster.src = data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/200x300?text=No+Poster';

            errorMessage.classList.add('hidden');
            movieDetails.classList.remove('hidden');
        } else {
            showError(data.Error);
        }
    } catch (error) {
        showError("An error occurred while fetching the movie.");
    }
}

function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.classList.remove('hidden');
    movieDetails.classList.add('hidden');
}