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
