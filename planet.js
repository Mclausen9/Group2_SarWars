let nameH1;
let populationSpan;
let climateSpan;
let terrainSpan;
let charactersUl;
let filmsUl;
const baseUrl = `http://localhost:9001/api`;


addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name')
    populationSpan = document.querySelector('span#population')
    climateSpan = document.querySelector('span#climate')
    terrainSpan = document.querySelector('span#terrain')
    charactersUl = document.querySelector('#characters>ul');
    filmsUl = document.querySelector('#films>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getPlanet(id)
});

async function getPlanet(id) {
    let planet;
    try {
        planet = await fetchPlanet(id)
        planet.characters = await fetchCharacters(planet)
        planet.films = await fetchFilms(planet)
        console.log(1)
    }
    catch (e) {
        console.error(`Error reading character ${id} data.`, e.message)
    }
    renderPlanet(planet)
}

async function fetchPlanet(id) {
    let planetUrl = `${baseUrl}/planets/${id}`;
    return await fetch(planetUrl)
        .then(res =>
            res.json()
        );
}

async function fetchCharacters(planet) {
    const url = `${baseUrl}/planets/${planet?.id}/characters`;
    const characters = await fetch(url)
        .then(res => res.json())
    return characters;
}

async function fetchFilms(planet) {
    const url = `${baseUrl}/planets/${planet?.id}/films`;
    const films = await fetch(url)
        .then(res => res.json())
    return films;
}

const renderPlanet = planet => {
    document.title = `Swapi - ${planet?.name}`;
    nameH1.textContent = planet?.name;
    populationSpan.textContent = planet?.population;
    climateSpan.textContent = planet?.climate;
    terrainSpan.textContent = planet?.terrain;
    const characterList = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = characterList.join("");
    const filmList = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = filmList.join("");
}