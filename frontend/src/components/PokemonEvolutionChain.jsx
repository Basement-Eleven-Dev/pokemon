import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonEvolutionChain.css';

// Funzione per ottenere lo sprite del Pokémon
const getPokemonSprite = (name) => {
  return `https://img.pokemondb.net/sprites/home/normal/${name.toLowerCase()}.png`;
};

const PokemonEvolutionChain = () => {
  const [searchName, setSearchName] = useState('');
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);

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
      <div className="search-container">
        <input 
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter Pokémon Name"
          className="search-input"
          list="pokemon-suggestions"
        />
        <datalist id="pokemon-suggestions">
          {suggestions.filter(name => name.includes(searchName.toLowerCase())).slice(0, 10).map((name, index) => (
            <option key={index} value={name} />
          ))}
        </datalist>
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {evolutionChain.length > 0 && (
        <div className="chain-container">
          <h3>Evolution Chain:</h3>
          <ul className="evolution-list">
            {evolutionChain.map((name, index) => (
              <li key={index} className="evolution-item">
                <div className="card">
                  <img src={getPokemonSprite(name)} alt={name} className="pokemon-sprite" />
                  <p className="pokemon-name">{name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonEvolutionChain;
