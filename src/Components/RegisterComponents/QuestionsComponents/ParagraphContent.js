import React from "react";
import styled from "@emotion/styled";

const ParagraphContent = ({ blockData }) => {
  return (
    <ParagraphContainer>
      <label>
        <ParagraphTitle>{blockData.title}</ParagraphTitle>
      </label>
      <ParagraphInfo>{blockData.content.paragraph}</ParagraphInfo>
    </ParagraphContainer>
  );
};

export default ParagraphContent;

const ParagraphContainer = styled.div`
  padding: 0px 0px 10px;
  margin: 0px 0px 15px;
`;

const ParagraphTitle = styled.span`
  font-family: sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #333;
`;

const ParagraphInfo = styled.p`
  margin: 0 0 10px;
  font-family: sans-serif;
  font-size: 14px;
  color: #333;
`;
