// Joseph Garcia
// SBA 316 - The Document Object Model

import { movies } from "./modules/movieData.js";
import {
  validateMovieTitle,
  validateMovieRating,
} from "./modules/validation.js";
import {
  createMovieCard,
  updateMovieCount,
  updateEmptyMessage,
} from "./modules/movieDisplay.js";

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
// Part 4 - Display Starter Movies
// -----------------------------

movies.forEach(function (movie) {
  createMovieCard(movie, movieTemplate, movieList, movieCount);
});

// -----------------------------
// Part 8 - Handle Form Submission
// -----------------------------

function handleMovieSubmit(event) {
  event.preventDefault();

  const titleIsValid = validateMovieTitle(movieTitleInput, titleError);
  const ratingIsValid = validateMovieRating(movieRatingInput, ratingError);

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

  createMovieCard(newMovie, movieTemplate, movieList, movieCount);

  movieForm.reset();

  titleError.textContent = "";
  ratingError.textContent = "";

  movieTitleInput.classList.remove("invalid");
  movieRatingInput.classList.remove("invalid");

  movieTitleInput.focus();

  window.alert(`${newMovie.title} was added to your watchlist!`);
}
movieForm.addEventListener("submit", handleMovieSubmit);

movieTitleInput.addEventListener("blur", function () {
  validateMovieTitle(movieTitleInput, titleError);
});

movieRatingInput.addEventListener("blur", function () {
  validateMovieRating(movieRatingInput, ratingError);
});

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

    updateMovieCount(movieCount);
    updateEmptyMessage(movieList);
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
