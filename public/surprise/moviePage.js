const ids = [8960, 2046, 1924, 271110, 1927, 76170, 1930, 268, 44943, 99861]
const img = document.getElementById('img')
const titleDiv = document.getElementById('titleDiv')
const description = document.getElementById('overViewP')
const API_KEY = '?api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/original'
const searchURL = BASE_URL + '/search/movie?' + API_KEY;


function random() {
    let randomNumber = Math.ceil(Math.random() * 2000);
    return randomNumber
}
function websiteUrlMaker(id) {
    const websiteUrl = BASE_URL + '/movie/' + id + API_KEY;
    return websiteUrl
}





function showMovies(data) {
    img.innerHTML = '';
    titleDiv.innerHTML = ''
    description.innerHTML = ''


    const url = BASE_URL + '/movie/' + random() + API_KEY
    fetch(url).then(res => res.json()).then(data => {
        let overview = data.overview
        let title = data.title
        let backDrop = data.backdrop_path
        console.log(backDrop, overview, title)
        img.innerHTML = `<img src="${IMG_URL + backDrop}" alt="${title}">`
        titleDiv.innerHTML = title
        description.innerHTML = overview

        // main.appendChild(movieEl);

    })
}

showMovies()