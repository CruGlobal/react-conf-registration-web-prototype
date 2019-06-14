import React from "react";
import styled from "@emotion/styled";

const NumberContainer = styled.div`
  background: whitet;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-family: sans-serif;
  font-size: 14px;
`;

const Title = styled.h3`
  margin-bottom: 5px;
  width: 100%;
  font-weight: 700;
  font-size: 14px;
`;

const InputField = styled.input`
  margin-bottom: 1em;
  padding: 6px 12px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  height: 34px;
`;

class NumberQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerBlock: {
        amount: 0,
        blockid: "",
        id: "",
        registrantId: "",
        value: ""
      }
    };
  }

  //componentDidMount(){
  //this.setState({
  //answerBlock: this.props.answerBlock
  //   })
  // }

  changeHandler = event => {
    this.setState({
      answerBlock: {
        ...this.state.answerBlock,
        value: event.target.value
      }
    });
  };

  render() {
    return (
      <>
        <NumberContainer>
          <Title>Number</Title>
          <InputField
            type='number'
            pattern='[0-9]*'
            placeholder='Number'
            onChange={this.changeHandler}
            value={this.state.answerBlock.value}
          />
        </NumberContainer>
      </>
    );
  }
}

export default NumberQuestion;
