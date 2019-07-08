import React from "react";
import styled from "@emotion/styled";

export default class PaymentEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueChanged: false,
      accountType: "",
      staffSearch: "",
      account: {
        accountNumber: "",
        businessUnit: "",
        operatingUnit: "",
        department: "",
        projectId: ""
      }
    };
  }

  handleChange = event => {
    if (event.target.name === "accountSelect") {
      this.setState({
        ...this.state,
        accountType: event.target.value
      });
    }

    if (
      [
        "businessUnit",
        "operatingUnit",
        "department",
        "projectId",
        "accountNumber"
      ].includes(event.target.name)
    ) {
      const newValue = this.state.account;
      let key = event.target.name;
      let value = event.target.value;
      newValue[key] = value;

      this.setState({
        ...this.state,
        valueChanged: true,
        account: newValue
      });
    }
  };

  render() {
    const total = this.props.total; //TODO this is a placeholder for an amount from the API
    switch (this.props.paymentType) {
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
                        name='businessUnit'
                        value={this.state.account.businessUnit}
                        type='text'
                        placeholder=''
                        onChange={this.handleChange}
                      />
                    </Col>

                    <Col>
                      <ScholarshipTitle>Operating Unit</ScholarshipTitle>
                      <Line
                        name='operatingUnit'
                        value={this.state.account.operatingUnit}
                        type='text'
                        placeholder=''
                        onChange={this.handleChange}
                      />
                    </Col>

                    <Col>
                      <ScholarshipTitle>Department</ScholarshipTitle>
                      <Line
                        name='department'
                        value={this.state.account.department}
                        type='text'
                        placeholder=''
                        onChange={this.handleChange}
                      />
                    </Col>

                    <Col>
                      <ScholarshipTitle>Project id</ScholarshipTitle>
                      <Line
                        name='projectId'
                        value={this.state.account.projectId}
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
                      name='accountNumber'
                      value={this.state.account.accountNumber}
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
  }
}

const CheckTitle = styled.div`
  font-size: 18px;
`;

const CheckText = styled.p`
  font-size: 14px;
  margin: 0;
  padding-left: 5%;
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

const ScholarshipTitle = styled.div`
  margin-bottom: 5px;
  width: 100%;
  font-weight: 700;
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

const SiteText = styled.p`
  font-size: 14px;
  margin: 0;
`;

const ScholarshipText = styled.p`
  font-size: 14px;
  padding-bottom: 5%;
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
