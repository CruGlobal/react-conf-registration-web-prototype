import React from "react";
import styled from "@emotion/styled";
import _ from "lodash";

const content = {
  title: "Select Test",
  choices: [
    {
      value: "option 1",
      description: "",
      operand: "OR"
    },
    {
      value: "option 2",
      description: "",
      operand: "OR"
    },
    {
      value: "option 3",
      description: "",
      operand: "OR"
    }
  ]
};

export default class SelectQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerBlock: {
        blockId: "",
        id: "",
        registrantId: "",
        value: ""
      }
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     answerBlock: this.props.answerBlock
  //   });
  // }

  handleChange = event => {
    this.setState({
      answerBlock: {
        ...this.state.answerBlock,
        value: event.target.value
      }
    });
  };

  render() {
    return (
      <QuestionContainer>
        <Title>{content.title}</Title>
        <Option name='select' onChange={this.handleChange}>
          {_.map(content.choices, Choice => {
            return (
              <option key={Choice.value} value={Choice.value}>
                {Choice.value}
              </option>
            );
          })}
        </Option>
      </QuestionContainer>
    );
  }
}

const QuestionContainer = styled.div`
  background: white;
  display: flex;
  flex-direciton: row;
  flex-wrap: wrap;
  font-family: sans-serif;
  font-size: 14px;
`;

const Title = styled.div`
  margin-bottom: 5px;
  width: 100%;
  font-weight: 700;
`;

const Option = styled.select`
  border-radius: 4px;
  margin-bottom: 1em;
  padding: 6px 12px;
  width: 100%;
  border-width: 1px;
  border-color: rgb(204, 204, 204);
`;
