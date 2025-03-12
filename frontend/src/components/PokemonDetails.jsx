import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TypeIcon from './TypeIcon';
import './PokemonDetails.css';

const getStatColor = (value) => {
  if (value < 50) return '#D32F2F'; // Rosso
  if (value < 90) return '#F57C00'; // Arancione
  if (value < 130) return '#FBC02D'; // Giallo
  if (value < 170) return '#7CB342'; // Verde chiaro
  return '#388E3C'; // Verde scuro
};


const StatBar = ({ statName, value, maxValue = 255 }) => (
  <div className="stat-bar">
    <div className="stat-name">{statName}</div>
    <div className="stat-progress">
      <div className="stat-fill" style={{ width: `${(value / maxValue) * 100}%`, backgroundColor: getStatColor(value) }}></div>
    </div>
    <div className="stat-value">{value}</div>
  </div>
);

const PokemonDetails = () => {
  const [searchName, setSearchName] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [cachedPokemon, setCachedPokemon] = useState({});

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
        setSuggestions(response.data.results.map(p => p.name));
      } catch (err) {
        console.error('Errore nel caricamento dei nomi Pokémon', err);
      }
    };
    fetchPokemonNames();
  }, []);

  const handleSearch = useCallback(
    async (name) => {
      if (!name) return;
      
      if (cachedPokemon[name]) {
        setPokemon(cachedPokemon[name]);
        setError('');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3001/pokemon/${name.toLowerCase()}`);
        const pokemonData = response.data;

        const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
        const officialArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`;

        const newPokemon = {
          ...pokemonData,
          sprite: spriteUrl,
          officialArtwork: officialArtworkUrl,
        };
        
        setCachedPokemon(prev => ({ ...prev, [name]: newPokemon }));
        setPokemon(newPokemon);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Pokémon not found');
        setPokemon(null);
      }
    },
    [cachedPokemon]
  );

  return (
    <div className="pokemon-details">
      <h2>Pokémon Details</h2>
      <div className="search-container">
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter Pokémon Name"
          list="pokemon-suggestions"
        />
        <button onClick={() => handleSearch(searchName)}>Search</button>
        <datalist id="pokemon-suggestions">
          {suggestions
            .filter(name => name.includes(searchName.toLowerCase()))
            .slice(0, 10)
            .map((name, index) => (
              <option key={index} value={name} />
            ))}
        </datalist>
      </div>

      {error && <p className="error">{error}</p>}

      {pokemon && (
        <div className="card">
          <div className="sprites-section">
            <img src={pokemon.officialArtwork} alt={`${pokemon.name} official artwork`} className="official-artwork" />
          </div>
          <h3>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)} (ID: {pokemon.id})</h3>
          <div className="types-container">
            <strong>Types:</strong>
            <br></br>
            {pokemon.types?.map((type, index) => (
              <TypeIcon key={index} typeName={type} />
            ))}
          </div>

          {pokemon.base_experience && <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>}
          {pokemon.height && <p><strong>Height:</strong> {pokemon.height} decimetres</p>}
          {pokemon.weight && <p><strong>Weight:</strong> {pokemon.weight} hectograms</p>}

          <div className="stats">
            <h4>Stats:</h4>
            {pokemon.stats?.map((stat, index) => (
              <StatBar
                key={index}
                statName={stat.name}
                value={stat.value}
                maxValue={255}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
