// -----------------------------
// Part 3 - Create Movie Cards
// -----------------------------

export function createMovieCard(movie, movieTemplate, movieList, movieCount) {
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

  updateMovieCount(movieCount);
  updateEmptyMessage(movieList);
}

// -----------------------------
// Part 5 - Update Movie Count
// -----------------------------

export function updateMovieCount(movieCount) {
  const movieCards = document.querySelectorAll(".movie-card");

  movieCount.textContent = `Movies: ${movieCards.length}`;
}

// -----------------------------
// Part 6 - Empty List Message
// -----------------------------

export function updateEmptyMessage(movieList) {
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
