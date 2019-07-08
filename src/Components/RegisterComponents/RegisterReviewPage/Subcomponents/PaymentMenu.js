import React from "react";
import styled from "@emotion/styled";
import PaymentEntry from "./PaymentEntry";

export default class PaymentMenu extends React.Component {
  constructor(props) {
    super(props);
    //TODO state needs to be restructured
    this.state = {
      paymentType: "Card"
    };
  }

  //TODO this handle change is trash and needs to be fixed
  handleChange = event => {
    this.setState({
      ...this.state,
      paymentType: event.target.value
    });
  };

  paymentEntry = paymentType => {
    const total = 999; //TODO this is a placeholder for an amount from the API
    switch (paymentType) {
      case "Check": {
        return (
          <>
            <CheckTitle>Check Instructions</CheckTitle>
            <CheckText>1. Print this page.</CheckText>
            <CheckText>2. Make your check payable to "".</CheckText>
            <CheckText>3. Mail this page and your check to:</CheckText>
          </>
        );
      }
      case "Transfer": {
        return (
          <>
            <ScholarshipTitle>Account Type</ScholarshipTitle>
            <Option
              name='accountSelect'
              onChange={this.handleChange}
              value={this.state.accountType}
            >
              <option value=''>Choose one...</option>
              {["Staff", "Ministry", "Non-U.S. Staff"].map(Choice => {
                return (
                  <option key={Choice} value={Choice}>
                    {Choice}
                  </option>
                );
              })}
            </Option>
            <div>
              {!(this.state.accountType === "") ? (
                this.state.accountType === "Ministry" ? (
                  <Row>
                    <Col>
                      <ScholarshipTitle>Business Unit</ScholarshipTitle>
                      <Line
                        value={this.state.account.bu}
                        type='text'
                        placeholder=''
                        onChange={this.handleChange}
                      />
                    </Col>

                    <Col>
                      <ScholarshipTitle>Operating Unit</ScholarshipTitle>
                      <Line
                        value={this.state.account.ou}
                        type='text'
                        placeholder=''
                        onChange={this.handleChange}
                      />
                    </Col>

                    <Col>
                      <ScholarshipTitle>Department</ScholarshipTitle>
                      <Line
                        value={this.state.account.dep}
                        type='text'
                        placeholder=''
                        onChange={this.handleChange}
                      />
                    </Col>

                    <Col>
                      <ScholarshipTitle>Project id</ScholarshipTitle>
                      <Line
                        value={this.state.account.id}
                        type='text'
                        placeholder=''
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>
                ) : (
                  <>
                    <ScholarshipTitle>Account Number</ScholarshipTitle>
                    <Line
                      value={this.state.accountNumber}
                      type='text'
                      placeholder=''
                      onChange={this.handleChange}
                    />
                  </>
                )
              ) : null}
            </div>
          </>
        );
      }
      case "Scholarship": {
        return (
          <>
            <ScholarshipText>
              Find the Cru staff that authorized this scholarship by searching
              below and choosing his or her name from the results list.
            </ScholarshipText>
            <ScholarshipTitle>Staff member name:</ScholarshipTitle>
            <Line value={this.props.staffSearch} type='text' placeholder='' />
          </>
        );
      }
      case "OnSite": {
        return (
          <>
            <CheckTitle>Instructions</CheckTitle>
            <SiteText>
              Bring your payment of {"$" + total.toFixed(2)} to the event.
            </SiteText>
          </>
        );
      }
      case "Card": {
        return <p>card</p>;
      }
      default:
        return <p>error</p>;
    }
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
                type='radio'
                id='Card'
                name='paymentType'
                value='Card'
                checked={this.state.paymentType === "Card"}
                onChange={this.handleChange}
              />
              <label htmlFor='Card'>Credit Card</label>
              <div className='check' />
            </Choice>

            <Choice>
              <Selector
                type='radio'
                id='Check'
                name='paymentType'
                value='Check'
                checked={this.state.paymentType === "Check"}
                onChange={this.handleChange}
              />
              <label htmlFor='Check'>Check</label>
              <div className='check' />
            </Choice>

            <Choice>
              <Selector
                type='radio'
                id='Transfer'
                name='paymentType'
                value='Transfer'
                checked={this.state.paymentType === "Transfer"}
                onChange={this.handleChange}
              />
              <label htmlFor='Transfer'>
                Cru Staff / Ministry Account Transfer
              </label>
              <div className='check' />
            </Choice>

            <Choice>
              <Selector
                type='radio'
                id='Scholarship'
                name='paymentType'
                value='Scholarship'
                checked={this.state.paymentType === "Scholarship"}
                onChange={this.handleChange}
              />
              <label htmlFor='Scholarship'>Scholarship</label>
              <div className='check' />
            </Choice>

            <Choice>
              <Selector
                type='radio'
                id='OnSite'
                name='paymentType'
                value='OnSite'
                checked={this.state.paymentType === "OnSite"}
                onChange={this.handleChange}
              />
              <label htmlFor='OnSite'>Pay on site</label>
              <div className='check' />
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

const CheckTitle = styled.div`
  font-size: 18px;
`;

const CheckText = styled.p`
  font-size: 14px;
  margin: 0;
  padding-left: 5%;
`;

const SiteText = styled.p`
  font-size: 14px;
  margin: 0;
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
  color: #555;
`;

const ScholarshipText = styled.p`
  font-size: 14px;
  padding-bottom: 5%;
`;

const ScholarshipTitle = styled.div`
  margin-bottom: 5px;
  width: 100%;
  font-weight: 700;
`;

const Option = styled.select`
  margin-bottom: 1em;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #555;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`;
