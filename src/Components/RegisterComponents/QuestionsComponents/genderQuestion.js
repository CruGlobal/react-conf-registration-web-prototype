import React from "react";
import styled from "@emotion/styled";

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

export default class GenderQuestion extends React.Component {
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
        <Title>Gender</Title>
        <Options>
          <Choice>
            <Selector
              type='radio'
              id='m-option'
              name='gender'
              value={"M"}
              onChange={this.handleChange}
            />
            <label htmlFor='m-option'>Male</label>
            <div className='check' />
          </Choice>

          <Choice>
            <Selector
              type='radio'
              id='f-option'
              name='gender'
              value={"F"}
              onChange={this.handleChange}
            />
            <label htmlFor='f-option'>Female</label>
            <div className='check' />
          </Choice>
        </Options>
      </QuestionContainer>
    );
  }
}
