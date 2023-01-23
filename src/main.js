async function getTrendingMoviesPreview() {
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY
  );
  const data = await res.json();
  const movies = data.results;
  movies.forEach((movie) => {
    const trendingPreview = document.querySelector(
      "#trendingPreview .trendingPreview-movieList"
    );

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
    trendingPreview.appendChild(movie_container);
  });
  console.log(data);
  console.log(movies);
}

async function getCategoryMoviesPreview() {
  const categoriesPreview = document.querySelector(
    "#categoriesPreview .categoriesPreview-list"
  );

  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY
  );
  const data = await res.json();
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
    categoriesPreview.appendChild(genre_container);
  });
  console.log(genres);
}

getTrendingMoviesPreview();
getCategoryMoviesPreview();
