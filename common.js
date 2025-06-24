// common.js

const baseUrl = `http://localhost:9001/api`;

async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error.message);
        throw error;
    }
}

function renderList(items, container, itemTemplate) {
    const listItems = items.map(itemTemplate).join("");
    container.innerHTML = listItems;
}

function setTextContent(element, text) {
    element.textContent = text;
}

const render = (obj, paragraphs, lists) => {
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