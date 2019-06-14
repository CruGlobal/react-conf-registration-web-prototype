import React, { Component } from "react";
import styled from "@emotion/styled";
const QuestionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Question = styled.h6`
  text-size: 12px;
`;
const Format = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const InputField = styled.input`
  width: 260px;
  height: 34px;
  padding: 6px 12px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
class NameQuestions extends Component {
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
        <Question>Name</Question>
        <label>
          <Format>
            <InputField
              show-errors='group'
              type='text'
              placeholder='First Name'
            />
            <InputField
              show-errors='group'
              type='text'
              placeholder='Last Name'
            />
          </Format>
        </label>
      </QuestionContainer>
    );
  }
}
export default NameQuestions;
