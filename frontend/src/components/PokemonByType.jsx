import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TypeIcon from './TypeIcon';
import './PokemonByType.css';

// Funzione per estrarre l'ID del Pokémon dalla URL
const getPokemonIdFromUrl = (url) => {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
};

const PokemonByType = () => {
  const [searchType, setSearchType] = useState('');
  const [typeData, setTypeData] = useState(null);
  const [error, setError] = useState('');
  const [typeSuggestions, setTypeSuggestions] = useState([]);

  useEffect(() => {
    // Recupera la lista dei tipi dalla PokeAPI
    const fetchTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        setTypeSuggestions(response.data.results.map(t => t.name));
      } catch (err) {
        console.error('Errore nel caricamento dei tipi', err);
      }
    };
    fetchTypes();
  }, []);

  const handleSearch = async () => {
    if (!searchType) return;
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${searchType.toLowerCase()}`);
      setTypeData(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Tipo non trovato');
      setTypeData(null);
    }
  };

  return (
    <div className="pokemon-by-type">
      <div className="search-container">
        <input
          type="text"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          placeholder="Inserisci il tipo"
          list="type-suggestions"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
        <datalist id="type-suggestions">
          {typeSuggestions
            .filter(type => type.includes(searchType.toLowerCase()))
            .map((type, index) => (
              <option key={index} value={type} />
            ))}
        </datalist>
      </div>
      {error && <p className="error">{error}</p>}
      {typeData && (
        <div className="type-details">
          <div className="type-header">
            <TypeIcon typeName={typeData.name} />
            <h3>{typeData.name[0].toUpperCase() + typeData.name.slice(1)}</h3>
          </div>
          <p><strong>Numero di Pokémon:</strong> {typeData.pokemon.length}</p>
          <ul className="pokemon-list">
            {typeData.pokemon.map((entry, index) => {
              const id = getPokemonIdFromUrl(entry.pokemon.url);
              const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
              return (
                <li key={index} className="pokemon-item">
                  <img src={spriteUrl} alt={entry.pokemon.name} className="pokemon-sprite" />
                  <span>{entry.pokemon.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonByType;
