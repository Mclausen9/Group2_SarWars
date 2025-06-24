// Get species ID from query string
const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');

console.log(id)

fetch(`http://localhost:9001/api/species/${id}`)

    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch species data");
        }
        return response.json();
    })
    .then(data => {

        if (data) {
            document.getElementById("name").textContent = data.name;
            document.getElementById("classification").textContent = data.classification;
            document.getElementById("designation").textContent = data.designation;
            document.getElementById("averagelifespan").textContent = data.average_lifespan;
            // Add similar lines for other details
            return data
        } else {
            document.getElementById("name").textContent = "Species not found";
        }
    })
    .then(data => {
        const baseUrl = `http://localhost:9001/api`;
        async function fetchCharacters(species) {
            const url = `${baseUrl}/species/${species?.id}/characters`;
            const characters = await fetch(url)
                .then(res => res.json())
            return characters;
        }
        fetchCharacters(data)
        let charactersUl = document.querySelector("#characters>ul")
        const characterList = data?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
        charactersUl.innerHTML = characterList.join("");


    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("name").textContent = "Error loading species data";
    });
