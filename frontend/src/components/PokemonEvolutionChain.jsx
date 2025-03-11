// src/components/PokemonEvolutionChain.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './PokemonEvolutionChain.css'; // Definisci qui i tuoi stili

const PokemonEvolutionChain = () => {
  const [searchName, setSearchName] = useState('');
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/evolution/${searchName.toLowerCase()}`);
      setEvolutionChain(response.data.evolutionChain);
      setError('');
    } catch (err) {
      setError(`Evolution chain not found for "${searchName}"`);
      setEvolutionChain([]);
    }
  };

  return (
    <div className="pokemon-evolution-chain">
      <h2>Pokemon Evolution Chain</h2>
      <div className="search-container">
        <input 
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter Pokemon Name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {evolutionChain.length > 0 && (
        <div className="chain-container">
          <h3>Evolution Chain:</h3>
          <ul>
            {evolutionChain.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonEvolutionChain;
