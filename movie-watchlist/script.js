// Joseph Garcia
// SBA 316 - The Document Object Model

// -----------------------------
// Part 1 - Cache DOM Elements
// -----------------------------

const movieForm = document.getElementById("movie-form");
const movieList = document.getElementById("movie-list");
const movieTemplate = document.getElementById("movie-template");

const movieTitleInput = document.querySelector("#movie-title");
const movieGenreInput = document.querySelector("#movie-genre");
const movieRatingInput = document.querySelector("#movie-rating");
const movieFilter = document.querySelector("#movie-filter");
const movieCount = document.querySelector("#movie-count");
const titleError = document.querySelector("#title-error");
const ratingError = document.querySelector("#rating-error");

// -----------------------------
// Part 2 - Starter Movie Data
// -----------------------------

const movies = [
  {
    title: "Interstellar",
    genre: "Sci-Fi",
    rating: 10,
    watched: false,
  },
  {
    title: "Shrek",
    genre: "Comedy",
    rating: 9,
    watched: true,
  },
  {
    title: "Spider-Man 2",
    genre: "Action",
    rating: 9,
    watched: false,
  },
];

// -----------------------------
// Part 3 - Create Movie Cards
// -----------------------------

function createMovieCard(movie) {
  const movieCardClone = movieTemplate.content.cloneNode(true);

  const movieCard = movieCardClone.querySelector(".movie-card");

  // Parent-child-sibling navigation
  const movieTitle = movieCard.firstElementChild;
  const movieGenre = movieTitle.nextElementSibling;
  const movieRating = movieGenre.nextElementSibling;

  movieTitle.textContent = movie.title;
  movieGenre.textContent = `Genre: ${movie.genre}`;
  movieRating.textContent = `Rating: ${movie.rating}/10`;

  movieCard.setAttribute("data-title", movie.title.toLowerCase());
  movieCard.setAttribute(
    "data-status",
    movie.watched ? "watched" : "unwatched"
  );

  if (movie.watched) {
    movieCard.classList.add("watched");

    const watchedButton = movieCard.querySelector(".watched-btn");

    watchedButton.textContent = "Mark Unwatched";
    watchedButton.setAttribute(
      "title",
      "Mark this movie as not watched"
    );
  }

  movieList.prepend(movieCardClone);

  updateMovieCount();
  updateEmptyMessage();
}

// -----------------------------
// Part 4 - Display Starter Movies
// -----------------------------

movies.forEach(function (movie) {
  createMovieCard(movie);
});

// -----------------------------
// Part 5 - Update Movie Count
// -----------------------------

function updateMovieCount() {
  const movieCards = document.querySelectorAll(".movie-card");

  movieCount.textContent = `Movies: ${movieCards.length}`;
}

// -----------------------------
// Part 6 - Empty List Message
// -----------------------------

function updateEmptyMessage() {
  const movieCards = document.querySelectorAll(".movie-card");
  const currentEmptyMessage = document.querySelector("#empty-message");

  if (movieCards.length === 0 && !currentEmptyMessage) {
    const emptyMessage = document.createElement("p");

    emptyMessage.id = "empty-message";
    emptyMessage.textContent =
      "Your movie watchlist is empty. Add a movie above.";

    movieList.appendChild(emptyMessage);
  }

  if (movieCards.length > 0 && currentEmptyMessage) {
    currentEmptyMessage.remove();
  }
}

// -----------------------------
// Part 7 - Validate Form Inputs
// -----------------------------

function validateMovieTitle() {
  const titleValue = movieTitleInput.value.trim();

  if (titleValue.length < 2) {
    titleError.textContent =
      "The movie title must contain at least 2 characters.";

    movieTitleInput.classList.add("invalid");
    movieTitleInput.setAttribute("aria-invalid", "true");

    return false;
  }

  titleError.textContent = "";
  movieTitleInput.classList.remove("invalid");
  movieTitleInput.setAttribute("aria-invalid", "false");

  return true;
}

