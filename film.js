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
  speciesUl =document.querySelector(`#species>ul`)
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')

  getFilm(id)
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id)
    film.characters = await fetchCharacters(film)
    film.planets = await fetchPlanets(film)
    film.species = await fetchSpecies(film)
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

async function fetchPlanets(film) {
  const url = `${baseUrl}/films/${film?.id}/planets`;
  const planets = await fetch(url)
    .then(res => res.json())
  return planets;
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/films/${film?.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

async function fetchSpecies(film) {
    const url = `${baseUrl}/films/${film?.id}/species`;
    const species = await fetch(url)
      .then(res => res.json())
    return species;
  }

const renderFilm = film => {
  document.title = `SWAPI - ${film?.title}`;
  filmH1.textContent = film?.title;
  releasedSpan.textContent = film.release_date;
  directorSpan.textContent = film?.director;
  episodeSpan.textContent = film?.episode_id;
  const charactersList = film?.characters?.map(characters => `<li><a href="/character.html?id=${characters.id}">${characters.name}</li>`)
  charactersUl.innerHTML = charactersList.join("");
  const planetsList = film?.planets?.map(planets => `<li><a href="/planet.html?id=${planets.id}">${planets.name}</li>`)
  speciesUl.innerHTML = speciesList.join("");
  const speciesList = film?.species?.map(species => `<li><a href="/planet.html?id=${species.id}">${species.name}</li>`)
  speciesUl.innerHTML = speciesList.join("");
}