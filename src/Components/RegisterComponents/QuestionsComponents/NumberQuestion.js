import React from "react";
import styled from "@emotion/styled";

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

  componentDidMount() {
    this.setState({
      blockData: this.props.blockData
    });
  }

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
          <Title>{this.props.blockData.title}</Title>
          <InputField
            type="number"
            pattern="[0-9]*"
            placeholder="Number"
            onChange={this.changeHandler}
            value={this.state.answerBlock.value}
          />
        </NumberContainer>
      </>
    );
  }
}

export default NumberQuestion;

const NumberContainer = styled.div`
  background: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-family: sans-serif;
  font-size: 14px;
  margin-bottom: 15px;
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