function validateMovieRating() {
  const ratingValue = Number(movieRatingInput.value);

  if (
    movieRatingInput.value === "" ||
    ratingValue < 1 ||
    ratingValue > 10
  ) {
    ratingError.textContent =
      "The rating must be between 1 and 10.";

    movieRatingInput.classList.add("invalid");
    movieRatingInput.setAttribute("aria-invalid", "true");

    return false;
  }

  ratingError.textContent = "";
  movieRatingInput.classList.remove("invalid");
  movieRatingInput.setAttribute("aria-invalid", "false");

  return true;
}

// -----------------------------
// Part 8 - Handle Form Submission
// -----------------------------

function handleMovieSubmit(event) {
  event.preventDefault();

  const titleIsValid = validateMovieTitle();
  const ratingIsValid = validateMovieRating();

  if (!titleIsValid || !ratingIsValid) {
    window.alert("Please correct the form before adding the movie.");
    return;
  }

  const newMovie = {
    title: movieTitleInput.value.trim(),
    genre: movieGenreInput.value,
    rating: Number(movieRatingInput.value),
    watched: false,
  };

  createMovieCard(newMovie);

  movieForm.reset();

  titleError.textContent = "";
  ratingError.textContent = "";

  movieTitleInput.classList.remove("invalid");
  movieRatingInput.classList.remove("invalid");

  movieTitleInput.focus();

  window.alert(`${newMovie.title} was added to your watchlist!`);
}
movieForm.addEventListener("submit", handleMovieSubmit);

movieTitleInput.addEventListener("blur", validateMovieTitle);

movieRatingInput.addEventListener("blur", validateMovieRating);

movieList.addEventListener("click", handleMovieClick);

movieFilter.addEventListener("change", applyMovieFilter);

movieList.addEventListener("click", handleMovieClick);

movieFilter.addEventListener("change", applyMovieFilter);

// -----------------------------
// Part 9 - Handle Movie Buttons
// -----------------------------

function handleMovieClick(event) {
  const clickedElement = event.target;

  if (
    !clickedElement.classList.contains("watched-btn") &&
    !clickedElement.classList.contains("remove-btn")
  ) {
    return;
  }

  const buttonContainer = clickedElement.parentNode;
  const movieCard = buttonContainer.parentNode;

  if (clickedElement.classList.contains("watched-btn")) {
    toggleWatchedMovie(movieCard, clickedElement);
  }

  if (clickedElement.classList.contains("remove-btn")) {
    removeMovie(movieCard);
  }
}

function toggleWatchedMovie(movieCard, watchedButton) {
  movieCard.classList.toggle("watched");

  const isWatched = movieCard.classList.contains("watched");

  if (isWatched) {
    movieCard.setAttribute("data-status", "watched");
    watchedButton.textContent = "Mark Unwatched";
    watchedButton.setAttribute(
      "title",
      "Mark this movie as not watched"
    );
  } else {
    movieCard.setAttribute("data-status", "unwatched");
    watchedButton.textContent = "Mark Watched";
    watchedButton.setAttribute(
      "title",
      "Mark this movie as watched"
    );
  }

  applyMovieFilter();
}

function removeMovie(movieCard) {
  const movieTitle = movieCard.firstElementChild.textContent;

  const userConfirmed = window.confirm(
    `Are you sure you want to remove ${movieTitle}?`
  );

  if (userConfirmed) {
    movieCard.remove();

    updateMovieCount();
    updateEmptyMessage();
  }
}

// -----------------------------
// Part 10 - Filter Movies
// -----------------------------

function applyMovieFilter() {
  const selectedFilter = movieFilter.value;

  const movieCards = document.querySelectorAll(".movie-card");

  movieCards.forEach(function (card) {
    const movieStatus = card.getAttribute("data-status");

    if (selectedFilter === "all") {
      card.style.display = "block";
    } else if (selectedFilter === movieStatus) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
// -----------------------------
// Part 11 - BOM Information
// -----------------------------

console.log(`Browser window width: ${window.innerWidth}px`);
console.log(`Current page URL: ${window.location.href}`);