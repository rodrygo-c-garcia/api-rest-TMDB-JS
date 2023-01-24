// creamos una instancia de AXIOS
window.scrollTo(0, 0);
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
  },
  Headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Utils

function createMovies(movies, container) {
  container.innerHTML = "";

  movies.forEach((movie) => {
    const movie_container = document.createElement("div");
    movie_container.classList.add("movie-container");

    const movie_img = document.createElement("img");
    movie_img.classList.add("movie-img");
    movie_img.setAttribute("alt", movie.title);
    movie_img.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );

    movie_container.appendChild(movie_img);
    container.appendChild(movie_container);
  });
}

function createCategories(genres, container) {
  container.innerHTML = "";
  genres.forEach((genre) => {
    // creamos el container
    const genre_container = document.createElement("div");
    genre_container.classList.add("category-container");

    // creamos
    const genre_label = document.createElement("h3");
    genre_label.classList.add("category-title");
    genre_label.textContent = genre.name;
    genre_label.setAttribute("id", "id" + genre.id);
    genre_label.addEventListener("click", () => {
      location.hash = "#category=" + genre.id + "-" + genre.name;
    });

    genre_container.appendChild(genre_label);
    container.appendChild(genre_container);
  });
}

// Obtenemos todas las movies en tendencia
async function getTrendingMoviesPreview() {
  const { data } = await api("/trending/movie/day");
  const movies = data.results;

  const rendingMoviesPreviewList = document.querySelector(
    "#trendingPreview .trendingPreview-movieList"
  );
  createMovies(movies, rendingMoviesPreviewList);
  console.log(data);
  console.log(movies);
}

async function getCategoryMoviesPreview() {
  const { data } = await api("/genre/movie/list");
  const genres = data.genres;

  createCategories(genres, categoriesPreviewList);

  console.log(genres);
}

// obtenemos la categoria especificada por el ID
async function getMoviesByCategory(id) {
  window.scrollTo(0, 0);

  const { data } = await api("/discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;

  createMovies(movies, genericSection);

  console.log(data);
  console.log(movies);
}

async function getMoviesBySearch(query) {
  const { data } = await api("/search/movie", {
    params: {
      query: query,
    },
  });
  const movies = data.results;

  createMovies(movies, genericSection);

  console.log(data);
  console.log(movies);
}
