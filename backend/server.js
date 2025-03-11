const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

/// Endpoint per ottenere i dettagli di un Pokémon, inclusi gli sprite heartgold-soulsilver
app.get('/pokemon/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const pokemonData = response.data;
    
    // Estrai i dati base
    const pokemon = {
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.sprites.front_default,
      types: pokemonData.types.map(typeInfo => typeInfo.type.name),
      stats: pokemonData.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
      })),
      // Aggiungiamo i dati degli sprite per HeartGold / SoulSilver se disponibili
      heartgoldSoulsilver: (pokemonData.sprites.versions && 
                             pokemonData.sprites.versions["generation-iv"] && 
                             pokemonData.sprites.versions["generation-iv"]["heartgold-soulsilver"])
                            ? {
                                front_default: pokemonData.sprites.versions["generation-iv"]["heartgold-soulsilver"].front_default,
                                front_shiny: pokemonData.sprites.versions["generation-iv"]["heartgold-soulsilver"].front_shiny,
                                back_default: pokemonData.sprites.versions["generation-iv"]["heartgold-soulsilver"].back_default,
                                back_shiny: pokemonData.sprites.versions["generation-iv"]["heartgold-soulsilver"].back_shiny
                              }
                            : null
    };
    res.json(pokemon);
  } catch (error) {
    res.status(404).json({ error: 'Pokemon not found' });
  }
});


// Endpoint per ottenere la lista dei Pokémon per tipo
app.get('/type/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`);
    // Mappa l'array per ottenere solo i nomi dei Pokémon
    const pokemonList = response.data.pokemon.map(pokeObj => pokeObj.pokemon.name);
    res.json({ type: type, pokemon: pokemonList });
  } catch (error) {
    res.status(404).json({ error: `Type ${type} not found` });
  }
});

// Endpoint per ottenere la catena evolutiva di un Pokémon
app.get('/evolution/:name', async (req, res) => {
  const { name } = req.params;
  try {
    // 1. Recupera le informazioni sulla specie del Pokémon
    const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`);
    const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
    
    // 2. Recupera la catena evolutiva usando l'URL ottenuto
    const evolutionResponse = await axios.get(evolutionChainUrl);
    
    // 3. Processa la catena evolutiva
    const evolutionChain = [];
    let currentEvolution = evolutionResponse.data.chain;
    
    // Cicla attraverso la catena evolutiva (prendendo la prima evoluzione ad ogni step)
    while (currentEvolution) {
      evolutionChain.push(currentEvolution.species.name);
      if (currentEvolution.evolves_to.length > 0) {
        currentEvolution = currentEvolution.evolves_to[0];
      } else {
        currentEvolution = null;
      }
    }
    
    res.json({ evolutionChain });
  } catch (error) {
    res.status(404).json({ error: `Evolution chain not found for ${name}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
