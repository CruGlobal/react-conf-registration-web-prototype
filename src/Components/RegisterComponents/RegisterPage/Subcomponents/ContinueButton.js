import React from "react";
import styled from "@emotion/styled";

const ContinueButton = () => {
  return (
    <div>
      <Button>Continue</Button>
    </div>
  );
};

export default ContinueButton;

const Button = styled.button`
  background: #00a651;
  width: 429px;
  text-transform: uppercase;
  border: 1px solid transparent;
  border-color: #4cae4c;
  color: #fff;
  padding: 10px 16px;
  font-size: 18px;
  border-radius: 6px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  font-family: sans-serif;
  :hover {
    color: #fff;
    background-color: #449d44;
    border-color: #398439;
  }
`;
