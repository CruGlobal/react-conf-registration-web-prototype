import React from "react";
import styled from "@emotion/styled";

class NumberQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueChanged: false,
      answerBlock: {
        amount: 0,
        blockid: "",
        id: "",
        registrantId: "",
        value: 0
      }
    };
  }

  componentDidMount() {
    this.setState({
      blockData: this.props.blockData
    });
    this.timer = setInterval(() => {
      if (this.state.valueChanged) {
        this.getCurrentRegistration(
          `https://api.stage.eventregistrationtool.com/eventhub-api/rest/answers/${
            this.state.answerBlock.id
          }`,
          localStorage.getItem("crsToken")
        );
      } 
    }, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentWillReceiveProps() {
    if (this.props.answer) {
      this.setState({
        answerBlock: this.props.answer
      });
    }
  }

  changeHandler = event => {
    this.setState({
      valueChanged: true,
      answerBlock: {
        ...this.state.answerBlock,
        value: parseInt(event.target.value)
      }
    });
  };

  getCurrentRegistration = (url, authToken) => {
    this.setState({
      valueChanged: false
    });
    return fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `${authToken}`
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(this.state.answerBlock)
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
