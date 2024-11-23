// Select the dropdown menu element from the DOM
const pokemonSelect = document.querySelector(".pokemon-select select");

// Create a container for displaying Pokémon details and add it to the DOM
const pokemonDetails = document.createElement("div");
pokemonDetails.classList.add("pokemon-details");
document.body.appendChild(pokemonDetails);

// Fetch Pokémon data from the PokeAPI
async function fetchData() {
  try {
    // Fetch the list of Pokémon from the API (limited to the first 151)
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json(); // Parse the JSON response
    const pokemonList = data.results; // Extract the list of Pokémon

    // Populate the dropdown menu with Pokémon options
    for (const pokemon of pokemonList) {
      const option = document.createElement("option"); // Create a new <option> element
      option.value = pokemon.url; // Set the value to the Pokémon's API URL
      option.textContent = pokemon.name; // Display the Pokémon's name as the option text
      pokemonSelect.appendChild(option); // Add the option to the dropdown menu
    }

    // Add an event listener to handle dropdown changes
    pokemonSelect.addEventListener("change", displayPokemonDetails);
  } catch (error) {
    // Log an error if the fetch operation fails
    console.error("Error fetching Pokémon data:", error);
  }
}

// Fetch and display details of the selected Pokémon
async function displayPokemonDetails(event) {
  const url = event.target.value; // Get the API URL of the selected Pokémon
  if (!url) return; // If no Pokémon is selected, exit the function

  try {
    // Fetch the details of the selected Pokémon from the API
    const response = await fetch(url);
    const pokemon = await response.json(); // Parse the JSON response

    // Extract relevant data from the response
    const name = capitalize(pokemon.name); // Capitalize the Pokémon's name
    const sprite = pokemon.sprites.front_default; // Get the Pokémon's front image sprite
    const stats = pokemon.stats.map((stat) => ({
      name: capitalize(stat.stat.name), // Capitalize each stat name
      value: stat.base_stat, // Get the base stat value
    }));

    // Update the details container with the Pokémon's data
    pokemonDetails.innerHTML = `
      <h2>${name}</h2> <!-- Display Pokémon name -->
      <img src="${sprite}" alt="${name}" /> <!-- Display Pokémon image -->
      <h3>Stats:</h3>
      <ul>
        ${stats
          .map((stat) => `<li>${stat.name}: ${stat.value}</li>`)
          .join("")} <!-- List stats -->
      </ul>
    `;
  } catch (error) {
    // Log an error if fetching Pokémon details fails
    console.error("Error fetching Pokémon details:", error);
  }
}

// Capitalize the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1); // Capitalize the first letter and append the rest of the string
}

// Call the fetchData function to populate the dropdown on page load
fetchData();
