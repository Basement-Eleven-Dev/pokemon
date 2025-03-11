// src/components/PokemonByType.jsx
import React, { useState } from 'react';
import axios from 'axios';
import TypeIcon from './TypeIcon';
import './PokemonByType.css';

/**
 * Componente per cercare i Pokémon per tipo
 *
 * Mostra un campo di testo per l'utente di inserire il tipo di Pokémon
 * e un pulsante per eseguire la ricerca.
 *
 * Se la ricerca va a buon fine, mostra la lista dei Pokémon del tipo
 * insieme all'icona del tipo e ai rispettivi sprite.
 *
 * Se la ricerca non va a buon fine, mostra un messaggio di errore.
 */
const PokemonByType = () => {
  const [type, setType] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState('');
  const [typeSprite, setTypeSprite] = useState('');
  const [pokemonSprites, setPokemonSprites] = useState({}); // Memorizza gli ID per gli sprite

/**
 * Fetches and updates the list of Pokémon for a specified type along with their type icon and sprite IDs.
 *
 * 1. Fetches the list of Pokémon names for the given type from a local server and updates the state.
 * 2. Fetches the type icon from the official Pokémon API and updates the state.
 * 3. Fetches the IDs for each Pokémon to construct their sprite URLs and updates the state.
 *
 * In case of an error during fetching, it logs the error and updates the state with an error message,
 * while resetting the Pokémon list, type icon, and sprite data.
 */

  const handleSearch = async () => {
    try {
      // 1️⃣ Recupera la lista di Pokémon per tipo
      const response = await axios.get(`http://localhost:3001/type/${type.toLowerCase()}`);
      const pokemonNames = response.data.pokemon;
      setPokemonList(pokemonNames);
      setError('');

      // 2️⃣ Recupera l'icona del tipo
      const typeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`);
      const spriteUrl = typeResponse.data.sprites?.["generation-viii"]?.["sword-shield"]?.name_icon || '';
      setTypeSprite(spriteUrl);

      // 3️⃣ Recupera gli ID per gli sprite
      const spriteRequests = pokemonNames.map(async (pokemon) => {
        try {
          const pokeResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
          const pokemonId = pokeResponse.data.id;
          return { name: pokemon, id: pokemonId };
        } catch (err) {
          console.error(`Error fetching ID for ${pokemon}:`, err);
          return { name: pokemon, id: null };
        }
      });

      // Risolviamo tutte le richieste
      const spriteResults = await Promise.all(spriteRequests);
      const spriteMap = spriteResults.reduce((acc, { name, id }) => {
        acc[name] = id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : null;
        return acc;
      }, {});

      setPokemonSprites(spriteMap);
    } catch (err) {
      console.error(`Error fetching data for type ${type}:`, err);
      setError(`Type "${type}" not found`);
      setPokemonList([]);
      setTypeSprite('');
      setPokemonSprites({});
    }
  };

  return (
    <div className="pokemon-by-type">
      <h2>Pokémon by Type</h2>
      <div className="search-container">
        <input 
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Enter Pokémon Type"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {/* Mostra la lista dei Pokémon per tipo con sprite */}
      {pokemonList.length > 0 && (
        <div className="list-container">
          <h3>{type[0].toUpperCase() + type.slice(1).toLowerCase()} type Pokémon:</h3>
          <ul>
            {pokemonList.map((pokemon, index) => (
              <li key={index} className="pokemon-item">
                {pokemonSprites[pokemon] ? (
                  <img src={pokemonSprites[pokemon]} alt={pokemon} className="pokemon-sprite" />
                ) : (
                  <span className="no-sprite">❌</span> // Se non esiste lo sprite
                )}
                {pokemon}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonByType;
