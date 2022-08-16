import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Tag } from "antd";
import Descriptor from "../common/Descriptor";

const Title = styled.div`
  display: flex;
`;

const TitleText = styled.div`
  margin-right: 0.5rem;
  &:last-child {
    margin-right: 0;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 0;
  &.center {
    justify-content: center;
  }
`;

const PokeCard = ({ pokemon }) => {
  return (
    <Card
      title={
        <Link to={`/pokemon/${pokemon.id}`}>
          <Title>
            <TitleText>{pokemon.num}</TitleText>
            <TitleText>{pokemon.name}</TitleText>
          </Title>
        </Link>
      }
    >
      <Row className="center">
        <img src={pokemon.img}></img>
      </Row>
      <Row>
        <Descriptor>Type:</Descriptor>
        {pokemon.type.map((type) => (
          <Tag key={`pokelist-${pokemon.num}-type-${type}`}>{type}</Tag>
        ))}
      </Row>
      <Row>
        <Descriptor>Weaknesses:</Descriptor>
        {pokemon.weaknesses.map((weakness) => (
          <Tag key={`pokelist-${pokemon.num}-type-${weakness}`}>{weakness}</Tag>
        ))}
      </Row>
    </Card>
  );
};

export default PokeCard;
