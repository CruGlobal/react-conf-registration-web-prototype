import React, { Component } from "react";

import styled from "@emotion/styled";

const QuestionContainer = styled.div`
  margin-bottom: 15px;
`;
const GridContainer = styled.div`
  grid-template-columns: repeat(1, 1fr);
  font-size: 14px;
`;
const QuestionTitle = styled.h6`
  font-size: 14px;
  font-weight: 700;
  font-family: sans-serif;
`;
const QuestionValue = styled.label`
  margin-left: 5px;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 700;
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

  handleChange = event => {
    const newValue = this.state.answerBlock.value;
    // Here we grab the event targets name to know which input field we are changing
    let key = event.target.name;
    // We are then grabbing the value from that input field
    let value = event.target.value;
    // We then set our copied states value to the new value, depending on which key or input field we are changing
    newValue[key] = value;
    // We then set the state of the old value to be the new value
    this.setState({
      answerBlock: {
        ...this.state.answerBlock,
        value: {
          ...this.state.answerBlock.value,
          value: value
        }
      }
    });
  };
  render() {
    return (
      <QuestionContainer>
        <QuestionTitle>Question</QuestionTitle>
        <GridContainer>
          <div>
            <input
              type="checkbox"
              name="option1"
              value="Option1"
              onChange={this.handleChange}
            />
            <QuestionValue>Option #1</QuestionValue>
          </div>
          <div>
            <input
              type="checkbox"
              name="option2"
              value="Option2"
              onChange={this.handleChange}
            />
            <QuestionValue>Option #2</QuestionValue>
          </div>
          <div>
            <input
              type="checkbox"
              name="option3"
              value="Option3"
              onChange={this.handleChange}
            />
            <QuestionValue>Option #3</QuestionValue>
          </div>
        </GridContainer>
      </QuestionContainer>
    );
  }
}

export default InputCheckBoxQuestions;
