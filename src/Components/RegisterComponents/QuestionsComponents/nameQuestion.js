import React, { Component } from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { isSaving, dataChanged } from "../../../actions/";
import UUIDController from "../../../Controllers/uuidcontroller";
import PropTypes from "prop-types";
import Required from "../RegisterPage/Subcomponents/Required";
const UUID = new UUIDController();
let newID = UUID.createUUID();

class NameQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueChanged: false,
      answerBlock: {
        blockId: "",
        id: "",
        registrantId: "",
        value: {
          firstName: "",
          lastName: ""
        }
      }
    };
  }

  componentDidMount() {
    if (this.props.answer) {
      this.setState({
        answerBlock: this.props.answer
      });
    } else {
      this.setState({
        valueChanged: true,
        answerBlock: {
          ...this.state.answerBlock,
          blockId: this.props.blockData.id,
          id: newID,
          registrantId: this.props.currentUser[0].id
        }
      });
    }
    this.setState({
      blockData: this.props.blockData
    });
    this.timer = setInterval(() => {
      if (this.state.valueChanged) {
        this.updateAnswer(
          `https://api.stage.eventregistrationtool.com/eventhub-api/rest/answers/${
            this.state.answerBlock.id
          }`,
          localStorage.getItem("crsToken")
        );
        this.props.IsSaving(true);
        this.props.DataChanged(true);
      }
    }, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateAnswer = (url, authToken) => {
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
    }).then(() => {
      this.props.IsSaving(false);
    });
  };

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
        <TitleContainer>
          <QuestionTitle>{this.props.blockData.title}</QuestionTitle>
          <Required isRequired={this.props.blockData.required} />
        </TitleContainer>
        <label>
          <InputContainer>
            <InputField
              required={this.props.blockData.required}
              show-errors="group"
              type="text"
              placeholder="First Name"
              name="firstName"
              value={this.state.answerBlock.value.firstName}
              onChange={this.handleChange}
            />
            <InputField
              required={this.props.blockData.required}
              show-errors="group"
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={this.state.answerBlock.value.lastName}
              onChange={this.handleChange}
            />
          </InputContainer>
        </label>
      </QuestionContainer>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    IsSaving: boolean => {
      dispatch(isSaving(boolean));
    },
    DataChanged: boolean => {
      dispatch(dataChanged(boolean));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameQuestions);

NameQuestions.propTypes = {
  updateAnswer: PropTypes.func,
  handleChange: PropTypes.func,
  IsSaving: PropTypes.func,
  answer: PropTypes.shape({
    blockId: PropTypes.string,
    id: PropTypes.string,
    registrantId: PropTypes.string,
    value: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string
    })
  })
};

const QuestionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const TitleContainer = styled.span`
  display: flex;
  flex-direction: row;
`;
const QuestionTitle = styled.h3`
  font-size: 14px;
  color: #333;
  font-weight: 700;
  font-family: sans-serif;
`;
const InputContainer = styled.div`
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
  color: #555;
`;
