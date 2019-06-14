import React from "react";
import styled from "@emotion/styled";

const CampusContainer = styled.div`
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
  border-width: 1px;
  border-color: rgb(204, 204, 204);
`;

class CampusQuestion extends React.Component {
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
        <CampusContainer>
          <Title>Campus</Title>
          <InputField
            type='text'
            placeholder='Campus'
            value={this.state.answerBlock.value}
            onChange={this.changeHandler}
          />
        </CampusContainer>
      </>
    );
  }
}

export default CampusQuestion;
