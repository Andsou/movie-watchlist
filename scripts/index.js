const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const moviesDiv = document.getElementById("movies");
const movies = document.getElementById("movie-watchlist");

let movieArray = [];
let watchList = JSON.parse(localStorage.getItem("movies")) || [];

const displayMovies = function () {
  moviesDiv.innerHTML = "";
  let html = "";

  for (const movie of movieArray) {
    const isMovieInWatchList = watchList.some(
      (item) => item.imdbID === movie.imdbID
    );

    html += `
      <div class="movie">
      <img class="movie-poster" src="${
        movie.Poster
      }" onerror="this.src='./images/icon.svg'" alt="movie-poster" />
        <div>
          <h2>${movie.Title}</h2>
          <ul>
            <li>${movie.Runtime}</li>
            <li>${movie.Genre}</li>
            <li>
            <button class="add-to-watchlist" data-movieid="${movie.imdbID}" ${
      isMovieInWatchList ? "disabled" : ""
    }>+</button>
            </li>
            <li>Watchlist</li>
          </ul>
          <p class="movie-plot">${movie.Plot}</p>
        </div>
      </div>
    `;
  }

  moviesDiv.innerHTML = html;
};

const fetchMovies = async function () {
  movieArray = [];
  try {
    if (searchInput.value.trim() === "") {
      moviesDiv.textContent = "Could not find movie...";
    } else {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=aedabea0&s=${searchInput.value}`
      );
      const movies = await response.json();

      for (const movie of movies.Search) {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=aedabea0&i=${movie.imdbID}`
        );
        const titles = await response.json();

        movieArray.push(titles);
      }

      console.log(movieArray);
      displayMovies();
    }
  } catch (error) {
    moviesDiv.textContent = "Could not find movie...";
  }
};

const addMovieToWatchList = function (movie) {
  // let watchList = JSON.parse(localStorage.getItem("movies")) || [];

  if (!watchList.some((item) => item.imdbID === movie.imdbID)) {
    watchList.push(movie);
  }

  localStorage.setItem("movies", JSON.stringify(watchList));
};

moviesDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-watchlist")) {
    const movie = movieArray.find(
      (movie) => movie.imdbID === e.target.dataset.movieid
    );
    document.querySelector(`[data-movieid="${movie.imdbID}"]`).disabled = true;
    addMovieToWatchList(movie);
  }
});

searchBtn.addEventListener("click", fetchMovies);
