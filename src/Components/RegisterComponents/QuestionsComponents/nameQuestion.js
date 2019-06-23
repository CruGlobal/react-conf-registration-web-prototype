import React, { Component } from "react";
import styled from "@emotion/styled";

class NameQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueChanged: false,
      disabled: false,
      answerBlock: {
        blockId: "",
        id: "",
        registrationId: "",
        value: {
          firstName: "",
          lastName: ""
        }
      }
    };
  }

  componentDidMount() {
    this.setState({
      blockData: this.props.blockData
    });
    this.timer = setInterval(() => {
      if (this.state.valueChanged) {
        this.setState({
          disabled: true
        });
        this.getCurrentRegistration(
          `https://api.stage.eventregistrationtool.com/eventhub-api/rest/answers/${
            this.state.answerBlock.id
          }`,
          localStorage.getItem("crsToken")
        ).then(() => {
          this.setState({
            disabled: false
          });
        });
      }
    }, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

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

  componentWillReceiveProps() {
    if (this.props.answer) {
      this.setState({
        answerBlock: this.props.answer
      });
    }
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
      valueChanged: true,
      answerBlock: {
        ...this.state.answerBlock,
        value: newValue
      }
    });
  };

  render() {
    return (
      <QuestionContainer>
        <QuestionTitle>{this.props.blockData.title}</QuestionTitle>
        <label>
          <Format>
            <InputField
              show-errors="group"
              type="text"
              placeholder="First Name"
              name="firstName"
              value={this.state.answerBlock.value.firstName}
              disabled={this.state.disabled}
              onChange={this.handleChange}
            />
            <InputField
              show-errors="group"
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={this.state.answerBlock.value.lastName}
              onChange={this.handleChange}
              disabled={this.state.disabled}
            />
          </Format>
        </label>
      </QuestionContainer>
    );
  }
}
export default NameQuestions;

const QuestionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;
const QuestionTitle = styled.h3`
  font-size: 14px;
  color: #333;
  font-weight: 700;
  font-family: sans-serif;
`;
const Format = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const InputField = styled.input`
  width: 260px;
  height: 34px;
  padding: 6px 12px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
