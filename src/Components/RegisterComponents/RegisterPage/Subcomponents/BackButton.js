import React from "react";
import styled from "@emotion/styled";

const BackButton = ({ history }) => {
  return (
    <div>
      <Button
        onClick={() => {
          history.goBack();
        }}
      >
        Go Back
      </Button>
    </div>
  );
};

export default BackButton;

const Button = styled.button`
  background: #f4f4f4;
  width: 123px;
  border: 1px solid transparent;
  border-color: #ccc;
  color: #9b9b9b;
  padding: 10px 16px;
  font-size: 18px;
  border-radius: 6px;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  font-family: sans-serif;
  :hover {
    background: #e2e2e2;
    color: #333;
    border-color: #ccc;
    text-decoration: none;
  }
`;
