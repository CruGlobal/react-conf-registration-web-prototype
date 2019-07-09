import React from "react";
import styled from "@emotion/styled";
import PaymentEntry from "./PaymentEntry";

export default class PaymentMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentType: ""
    };
  }

  handleChange = event => {
    this.setState({
      paymentType: event.target.value
    });
  };

  render() {
    return (
      <>
        <QuestionContainer>
          <TitleContainer>
            <QuestionTitle>Payment Method</QuestionTitle>
          </TitleContainer>
          <Options>
            <Choice>
              <Selector
                type="radio"
                id="Card"
                name="paymentType"
                value="Card"
                checked={this.state.paymentType === "Card"}
                onChange={this.handleChange}
              />
              <label htmlFor="Card">Credit Card</label>
              <div className="check" />
            </Choice>

            <Choice>
              <Selector
                type="radio"
                id="Check"
                name="paymentType"
                value="Check"
                checked={this.state.paymentType === "Check"}
                onChange={this.handleChange}
              />
              <label htmlFor="Check">Check</label>
              <div className="check" />
            </Choice>

            <Choice>
              <Selector
                type="radio"
                id="Transfer"
                name="paymentType"
                value="Transfer"
                checked={this.state.paymentType === "Transfer"}
                onChange={this.handleChange}
              />
              <label htmlFor="Transfer">
                Cru Staff / Ministry Account Transfer
              </label>
              <div className="check" />
            </Choice>

            <Choice>
              <Selector
                type="radio"
                id="Scholarship"
                name="paymentType"
                value="Scholarship"
                checked={this.state.paymentType === "Scholarship"}
                onChange={this.handleChange}
              />
              <label htmlFor="Scholarship">Scholarship</label>
              <div className="check" />
            </Choice>

            <Choice>
              <Selector
                type="radio"
                id="OnSite"
                name="paymentType"
                value="OnSite"
                checked={this.state.paymentType === "OnSite"}
                onChange={this.handleChange}
              />
              <label htmlFor="OnSite">Pay on site</label>
              <div className="check" />
            </Choice>
          </Options>
        </QuestionContainer>
        <PaymentEntry
          paymentType={this.state.paymentType}
          total={this.props.total}
        />
      </>
    );
  }
}

const QuestionContainer = styled.div`
  background: white;
  display: flex;
  flex-direciton: row;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const TitleContainer = styled.span`
  width: 40%;
  text-align: right;
  margin-right: 20px;
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
