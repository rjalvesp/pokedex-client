import * as R from "ramda";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetPokemonById } from "../../services/pokemons.service";
import SpinFC from "antd/lib/spin";
import { Tag } from "antd";
import Container from "../common/Container";
import Action from "../common/Action";
import ActionBar from "../common/ActionBar";
import RowDescriptorWithTags from "../common/RowDescriptorWithTags";
import PokeCard from "./PokeCard";
import Descriptor from "../common/Descriptor";

const fields = ["height", "weight", "type", "weaknesses"];

const Title = styled.h3`
  margin: 0 1rem;
`;

const PokeImage = styled.img`
  width: 150px;
  margin-bottom: 2rem;
`;

const PokeInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [nextEvolutions, setNextEvolutions] = useState(null);
  const [prevEvolutions, setPrevEvolutions] = useState(null);

  useEffect(() => {
    GetPokemonById(id).then(async (pokemon) => {
      const nextEvolutionsQuery = R.pipe(
        R.propOr([], "next_evolution"),
        R.map(R.pipe(R.prop("num"), Number)),
        R.reject(R.isNil),
        R.map(GetPokemonById)
      )(pokemon);
      const prevEvolutionsQuery = R.pipe(
        R.propOr([], "prev_evolution"),
        R.map(R.pipe(R.prop("num"), Number)),
        R.reject(R.isNil),
        R.map(GetPokemonById)
      )(pokemon);
      const nextEvolutionsResponse = await Promise.all(nextEvolutionsQuery);
      const prevEvolutionsResponse = await Promise.all(prevEvolutionsQuery);
      setPokemon(pokemon);
      setNextEvolutions(nextEvolutionsResponse);
      setPrevEvolutions(prevEvolutionsResponse);
    });
  }, [id]);

  if (!pokemon) {
    return <SpinFC />;
  }

  return (
    <Container>
      <ActionBar>
        <Action>
          <Link to="/">Go back</Link>
          <Title>
            {pokemon.num}-{pokemon.name}
          </Title>
        </Action>
      </ActionBar>
      <PokeInfo>
        <PokeImage src={pokemon.img}></PokeImage>
        {fields.map((field) => (
          <RowDescriptorWithTags
            key={`pokedetail-${field}`}
            descriptor={field}
            tags={pokemon[field]}
          />
        ))}
        <Descriptor>Previous Evolutions</Descriptor>
        <Row>
          {R.prop("length", prevEvolutions) ? (
            (prevEvolutions || []).map((evol) => (
              <PokeCard key={`pokeevol-${evol.id}`} pokemon={evol} />
            ))
          ) : (
            <Tag>None</Tag>
          )}
        </Row>
        <Descriptor>Next Evolutions</Descriptor>
        <Row>
          {R.prop("length", nextEvolutions) ? (
            (nextEvolutions || []).map((evol) => (
              <PokeCard key={`pokeevol-${evol.id}`} pokemon={evol} />
            ))
          ) : (
            <Tag>None</Tag>
          )}
        </Row>
      </PokeInfo>
    </Container>
  );
};

export default PokemonDetails;
