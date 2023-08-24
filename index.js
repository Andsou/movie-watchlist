const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

const fetchMovies = function () {
  if (searchInput.value.trim() === "") {
    console.log("Empty...");
  } else {
    fetch(`http://www.omdbapi.com/?apikey=aedabea0&t=${searchInput.value}`)
      .then((response) => response.json())
      .then((movies) => console.log(movies));
    console.log(searchInput.value);
  }
};

searchBtn.addEventListener("click", fetchMovies);
