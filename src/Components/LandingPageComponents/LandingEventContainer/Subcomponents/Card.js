import React from "react";
import styled from "@emotion/styled";

const CardContainer = styled.div`
  padding: 20px;
  border: 1px solid #eee;
  border-left-width: 5px;
  border-radius: 3px;
  border-left-color: #3494c7;
  width: 543px;
  display: inline-block;
  vertical-align: top;
  margin-bottom: 10px;
`;

const CardName = styled.p`
  font-size: 24px;
  color: black;
`;

const RegisterButton = styled.button`
  background: #3494c7;
  border-color: #2f84cd;
  padding: 6px 12px;
  color: #fff;
  margin-top: 0.5em;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Card = ({ cardData }) => {
  return (
    <CardContainer>
      <CardName>{cardData.name}</CardName>
      <p>{cardData.description}</p>
      <ButtonContainer>
        <RegisterButton>Register</RegisterButton>
      </ButtonContainer>
    </CardContainer>
  );
};

export default Card;
