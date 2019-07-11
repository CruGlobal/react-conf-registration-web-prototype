import React, { Component } from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { isSaving, dataChanged } from "../../../actions/";
import UUIDController from "../../../Controllers/uuidcontroller";
import Required from "../RegisterPage/Subcomponents/Required";
const UUID = new UUIDController();
let newID = UUID.createUUID();

class NumberQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueChanged: false,
      answerBlock: {
        amount: 0,
        blockId: "",
        id: "",
        registrantId: "",
        value: 0
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
    if (this.state.valueChanged) {
      this.updateAnswer(
        `https://api.stage.eventregistrationtool.com/eventhub-api/rest/answers/${
          this.state.answerBlock.id
        }`,
        localStorage.getItem("crsToken")
      ).then(() => {
        this.props.DataChanged(true);
      });
      this.props.IsSaving(true);
    }
    clearInterval(this.timer);
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
      <>
        <NumberContainer>
          <TitleContainer>
            <QuestionTitle>{this.props.blockData.title}</QuestionTitle>
            <Required isRequired={this.props.blockData.required} />
          </TitleContainer>
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
)(NumberQuestion);

const NumberContainer = styled.div`
  background: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-family: sans-serif;
  font-size: 14px;
  margin-bottom: 15px;
`;

const QuestionTitle = styled.h3`
  margin-bottom: 5px;
  width: 100%;
  font-weight: 700;
  font-size: 14px;
`;

const TitleContainer = styled.span`
  display: flex;
  flex-direction: row;
`;

const InputField = styled.input`
  margin-bottom: 1em;
  padding: 6px 12px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  height: 34px;
  color: #555;
`;
