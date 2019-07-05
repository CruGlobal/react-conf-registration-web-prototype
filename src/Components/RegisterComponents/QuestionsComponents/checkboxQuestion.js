import React, { Component } from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { isSaving, dataChanged } from "../../../actions/";
import UUIDController from "../../../Controllers/uuidcontroller";
import Required from "../RegisterPage/Subcomponents/Required";
const UUID = new UUIDController();
let newID = UUID.createUUID();

class InputCheckBoxQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueChanged: false,
      answerBlock: {
        blockId: "",
        id: "",
        registrantId: "",
        value: {}
      }
    };
  }

  componentDidMount() {
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

  componentWillReceiveProps() {
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
  }

  handleChange = event => {
    const newValue = this.state.answerBlock.value;
    // Here we grab the event targets name to know which input field we are changing
    let key = event.target.name;
    // We are then grabbing the value from that input field
    let value = event.target.checked;
    // We then set our copied states value to the new value, depending on which key or input field we are changing
    newValue[key] = value;
    // We then set the state of the old value to be the new value
    this.setState({
      valueChanged: true,
      answerBlock: {
        ...this.state.answerBlock,
        value: {
          ...this.state.answerBlock.value,
          [key]: value
        }
      }
    });
  };

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

  render() {
    return (
      <QuestionContainer>
        <TitleContainer>
          <QuestionTitle>{this.props.blockData.title}</QuestionTitle>
          <Required isRequired={this.props.blockData.required} />
        </TitleContainer>
        <GridContainer>
          {this.props.blockData.content.choices.map(choice => {
            return (
              <div key={choice.value}>
                <input
                  type="checkbox"
                  name={choice.value}
                  onChange={this.handleChange}
                  checked={this.state.answerBlock.value[choice.value] || false}
                />
                <QuestionValue>{choice.value}</QuestionValue>
              </div>
            );
          })}
        </GridContainer>
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
)(InputCheckBoxQuestions);

const QuestionContainer = styled.div`
  margin-bottom: 15px;
`;
const GridContainer = styled.div`
  grid-template-columns: repeat(1, 1fr);
  font-size: 14px;
`;

const TitleContainer = styled.span`
  display: flex;
  flex-direction: row;
`;

const QuestionTitle = styled.h6`
  font-size: 14px;
  font-weight: 700;
  font-family: sans-serif;
`;
const QuestionValue = styled.label`
  margin-left: 5px;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 700;
`;
