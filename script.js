const API_URL = "http://www.omdbapi.com";
const API_KEY = "ce47be69";
const filmTitle = document.querySelector("#filmTitle");
const filmType = document.querySelector("#filmType");
const filmContainer = document.querySelector(".film-container");
const filmInfo = document.querySelector(".film-info");

const paginatorPrev = document.querySelector("#paginatorPrev");
const paginatorNext = document.querySelector("#paginatorNext");
let paginator = document.querySelector(".paginator")
let pageCounter = 1;
let lastPageNumber;

paginatorPrev.addEventListener("click", () => {
    pageCounter--;

    if (pageCounter === 1) {
        paginatorPrev.disabled = true;
        paginatorPrev.style.display = "none";
    }

    if (pageCounter < lastPageNumber) {
        paginatorNext.disabled = false;
        paginatorNext.style.display = "block";
    }

    getMovies();
});

paginatorNext.addEventListener("click", () => {
    pageCounter++;
    paginatorPrev.style.display = "block";

    if (pageCounter > 1) {
        paginatorPrev.disabled = false;
    }

    if (pageCounter === lastPageNumber) {
        paginatorNext.disabled = true;
        paginatorNext.style.display = "none";
    }

    getMovies();
});

function getFilmByTitle(title, type, page) {
    return fetch(`${API_URL}/?apikey=${API_KEY}&s=${title}&type=${type}&page=${page}`)
        .then((response) => response.json());
    // .then((data) => {
    //     console.log(data);
    // });
}

function getMovieById(id) {
    return fetch(`${API_URL}/?apikey=${API_KEY}&i=${id}`)
        .then((response) => response.json());
}

function getFilmTitle() {
    return filmTitle.value;
}

function getFilmType() {
    return filmType.value;
}

let buttonSearch = document.querySelector(".search");
buttonSearch.addEventListener("click", function() {
    pageCounter = 1;
    getMovies();
    paginator.style.display = "flex";
    paginatorPrev.style.display = "none";
});

function getMovies() {

    getFilmByTitle(getFilmTitle(), getFilmType(), pageCounter)
        .then((data) => {
            const films = data.Search;
            lastPageNumber = Math.ceil(data.totalResults / 10);

            if (lastPageNumber === 1) {
                paginatorPrev.disabled = true;
                paginatorNext.disabled = true;
            }

            showFilms(films);
            console.log(data);
        });
}

function showFilms(films) {
    let filmItem = "";

    filmItem += `
        <h3>Films:</h3>
        <div class="films-block-item">
    `;

    for (let film of films) {
        filmItem += `
            <div class="film-container-item">
                <div class="film-container-item-image">
                    <img class="img-item" src="${film.Poster}" alt="">
                </div>
                <div class="film-container-item-info">
                    <p class="title">${film.Type}</p>
                    <p class="name">${film.Title}</p>
                    <p class="year">${film.Year}</p>
                    <button class="details-button" data-id="${film.imdbID}">Details</button>
                </div>
            </div>
        `;

    }

    filmItem += `</div>`;

    filmContainer.innerHTML = filmItem;
    const showInfoButtons = document.querySelectorAll(".details-button");

    for (let btn of showInfoButtons) {
        btn.addEventListener("click", function() {
            const id = this.dataset.id;
            getMovieById(id)
                .then((movie) => {
                    console.log(movie);
                    showSelectedMovie(movie);
                    const close = document.querySelector(".close");
                    close.addEventListener("click", function() {
                        filmInfo.innerHTML = "";
                    })
                })
        })
    }
}

function showSelectedMovie(movie) {
    let filmMovie = "";
    filmMovie += `
    <div class="film-info">
        <div class="modal">
            <div class="modal-content">
                <button class="close">&times;</button>
                <div class="modal-header">Film info:</div>
                <div class="film-container-info">
                    <div class="film-container-info-image">
                        <img class="img-info" src="${movie.Poster}" alt="">
                    </div>

                    <div class="film-block-info">
                        <div class="info">
                            <p class="info-name">Title:</p>
                            <p class="info-value">${movie.Title}</p>
                        </div>
                        <div class="info">
                            <p class="info-name">Released:</p>
                            <p class="info-value">${movie.Released}</p>
                        </div>
                        <div class="info">
                            <p class="info-name">Genre:</p>
                            <p class="info-value">${movie.Genre}</p>
                        </div>
                        <div class="info">
                            <p class="info-name">Country:</p>
                            <p class="info-value">${movie.Country}</p>
                        </div>
                        <div class="info">
                            <p class="info-name">Director:</p>
                            <p class="info-value">${movie.Director}</p>
                        </div>
                        <div class="info">
                            <p class="info-name">Writer:</p>
                            <p class="info-value">${movie.Writer}</p>
                        </div>
                        <div class="info">
                            <p class="info-name">Actors:</p>
                            <p class="info-value">${movie.Actors}</p>
                        </div>
                        <div class="info">
                            <p class="info-name">Awards:</p>
                            <p class="info-value">${movie.Awards}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    filmInfo.innerHTML = filmMovie;
}

// getFilmByTitle(getFilmTitle(), getFilmType(), pageCounter)
//     .then((data) => {
//         const films = data.Search;
//         lastPageNumber = Math.ceil(data.totalResults / 10);

//         if (lastPageNumber === 1) {
//             paginatorPrev.disabled = true;
//             paginatorNext.disabled = true;

//         }
//         showFilms(films);
//         console.log(data);
//     })

 