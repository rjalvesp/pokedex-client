import React from "react";
import PokemonList from "./components/pokemons/PokemonList";
import PokemonDetails from "./components/pokemons/PokemonDetails";

export const BaseRoutes = [
  { path: "/", exact: true, element: <PokemonList /> },
  { path: "/pokemon/:id", exact: true, element: <PokemonDetails /> },
];
