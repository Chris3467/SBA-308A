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
