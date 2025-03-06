# Pokemon API Project

This project is a technical challenge designed to evaluate developers for a fullstack position at Convivo Studio. It involves creating a web application that interacts with the Pokemon API to display various information about Pokemon.

## Overview

The application allows users to:

- Search for Pokemon by name and display their image
- View Pokemon details including types and stats
- Navigate Pokemon by type
- View the evolution chain of a Pokemon

## Project Structure

The project is organized into three main features, each in its own branch:

- `feature/show-pokemon-image`: Basic Pokemon search and image display
- `feature/pokemon-details-and-types`: Extended Pokemon information and type navigation
- `feature/pokemon-evolution-chain`: Pokemon evolution chain visualization

## Features

### 1. Pokemon Image Viewer

- Enter a Pokemon name in the search field
- Submit to see the Pokemon's image
- Handles errors for invalid Pokemon names

### 2. Pokemon Details and Type Navigation

- Shows additional information about the Pokemon:
  - Name and ID
  - Types
  - Stats (HP, Attack, Defense, etc.)
- Click on a type to see other Pokemon of the same type
- Displays a list of Pokemon sharing the selected type

### 3. Pokemon Evolution Chain

- Shows the complete evolution chain for the selected Pokemon
- Displays the evolution stages in sequence
- Indicates when a Pokemon has no evolutions

## API Reference

This project uses the [PokeAPI](https://pokeapi.co/) with the following endpoints:

- `GET https://pokeapi.co/api/v2/pokemon/<name>` - Get Pokemon details
- `GET https://pokeapi.co/api/v2/type/<type>` - Get Pokemon by type
- `GET https://pokeapi.co/api/v2/pokemon-species/<name>` - Get Pokemon species info
- `GET <evolution-chain-url>` - Get Pokemon evolution chain

## Project Requirements

- Each feature should be implemented in its own git branch
- The backend should be built with Node.js
- The frontend can be implemented with React, Vue, Angular, or vanilla HTML/CSS/JavaScript
- The backend should process API responses to return only necessary data to the frontend
- Code and file organization should be clear and logical
- Documentation must explain how to run the project and list all requirements

## License

This project is created for evaluation purposes only.

## Contact

For inquiries about this project, contact sviluppo@basement11.com
