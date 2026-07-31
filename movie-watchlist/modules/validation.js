// -----------------------------
// Part 7 - Validate Form Inputs
// -----------------------------

export function validateMovieTitle(movieTitleInput, titleError) {
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

export function validateMovieRating(movieRatingInput, ratingError) {
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
