import React from "react";
import styled from "@emotion/styled";
import _ from "lodash";

const content = {
  title: "Radio Test",
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

export default class RadioQuestion extends React.Component {
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
        <Options>
          <Choice>
            {_.map(content.choices, Choice => {
              return (
                <div key={Choice.value}>
                  <Selector
                    type='radio'
                    id='option'
                    name='radio'
                    value={Choice.value}
                    onChange={this.handleChange}
                  />
                  <label htmlFor='option'>{Choice.value}</label>
                  <div className='check' />
                </div>
              );
            })}
          </Choice>
        </Options>
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
  font-weight: 700;
`;

const Title = styled.div`
  margin-bottom: 5px;
  width: 100%;
`;

const Options = styled.ul`
  list-style: none;
  margin-bottom: 1em;
  padding: 0px;
  width: 100%;
`;

const Choice = styled.li`
  padding-left: 20px;
  margin-left: -4px;
`;

const Selector = styled.input`
  margin-right: 4px;
  margin-left: -15px;
`;
