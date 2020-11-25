const getPokemonUrl = id =>`https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon = () => {

  const pokemonPormisses = []

  for (let i = 1; i <= 891; i++){
    pokemonPormisses.push(fetch(getPokemonUrl(i)).then(response => response.json()))
  }

  Promise.all(pokemonPormisses)
    .then(pokemons => {
      const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)

        accumulator += `
        <li class="card ${types[0]}">
        <img class ="card-image" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" />
        <h2 class="card-title">${pokemon.name}. ${pokemon.name}</h2>
        <p class="card-subtitle">${types.join(' | ')}</p>
        </li>
        `
        return accumulator
      }, '')

      const ul = document.querySelector('[data-js="pokedex"]')

      ul.innerHTML = lisPokemons
    })
}
fetchPokemon()