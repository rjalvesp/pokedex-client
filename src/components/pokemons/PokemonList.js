import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { AutoComplete, Select } from "antd";
import {
  GetPokemons,
  GetPokemonTypes,
  GetPokemonWeaknesses,
} from "../../services/pokemons.service";
import SpinFC from "antd/lib/spin";
import Container from "../common/Container";
import ActionBar from "../common/ActionBar";
import Action from "../common/Action";
import Descriptor from "../common/Descriptor";
import PokeCard from "./PokeCard";

const PokeAutoComplete = styled(AutoComplete)`
  width: 300px;
`;

const PokeSelect = styled(Select)`
  width: 300px;
`;

const PokeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

const PokemonList = () => {
  const [loaded, setLoaded] = useState(false);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [types, setTypes] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);

  const onTypesChange = (types) => {
    setSearchParams({ ...searchParams, types });
  };

  const onWeaknessesChange = (weaknesses) => {
    setSearchParams({ ...searchParams, weaknesses });
  };

  const onNameChange = (name) => {
    setSearchParams({ ...searchParams, name });
  };

  useEffect(() => {
    if (!loaded) {
      return;
    }

    GetPokemons(searchParams).then((value) => setFilteredPokemons(value));
  }, [searchParams]);

  useEffect(() => {
    if (loaded) {
      return;
    }
    Promise.all([
      GetPokemons(),
      GetPokemonTypes(),
      GetPokemonWeaknesses(),
    ]).then(([pokeList, pokeTypes, pokeWeaknesses]) => {
      setFilteredPokemons(pokeList);
      setPokemons(pokeList);
      setTypes(pokeTypes);
      setWeaknesses(pokeWeaknesses);
      setLoaded(true);
    });
  }, []);

  if (!loaded) {
    return <SpinFC />;
  }

  return (
    <Container>
      <ActionBar>
        <Action>
          <Descriptor>Name: </Descriptor>
          <PokeAutoComplete onChange={onNameChange}>
            {pokemons.map(({ name }) => (
              <PokeAutoComplete.Option key={name} value={name}>
                {name}
              </PokeAutoComplete.Option>
            ))}
          </PokeAutoComplete>
        </Action>
        <Action>
          <Descriptor>Types: </Descriptor>
          <PokeSelect mode="tags" defaultValue={[]} onChange={onTypesChange}>
            {types.map((type) => (
              <PokeSelect.Option key={type}>{type}</PokeSelect.Option>
            ))}
          </PokeSelect>
        </Action>
        <Action>
          <Descriptor>Weaknesses: </Descriptor>
          <PokeSelect
            mode="tags"
            defaultValue={[]}
            onChange={onWeaknessesChange}
          >
            {weaknesses.map((weakness) => (
              <PokeSelect.Option key={weakness}>{weakness}</PokeSelect.Option>
            ))}
          </PokeSelect>
        </Action>
      </ActionBar>
      <PokeList>
        {filteredPokemons.map((pokemon) => {
          return <PokeCard key={`pokelist-${pokemon.num}`} pokemon={pokemon} />;
        })}
      </PokeList>
    </Container>
  );
};

export default PokemonList;
