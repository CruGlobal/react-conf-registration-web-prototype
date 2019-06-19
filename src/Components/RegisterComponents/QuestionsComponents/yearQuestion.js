import React from "react";
import styled from "@emotion/styled";

export default class YearQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerBlock: {
        blockId: "",
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

  handleChange = event => {
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
        <Title>{this.props.blockData.title}</Title>
        <Options>
          <Choice>
            <Selector
              type="radio"
              id="fresh-option"
              name="yearInSchool"
              value="Freshman"
              checked={this.state.answerBlock.value === "Freshman"}
              onChange={this.handleChange}
            />
            <label htmlFor="fresh-option">Freshman</label>
            <div className="check" />
          </Choice>

          <Choice>
            <Selector
              type="radio"
              id="soph-option"
              name="yearInSchool"
              value="Sophomore"
              onChange={this.handleChange}
              checked={this.state.answerBlock.value === "Sophomore"}
            />
            <label htmlFor="soph-option">Sophomore</label>
            <div className="check" />
          </Choice>

          <Choice>
            <Selector
              type="radio"
              id="jr-option"
              name="yearInSchool"
              value="Junior"
              onChange={this.handleChange}
              checked={this.state.answerBlock.value === "Junior"}
            />
            <label htmlFor="jr-option">Junior</label>
            <div className="check" />
          </Choice>

          <Choice>
            <Selector
              type="radio"
              id="senior-option"
              name="yearInSchool"
              value="Senior"
              onChange={this.handleChange}
              checked={this.state.answerBlock.value === "Senior"}
            />
            <label htmlFor="senior-option">Senior</label>
            <div className="check" />
          </Choice>

          <Choice>
            <Selector
              type="radio"
              id="g-option"
              name="yearInSchool"
              value="Graduate Student"
              onChange={this.handleChange}
              checked={this.state.answerBlock.value === "Graduate Student"}
            />
            <label htmlFor="g-option">Graduate Student</label>
            <div className="check" />
          </Choice>
        </Options>
      </QuestionContainer>
    );
  }
}

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

const Title = styled.div`
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
