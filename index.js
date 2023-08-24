const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const moviesDiv = document.getElementById("movies");

let movieArray = [];

const displayMovies = function () {
  let html = "";

  for (const movie of movieArray) {
    html += `
      <div>
        <img src="${movie.Poster}" alt="movie-poster" />
        <div>
          <h2>${movie.Title}</h2>
          <ul>
            <li>${movie.Runtime}</li>
            <li>${movie.Genre}</li>
            <li><button>Watchlist</button></li>
          </ul>
          <p>${movie.Plot}</p>
        </div>
        <br />
      </div>
    `;

    console.log(movie);
  }

  moviesDiv.innerHTML = html;
};

const fetchMovies = async function () {
  if (searchInput.value.trim() === "") {
    console.log("Empty...");
  } else {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=aedabea0&s=${searchInput.value}`
    );
    const movies = await response.json();

    movieArray = [];

    for (const movie of movies.Search) {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=aedabea0&t=${movie.Title}`
      );
      const titles = await response.json();

      movieArray.push(titles);
    }

    displayMovies();
  }
};

searchBtn.addEventListener("click", fetchMovies);
