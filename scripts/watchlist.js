const watchlistDiv = document.getElementById("movie-watchlist");

let watchList = JSON.parse(localStorage.getItem("movies")) || [];

watchlistDiv.addEventListener("click", (e) => {
  if (e.target.dataset.movieid) {
    deleteMovie(e.target.dataset.movieid);
  }
});

const displayWatchlist = function () {
  let html = "";

  if (watchList.length === 0) {
    html = "<p>Your watchlist is empty.</p>";
  } else {
    for (const movie of watchList) {
      html += `
        <div class="movie">
        <img class="movie-poster" src="${movie.Poster}" onerror="this.src='./images/icon.svg'" alt="movie-poster" />
          <div>
            <h2>${movie.Title}</h2>
            <ul>
              <li>${movie.Runtime}</li>
              <li>${movie.Genre}</li>
              <li><button class="add-to-watchlist" data-movieid="${movie.imdbID}">+</button>Remove</li>
            </ul>
            <p class="movie-plot">${movie.Plot}</p>
          </div>
        </div>
        `;
    }
  }

  watchlistDiv.innerHTML = html;
};

const deleteMovie = function (movieId) {
  const targetIndex = watchList.findIndex((movie) => movie.imdbID === movieId);

  if (targetIndex !== -1) {
    watchList.splice(targetIndex, 1);
  }

  localStorage.setItem("movies", JSON.stringify(watchList));
  displayWatchlist();
};

displayWatchlist();
