import React, { useState, useEffect } from 'react';

function TypeNavigation({ type }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!type) return;

    const fetchPokemonByType = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/api/type/${type}`);
        if (!response.ok) {
          throw new Error('Errore nel recupero dei Pokémon per il tipo selezionato');
        }
        const data = await response.json();
        // Assumiamo che la risposta abbia una struttura: { type: 'electric', pokemon: [ 'pikachu', 'raichu', ... ] }
        setPokemonList(data.pokemon);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPokemonList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonByType();
  }, [type]);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h3>Pokémon di tipo "{type}"</h3>
      <ul>
        {pokemonList.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TypeNavigation;
