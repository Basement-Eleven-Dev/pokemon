import React, { useState, useEffect } from 'react';
import PokemonDetails from './components/PokemonDetails';
import PokemonByType from './components/PokemonByType';
import PokemonEvolutionChain from './components/PokemonEvolutionChain';
import './App.css'; // Stili globali

/**
 * Componente principale dell'applicazione.
 * Mostra un header con un men  per selezionare
 * tra le tre funzionalit : Pokémon Details, Pokémon by Type e Evolution Chain.
 * In base alla selezione, mostra il componente corrispondente
 * nella parte principale della pagina.
 */
function App() {
  const [activeTab, setActiveTab] = useState('details');
  const [detailsSprite, setDetailsSprite] = useState(null);
  const [typeSprite, setTypeSprite] = useState(null);
  const [evolutionSprite, setEvolutionSprite] = useState(null);

  useEffect(() => {
    // Recupera lo sprite per il bottone dei dettagli (Poké Ball)
    fetch('https://pokeapi.co/api/v2/item/poke-ball/')
      .then(response => response.json())
      .then(data => setDetailsSprite(data.sprites.default))
      .catch(error => console.error('Errore nel recupero della Poké Ball:', error));

    // Recupera lo sprite per il bottone "Pokémon by Type" (Old Amber)
    fetch('https://pokeapi.co/api/v2/item/old-amber/')
      .then(response => response.json())
      .then(data => setTypeSprite(data.sprites.default))
      .catch(error => console.error('Errore nel recupero di Old Amber:', error));

    // Recupera lo sprite per il bottone "Evolution Chain" (Everstone)
    fetch('https://pokeapi.co/api/v2/item/everstone/')
      .then(response => response.json())
      .then(data => setEvolutionSprite(data.sprites.default))
      .catch(error => console.error('Errore nel recupero di Everstone:', error));
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Pokémon API Project</h1>
        <nav className="nav-container">
          <button 
            onClick={() => setActiveTab('details')}
            className={activeTab === 'details' ? 'active' : ''}
          >
            {detailsSprite && (
              <img src={detailsSprite} alt="Poké Ball" className="button-sprite" />
            )}
            Pokémon Details
          </button>
          <button 
            onClick={() => setActiveTab('type')}
            className={activeTab === 'type' ? 'active' : ''}
          >
            {typeSprite && (
              <img src={typeSprite} alt="Old Amber" className="button-sprite" />
            )}
            Pokémon by Type
          </button>
          <button 
            onClick={() => setActiveTab('evolution')}
            className={activeTab === 'evolution' ? 'active' : ''}
          >
            {evolutionSprite && (
              <img src={evolutionSprite} alt="Everstone" className="button-sprite" />
            )}
            Evolution Chain
          </button>
        </nav>
      </header>
      <main>
        {activeTab === 'details' && <PokemonDetails />}
        {activeTab === 'type' && <PokemonByType />}
        {activeTab === 'evolution' && <PokemonEvolutionChain />}
      </main>
    </div>
  );
}

export default App;
