// Joseph Garcia
// SBA 316 - The Document Object Model

import { movies } from "./modules/movieData.js";
import {
  validateMovieTitle,
  validateMovieRating,
} from "./modules/validation.js";
import { createMovieCard } from "./modules/movieDisplay.js";
import {
  handleMovieClick,
  applyMovieFilter,
} from "./modules/movieActions.js";

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

movieList.addEventListener("click", function (event) {
  handleMovieClick(event, movieFilter, movieCount, movieList);
});

movieFilter.addEventListener("change", function () {
  applyMovieFilter(movieFilter);
});

// -----------------------------
// Part 11 - BOM Information
// -----------------------------

console.log(`Browser window width: ${window.innerWidth}px`);
console.log(`Current page URL: ${window.location.href}`);
