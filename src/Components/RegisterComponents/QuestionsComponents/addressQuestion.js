import React from "react";
import styled from "@emotion/styled";

const QuestionContainer = styled.div`
  background: red;
  display: flex;
  flex-direciton: row;
  flex-wrap: wrap;
  font-family: sans-serif;
`;

const Title = styled.div`
  margin-bottom: 5px;
  width: 100%;
  background: white;
  font-weight: 700;
  font-size: 14px;
`;

const Line = styled.input`
  margin-bottom: 1em;
  padding: 6px 12px;
  width: 100%;
  border-radius: 4px;
  font-size: 14px;
`;

export default class AddressQuestion extends React.Component {
  render() {
    return (
      <QuestionContainer>
        <Title>Address</Title>
        <Line type='text' placeholder='Address Line 1' />
        <Line type='text' placeholder='Address Line 2' />
        <City type='text' placeholder='City' />
        <State />
        <Postal type='text' placeholder='Postal Code' />
      </QuestionContainer>
    );
  }
}
