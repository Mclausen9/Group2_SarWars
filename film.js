let filmH1;
let releasedSpanSpan;
let directorSpan;
let episodeSpan;
let planetsDiv;
let characterDiv;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  filmH1 = document.querySelector('h1#film');
  releasedSpan = document.querySelector('span#released');
  dirctorSpan = document.querySelector('span#director');
  episodeSpan = document.querySelector('span#episode');
  planetsSpan = document.querySelector('span#planets');
  characterUl = document.querySelector('#character>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getfilm(id)
});

async function getfilm(id) {
  let film;
  try {
    film = await fetchfilm(id)
    film.character = await fetchcharacter(film)
    film.planets = await fetchplanets(film)
  }
  catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  renderfilm(film);

}
async function fetchfilm(id) {
  let filmUrl = `${baseUrl}/characters/${character?.id}/films`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchCharacter(film) {
  const url = `${baseUrl}/film/${film?.character}`;
  const planet = await fetch(url)
    .then(res => res.json())
  return character;
}

async function fetchplantes(film) {
  const url = `${baseUrl}/film/${film?.id}/planets`;
  const films = await fetch(url)
    .then(res => res.json())
  return plantes;
}

const renderFilm = film => {
  document.title = `SWAPI - ${film?.name}`;  // Just to make the browser tab say their name
  filmH1.textContent = film?.film;
  releasedSpan.textContent = film?.released;
  directorSpan.textContent = film?.diroctor;
  episode.textContent = film?.episode;
  characterSpan.innerHTML = `<a href="/character.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
  const filmsLis = character?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmsLis.join("");
}
