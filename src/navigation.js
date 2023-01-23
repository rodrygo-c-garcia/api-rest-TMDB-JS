window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

function navigator() {
  console.log({ location });
  if (location.hash.startsWith("#trends")) {
    console.log("TRENDS");
  } else if (location.hash.startsWith("#search=")) {
    console.log("SEARCH");
  } else if (location.hash.startsWith("#movie=")) {
    console.log("MOVIE");
  } else if (location.hash.startsWith("#category=")) {
    console.log("Categories");
  } else {
    console.log("Home");
  }
}

function homePage() {
  getTrendingMoviesPreview();
  getCategoryMoviesPreview();

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");
}
