// src/components/TypeIcon.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './TypeIcon.css';

const TypeIcon = ({ typeName }) => {
  const [iconUrl, setIconUrl] = useState(null);

  useEffect(() => {
    const fetchTypeIcon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeName.toLowerCase()}`);
        const icon = response.data.sprites?.["generation-iv"]?.["heartgold-soulsilver"]?.name_icon || null;
        setIconUrl(icon);
      } catch (error) {
        console.error(`Error fetching icon for type ${typeName}:`, error);
        setIconUrl(null); // Fallback in caso di errore
      }
    };

    fetchTypeIcon();
  }, [typeName]);

  return (
    <div className="type-icon-container">
      {iconUrl ? (
        <img src={iconUrl} alt={`${typeName} type icon`} className="type-icon" />
      ) : (
        <span className="fallback-type">{typeName}</span>
      )}
    </div>
  );
};

TypeIcon.propTypes = {
  typeName: PropTypes.string.isRequired,
};

export default TypeIcon;
