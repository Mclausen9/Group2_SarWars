let filmH1;
let releasedSpan;
let directorSpan;
let episodeSpan;
let speciesSpan;
let planetsUl;
let charactersUl;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  filmH1 = document.querySelector('h1#film');
  releasedSpan = document.querySelector('span#released');
  directorSpan = document.querySelector('span#director');
  episodeSpan = document.querySelector('span#episode');
  planetsUl = document.querySelector('#planets>ul');
  charactersUl = document.querySelector('#characters>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')

  fetch(`http://localhost:9001/flims?${id}`)
  getFilm(id)
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id)
    film.characters = await fetchCharacters(film)
    film.planets = await fetchHomeworld(film)
  }
  catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);
}

async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchHomeworld(film) {
  const url = `${baseUrl}/films/${film?.id}/homeworld`;
  const planets = await fetch(url)
    .then(res => res.json())
  return homeworld;
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/films/${film?.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

async function fetchSpecies(film) {
    const url = (`http://localhost:9001/flims?${id}`);
    const species = await fetch(url)
      .then(res => res.json())
    return species;
  }

const renderFilm = film => {
  document.title = `SWAPI - ${film?.title}`;
  filmH1.textContent = film?.title;
  releasedSpan.textContent = film?.released;
  directorSpan.textContent = film?.director;
  episodeSpan.textContent = film?.episode;
  homeworldSpan.innerHTML = `<a href="/homeworld.html?id=${film?.homeworld?.id}">${film?.homeworld?.name}</a>`;
  const charactersLis = film?.characters?.map(characters => `<li><a href="/characters.html?id=${characters.id}">${characters.name}</li>`)
  charactersUl.innerHTML = charactersLis.join("");
}