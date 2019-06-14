import React, { Component } from "react";
import styled from "@emotion/styled";
const Question = styled.h6`
  font-size: 14px;
  font-weight: 700;
  font-family: sans-serif;
`;
const InputField = styled.input`
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const QuestionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;
class emailQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerBlock: {
        blockId: "",
        id: "",
        registrationId: "",
        value: ""
      }
    };
  }
  render() {
    return (
      <QuestionContainer>
        <Question>Email</Question>
        <label>
          <InputField type="text" placeholder="example@domain.com" />
        </label>
      </QuestionContainer>
    );
  }
}
export default emailQuestion;
