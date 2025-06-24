let nameH1;
let classificationSpan;
let lifespanSpan;
let designationSpan;
let charactersUl;
const baseUrl = `http://localhost:9001/api`;


addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name')
    classificationSpan = document.querySelector('span#classification')
    lifespanSpan = document.querySelector('span#averagelifespan')
    designationSpan = document.querySelector('span#designation')
    charactersUl = document.querySelector('#characters>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getSpecies(id)
});

async function getSpecies(id) {
    let species;
    try {
        species = await fetchSpecies(id)
        species.characters = await fetchCharacters(species)
    }
    catch (e) {
        console.error(`Error reading species ${id} data.`, e.message)
    }
    renderSpecies(species)
}

async function fetchSpecies(id) {
    let speciesUrl = `${baseUrl}/species/${id}`;
    return await fetch(speciesUrl)
        .then(res =>
            res.json()
        );
}

async function fetchCharacters(species) {
    const url = `${baseUrl}/species/${species?.id}/characters`;
    const characters = await fetch(url)
        .then(res => res.json())
    return characters;
}

const renderSpecies = species => {
    console.log(species)
    document.title = `Swapi - ${species?.name}`;
    nameH1.textContent = species?.name;
    classificationSpan.textContent = species.classification
    lifespanSpan.textContent = species?.average_lifespan;
    designationSpan.textContent = species?.designation;
    const characterList = species?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = characterList.join("");
}