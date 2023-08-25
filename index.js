const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const moviesDiv = document.getElementById("movies");

let movieArray = [];

const displayMovies = function () {
  moviesDiv.innerHTML = "";
  let html = "";

  for (const movie of movieArray) {
    html += `
      <div class="movie">
      <img class="movie-poster" src="${movie.Poster}" onerror="this.src='./images/icon.svg'" alt="movie-poster" />
        <div>
          <h2>${movie.Title}</h2>
          <ul>
            <li>${movie.Runtime}</li>
            <li>${movie.Genre}</li>
            <li><button class="add-to-watchlist">+</button>Watchlist</li>
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

  if (searchInput.value.trim() === "") {
    console.log("Empty...");
  } else {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=aedabea0&s=${searchInput.value}`
    );
    const movies = await response.json();

    console.log(movies);

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

movies.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-watchlist")) {
    console.log(e.target);
  }
});
