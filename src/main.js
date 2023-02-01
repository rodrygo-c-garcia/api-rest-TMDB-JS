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

// Lazy Loader, vamos a observar todo el HTML

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute("data-img");
      entry.target.setAttribute("src", url);
    }
  });
});

// Utils

function createMovies(
  movies,
  container,
  { lazyLoad = false, clean = true } = {}
) {
  if (clean) container.innerHTML = "";

  movies.forEach((movie) => {
    const movie_container = document.createElement("div");
    movie_container.classList.add("movie-container");

    movie_container.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });

    const movie_img = document.createElement("img");
    movie_img.classList.add("movie-img");
    movie_img.setAttribute("alt", movie.title);
    movie_img.setAttribute(
      lazyLoad ? "data-img" : "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );
    // imagen por defecto cuando la API no responde con una Foto
    movie_img.addEventListener("error", () => {
      movie_img.setAttribute(
        "src",
        "https://image.tmdb.org/t/p/w300/adOzdWS35KAo21r9R4BuFCkLer6.jpg"
      );
    });

    // para peliculas favoritas
    const movieBtn = document.createElement("button");
    movieBtn.classList.add("movie-btn");
    movieBtn.addEventListener("click", () => {
      movieBtn.classList.toggle("movie-btn--liked");
      // Agregar las peliculas
    });

    // el observador estar vigilando a nuestro imagen
    if (lazyLoad) lazyLoader.observe(movie_img);

    movie_container.appendChild(movie_img);
    movie_container.appendChild(movieBtn);
    container.appendChild(movie_container);
  });

  console.log(movies);
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

  console.log("Total " + data.total_pages);
  maxPage = data.total_pages;

  const rendingMoviesPreviewList = document.querySelector(
    "#trendingPreview .trendingPreview-movieList"
  );
  createMovies(movies, rendingMoviesPreviewList, true);
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
  maxPage = data.total_pages;
  createMovies(movies, genericSection);

  // console.log(data);
  // console.log(movies);
}

// las tendencias
async function getTrendingMovies() {
  const { data } = await api("/trending/movie/day");
  const movies = data.results;

  createMovies(movies, genericSection, { lazyLoad: true, clean: true });

  // const btnLoad = document.createElement("button");
  // btnLoad.innerText = "Cargar Mas";
  // btnLoad.addEventListener("click", paginationTrendingMovies);
  // genericSection.appendChild(btnLoad);
}

async function paginationTrendingMovies() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
  const isNotMaxPage = pagina < maxPage;

  // validamos el Scroll
  if (scrollIsBottom && isNotMaxPage) {
    pagina++;

    const { data } = await api("/trending/movie/day", {
      params: {
        page: pagina,
      },
    });
    const movies = data.results;
    createMovies(movies, genericSection, { lazyLoad: true, clean: false });
  }

  // const btnLoad = document.createElement("button");
  // btnLoad.innerText = "Cargar Mas";
  // btnLoad.addEventListener("click", paginationTrendingMovies);
  // genericSection.appendChild(btnLoad);
}

async function getMovieById(id) {
  // renombramos data a movie
  const { data: movie } = await api("/movie/" + id);

  const movieImgUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;

  headerSection.style.background = `
  linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), 
  url(${movieImgUrl})`;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createCategories(movie.genres, movieDetailCategoriesList, true);
  getRelatedMoviesId(id);
  //console.log(id);
}

async function getRelatedMoviesId(id) {
  const { data } = await api(`/movie/${id}/recommendations`);
  const relatedMovies = data.results;
  console.log(relatedMovies);

  createMovies(relatedMovies, relatedMoviesContainer, {
    lazyLoad: true,
    clean: false,
  });
}

async function paginationMovieSearch(query) {
  //closure
  return async function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
    const isNotMaxPage = pagina < maxPage;

    // validamos el Scroll
    if (scrollIsBottom && isNotMaxPage) {
      pagina++;

      const { data } = await api("/search/movie", {
        params: {
          query: query,
          page: pagina,
        },
      });
      const movies = data.results;

      createMovies(movies, genericSection, {
        lazyLoad: true,
        clean: false,
      });
    }
  };
}
