const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const displayResults = document.querySelector(".display");

const apiKey = "dfe6fabe";
const omdbApiUrl = "http://www.omdbapi.com/";

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== "") {
    const searchUrl = `${omdbApiUrl}?apikey=${apiKey}&s=${encodeURIComponent(
      searchTerm
    )}`;
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        displaySearchResults(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
});

function displaySearchResults(data) {
  displayResults.innerHTML = "";

  if (data.Error) {
    displayResults.innerHTML = `<p>${data.Error}</p>`;
  } else if (data.Search && data.Search.length > 0) {
    data.Search.forEach((movie) => {
      const imdbID = movie.imdbID;
      const movieUrl = `${omdbApiUrl}?apikey=${apiKey}&i=${imdbID}`;

      fetch(movieUrl)
        .then((response) => response.json())
        .then((movieData) => {
          displayMovieDetails(movieData);
        })
        .catch((error) =>
          console.error("Error fetching movie details:", error)
        );
    });
  } else {
    displayResults.innerHTML = "<p>No results found.</p>";
  }
}

function displayMovieDetails(movieData) {
  const movieElement = document.createElement("div");
  movieElement.classList.add("card");

  movieElement.innerHTML = `
        <div class="img"><img src="${movieData.Poster}" alt="poster" class="poster"></div>
        <div class="details">
            <div class="title"><h3>${movieData.Title}</h3></div>
            <div class="year">YEAR: <span>${movieData.Year}</span></div>
            <div class="rated">RATED: <span>${movieData.Rated}</span></div>
            <div class="released">RELEASED: <span>${movieData.Released}</span></div>
            <div class="runtime">RUNTIME: <span>${movieData.Runtime}</span></div>
            <div class="genre">GENRE: <span>${movieData.Genre}</span></div>
            <div class="director">DIRECTOR: <span>${movieData.Director}</span></div>
            <div class="writer">WRITER: <span>${movieData.Writer}</span></div>
            <div class="actors">ACTORS: <span>${movieData.Actors}</span></div>
            <div class="plot">PLOT: <span>${movieData.Plot}</span></div>
        </div>
    `;

  displayResults.appendChild(movieElement);
}