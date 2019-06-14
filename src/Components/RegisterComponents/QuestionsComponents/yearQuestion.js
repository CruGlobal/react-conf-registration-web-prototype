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

export default class YearQuestion extends React.Component {
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
              id='fresh-option'
              name='yearInSchool'
              value='Freshman'
              onChange={this.handleChange}
            />
            <label htmlFor='fresh-option'>Freshman</label>
            <div className='check' />
          </Choice>

          <Choice>
            <Selector
              type='radio'
              id='soph-option'
              name='yearInSchool'
              value='Sophomore'
              onChange={this.handleChange}
            />
            <label htmlFor='soph-option'>Sophomore</label>
            <div className='check' />
          </Choice>

          <Choice>
            <Selector
              type='radio'
              id='jr-option'
              name='yearInSchool'
              value='Junior'
              onChange={this.handleChange}
            />
            <label htmlFor='jr-option'>Junior</label>
            <div className='check' />
          </Choice>

          <Choice>
            <Selector
              type='radio'
              id='senior-option'
              name='yearInSchool'
              value='Senior'
              onChange={this.handleChange}
            />
            <label htmlFor='senior-option'>Senior</label>
            <div className='check' />
          </Choice>

          <Choice>
            <Selector
              type='radio'
              id='g-option'
              name='yearInSchool'
              value='Graduate Student'
              onChange={this.handleChange}
            />
            <label htmlFor='g-option'>Graduate Student</label>
            <div className='check' />
          </Choice>
        </Options>
      </QuestionContainer>
    );
  }
}
