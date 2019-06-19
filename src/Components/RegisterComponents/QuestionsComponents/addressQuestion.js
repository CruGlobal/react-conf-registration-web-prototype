import React from "react";
import styled from "@emotion/styled";

const QuestionContainer = styled.div`
  background: white;
  display: flex;
  flex-direciton: row;
  flex-wrap: wrap;
  font-family: sans-serif;
  font-size: 14px;
  margin-bottom: 15px;
`;

const Title = styled.div`
  margin-bottom: 5px;
  width: 100%;
  font-weight: 700;
`;

const Line = styled.input`
  margin-bottom: 1em;

  width: 100%;
  height: 34px;
  padding: 6px 12px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const City = styled.input`
  font-size: 14px;
  margin-bottom: 1em;

  width: 276px;
  height: 34px;
  padding: 6px 12px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const State = styled.select`
  font-size: 14px;
  margin-bottom: 1em;
  padding: 6px 12px;
  width: 123px;
  margin-left: 15px;
  margin-right: 15px;
  height: 34px;
  padding: 6px 12px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #555;
`;

const Postal = styled.input`
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 1em;
  padding: 6px 12px;
  width: 123px;
  margin-left: 15px;
  height: 34px;
  padding: 6px 12px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default class AddressQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerBlock: {
        blockId: "",
        id: "",
        registrantId: "",
        value: {
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: ""
        }
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
    const newValue = this.state.answerBlock.value;
    let key = event.target.name;
    let value = event.target.value;
    newValue[key] = value;

    this.setState({
      answerBlock: {
        ...this.state.answerBlock,
        value: newValue
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
        <Line
          type="text"
          placeholder="Address Line 1"
          name="address1"
          value={this.state.answerBlock.value.address1}
          onChange={this.handleChange}
        />
        <Line
          type="text"
          placeholder="Address Line 2"
          name="address2"
          onChange={this.handleChange}
          value={this.state.answerBlock.value.address2}
        />
        <City
          type="text"
          placeholder="City"
          name="city"
          onChange={this.handleChange}
          value={this.state.answerBlock.value.city}
        />
        <State
          placeholder="State"
          name="state"
          onChange={this.handleChange}
          value={this.state.answerBlock.value.state}
        >
          <option value="">State</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </State>
        <Postal
          type="text"
          placeholder="Postal Code"
          name="zip"
          onChange={this.handleChange}
          value={this.state.answerBlock.value.zip}
        />
      </QuestionContainer>
    );
  }
}
