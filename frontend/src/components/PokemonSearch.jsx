// src/components/PokemonSearch.jsx
import React, { useState } from 'react';

function PokemonSearch() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/pokemon/${pokemonName}`);
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await response.json();
      setPokemonData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setPokemonData(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Inserisci il nome del Pokemon"
        />
        <button type="submit">Cerca</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {pokemonData && (
        <div>
          <h2>{pokemonData.name} (ID: {pokemonData.id})</h2>
          <img src={pokemonData.image} alt={pokemonData.name} />
          <p>Tipi: {pokemonData.types.join(', ')}</p>
          <ul>
            {pokemonData.stats.map(stat => (
              <li key={stat.name}>{stat.name}: {stat.value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokemonSearch;
