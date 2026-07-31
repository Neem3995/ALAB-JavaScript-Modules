import {
  updateMovieCount,
  updateEmptyMessage,
} from "./movieDisplay.js";

// -----------------------------
// Part 9 - Handle Movie Buttons
// -----------------------------

export function handleMovieClick(
  event,
  movieFilter,
  movieCount,
  movieList
) {
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
    toggleWatchedMovie(movieCard, clickedElement, movieFilter);
  }

  if (clickedElement.classList.contains("remove-btn")) {
    removeMovie(movieCard, movieCount, movieList);
  }
}

function toggleWatchedMovie(movieCard, watchedButton, movieFilter) {
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

  applyMovieFilter(movieFilter);
}

function removeMovie(movieCard, movieCount, movieList) {
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

export function applyMovieFilter(movieFilter) {
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
