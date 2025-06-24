// Get species ID from query string
const sp = new URLSearchParams(window.location.search); 
const id = sp.get('id');

fetch(`http://localhost:9001/api/species/${id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch species data");
    }
    return response.json();
  })
  .then(speciesList => {
    const species = speciesList.find(s => s.id === parseInt(id));

    if (species) {
      document.getElementById("name").textContent = species.name;
      document.getElementById("classification").textContent = species.classification;
      document.getElementById("designation").textContent = species.designation;
      // Add similar lines for other details
    } else {
      document.getElementById("name").textContent = "Species not found";
    }
  })
  .catch(error => {
    console.error("Error:", error);
    document.getElementById("name").textContent = "Error loading species data";
  });
