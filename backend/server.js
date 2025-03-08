const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Endpoint per ottenere i dettagli di un Pokémon
app.get('/pokemon/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const pokemonData = response.data;
    
    // Estrai solo i dati necessari
    const pokemon = {
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.sprites.front_default,
      types: pokemonData.types.map(typeInfo => typeInfo.type.name),
      stats: pokemonData.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
      })),
    };
    res.json(pokemon);
  } catch (error) {
    res.status(404).json({ error: 'Pokemon not found' });
  }
});

// Nuovo endpoint per ottenere la lista dei Pokémon per tipo
app.get('/type/:type', async (req, res) => {
  const { type } = req.params;
  try {
    // Chiamata all'endpoint della PokeAPI per il tipo specificato
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`);
    // La risposta contiene una proprietà "pokemon" che è un array di oggetti.
    // Ogni oggetto ha una struttura del tipo { pokemon: { name, url }, slot: number }.
    // Mappiamo l'array per ottenere solo i nomi dei Pokémon.
    const pokemonList = response.data.pokemon.map(pokeObj => pokeObj.pokemon.name);
    res.json({ type: type, pokemon: pokemonList });
  } catch (error) {
    res.status(404).json({ error: `Type ${type} not found` });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

