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
    } else {
      document.getElementById("name").textContent = "Species not found";
    }
  })
  .catch(error => {
    console.error("Error:", error);
    document.getElementById("name").textContent = "Error loading species data";
  });
