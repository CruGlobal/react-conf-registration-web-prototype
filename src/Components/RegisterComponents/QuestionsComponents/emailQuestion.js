import React, { Component } from "react";
import styled from "@emotion/styled";
const Question = styled.h6`
  font-size: 14px;
  font-weight: 700;
  font-family: sans-serif;
`;
const InputField = styled.input`
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const QuestionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;
class emailQuestion extends Component {
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
  componentDidMount() {
    this.setState({
      blockData: this.props.blockData
    });
    this.timer = setInterval(
      () =>
        this.getCurrentRegistration(
          `https://api.stage.eventregistrationtool.com/eventhub-api/rest/answers/${
            this.state.answerBlock.id
          }`,
          localStorage.getItem("crsToken")
        ),
      30000
    );
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
      answerBlock: {
        ...this.state.answerBlock,
        value: event.target.value
      }
    });
  };

  getCurrentRegistration = (url, authToken) => {
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
      <QuestionContainer>
        <Question>{this.props.blockData.title}</Question>
        <label>
          <InputField
            type="email"
            placeholder="example@domain.com"
            value={this.state.answerBlock.value}
            onChange={this.changeHandler}
          />
        </label>
      </QuestionContainer>
    );
  }
}
export default emailQuestion;
