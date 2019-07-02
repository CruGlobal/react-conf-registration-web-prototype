import React from "react";
import styled from "@emotion/styled";

const Required = ({ isRequired }) => {
  if (isRequired) {
    return <RequiredMarker>*</RequiredMarker>;
  } else {
    return null;
  }
};

export default Required;

const RequiredMarker = styled.em`
  font-size: 14px;
  color: #c00;
  font-family: sams-serif;
  margin-top: -5px;
`;
