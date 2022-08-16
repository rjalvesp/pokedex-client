import * as R from "ramda";
import styled from "styled-components";
import React from "react";
import { Tag } from "antd";
import Descriptor from "./Descriptor";

const Row = styled.div`
  padding: 0.5rem 0;
  display: flex;
  flex-direction: row;
`;

const RowDescriptorWithTags = ({ descriptor, tags }) => {
  const capitalCasedDescriptor = R.pipe(
    R.over(R.lensProp("0"), R.toUpper),
    R.values,
    R.join("")
  )(descriptor);

  return (
    <Row>
      <Descriptor>{capitalCasedDescriptor}:</Descriptor>
      {R.is(Array, tags) ? (
        tags.map((tag) => <Tag key={Math.random()}>{tag}</Tag>)
      ) : (
        <Tag>{tags}</Tag>
      )}
    </Row>
  );
};

export default RowDescriptorWithTags;
