import React, { Component } from "react";

import styled from "@emotion/styled";
const GridContainer = styled.h6`
  grid-template-columns: repeat(1, 1fr);
  text-size: 12px;
`;
const Question = styled.h6`
  text-size: 12px;
`;
const Space = styled.label`
  margin-left: 5px;
`;
class InputCheckBoxQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerBlock: {
        blockId: "",
        id: "",
        registrationId: "",
        value: {}
      }
    };
  }
  render() {
    return (
      <>
        <Question>Question</Question>
        <GridContainer>
          <div>
            <input type='checkbox' name='option1' value='Option1' />
            <Space>Option #1</Space>
          </div>
          <div>
            <input type='checkbox' name='option2' value='Option2' />
            <Space>Option #2</Space>
          </div>
          <div>
            <input type='checkbox' name='option3' value='Option3' />
            <Space>Option #3</Space>
          </div>
        </GridContainer>
      </>
    );
  }
}

export default InputCheckBoxQuestions;
