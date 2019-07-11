import React, { Component } from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { isSaving, dataChanged } from "../../../actions/";
import UUIDController from "../../../Controllers/uuidcontroller";
import Required from "../RegisterPage/Subcomponents/Required";

const UUID = new UUIDController();
let newID = UUID.createUUID();

class RadioQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueChanged: false,
      answerBlock: {
        blockId: "",
        id: "",
        registrantId: "",
        value: ""
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

  componentWillReceiveProps() {}

  handleChange = event => {
    this.setState({
      valueChanged: true,
      answerBlock: {
        ...this.state.answerBlock,
        value: event.target.value
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
        <Options>
          <Choice>
            {this.props.blockData.content.choices.map(Choice => {
              return (
                <div key={Choice.value}>
                  <Selector
                    type="radio"
                    id="option"
                    name="radio"
                    checked={Choice.value === this.state.answerBlock.value}
                    value={Choice.value}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="option">{Choice.value}</label>
                  <div className="check" />
                </div>
              );
            })}
          </Choice>
        </Options>
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
)(RadioQuestion);

const QuestionContainer = styled.div`
  background: white;
  display: flex;
  flex-direciton: row;
  flex-wrap: wrap;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const TitleContainer = styled.span`
  display: flex;
  flex-direction: row;
`;

const QuestionTitle = styled.div`
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
