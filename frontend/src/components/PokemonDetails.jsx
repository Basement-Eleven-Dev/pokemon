import React, { useState } from 'react';
import axios from 'axios';
import TypeIcon from './TypeIcon';
import './PokemonDetails.css';

// Definizione del componente StatBar
const StatBar = ({ statName, value, maxValue = 255 }) => {
  return (
    <div className="stat-bar">
      <div className="stat-name">{statName}</div>
      <div className="stat-progress">
        <div
          className="stat-fill"
          style={{ width: `${(value / maxValue) * 100}%` }}
        ></div>
      </div>
      <div className="stat-value">{value}</div>
    </div>
  );
};

// Componente principale PokemonDetails
const PokemonDetails = () => {
  const [searchName, setSearchName] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/pokemon/${searchName.toLowerCase()}`);
      const pokemonData = response.data;

      const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
      const officialArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`;

      setPokemon({
        ...pokemonData,
        sprite: spriteUrl,
        officialArtwork: officialArtworkUrl,
      });
      setError('');
    } catch (err) {
      console.error(err);
      setError('Pokemon not found');
      setPokemon(null);
    }
  };

  return (
    <div className="pokemon-details">
      <h2>Pokémon Details</h2>
      <div className="search-container">
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter Pokémon Name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {pokemon && (
        <div className="card">
          <div className="sprites-section">
            <img src={pokemon.officialArtwork} alt={`${pokemon.name} official artwork`} className="official-artwork" />
          </div>
          <h3>{pokemon.name} (ID: {pokemon.id})</h3>
          <div className="types-container">
            <strong>Types:</strong>
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