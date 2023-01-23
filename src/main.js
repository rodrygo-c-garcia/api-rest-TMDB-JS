// creamos una instancia de AXIOS
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

async function getTrendingMoviesPreview() {
  const { data } = await api("/trending/movie/day");
  const movies = data.results;

  const rendingMoviesPreviewList = document.querySelector(
    "#trendingPreview .trendingPreview-movieList"
  );
  rendingMoviesPreviewList.innerHTML = "";
  movies.forEach((movie) => {
    // creamos el container para la imagen
    const movie_container = document.createElement("div");
    movie_container.classList.add("movie-container");

    // creamos la imagen
    const movie_img = document.createElement("img");
    movie_img.classList.add("movie-img");
    movie_img.setAttribute("alt", movie.title);
    movie_img.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );

    movie_container.appendChild(movie_img);
    rendingMoviesPreviewList.appendChild(movie_container);
  });

  console.log(data);
  console.log(movies);
}

async function getCategoryMoviesPreview() {
  const categoriesPreviewList = document.querySelector(
    "#categoriesPreview .categoriesPreview-list"
  );
  categoriesPreviewList.innerHTML = "";

  const { data } = await api("/genre/movie/list");
  const genres = data.genres;

  genres.forEach((genre) => {
    // creamos el container
    const genre_container = document.createElement("div");
    genre_container.classList.add("category-container");

    // creamos
    const genre_label = document.createElement("h3");
    genre_label.classList.add("category-title");
    genre_label.textContent = genre.name;
    genre_label.setAttribute("id", "id" + genre.id);

    genre_container.appendChild(genre_label);
    categoriesPreviewList.appendChild(genre_container);
  });
  console.log(genres);
}
