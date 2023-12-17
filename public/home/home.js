const API_KEY = '?api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/original'
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const ids = [8960, 2046, 1924, 271110, 1927, 76170, 1930, 268, 44943, 99861]


function websiteUrlMaker(id) {

    const websiteUrl = BASE_URL + '/movie/' + id + API_KEY;
    return websiteUrl
}

const main = document.getElementById('main')

function showMovies(data) {
    main.innerHTML = '';

    ids.forEach((id) => {
        console.log(websiteUrlMaker(id))
        const url = BASE_URL + '/movie/' + id + API_KEY
        fetch(url).then(res => res.json()).then(data => {
            let overview = data.overview
            let title = data.title
            let backDrop = data.backdrop_path
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie')
            movieEl.innerHTML = `
            <img src="${IMG_URL + backDrop}" alt="${title}">
            
            <div class="movie-info">
            <h3>${title}</h3>
            </div>
            
            <div class="overview">
            
            <h3>Overview</h3>
            ${overview}
            <br/> 
            <button class="know-more" id="${id}">Know More</button
            </div>
            
            `
            main.appendChild(movieEl);

        })
    })

}

showMovies()