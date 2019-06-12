import React, { Component } from "react";
import RegisterNavbar from "../RegisterNavbar/RegisterNavbar";
import RegisterFooter from "../RegisterFooter/RegisterFooter";
import styled from "@emotion/styled";
import BackgroundImg from "../../../img/rough_diagonal.png";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { selectConference } from "../../../actions";
import EvtFormater from "../../../Controllers/formatercontroller";

const FORMATER = new EvtFormater();

class RegisterPage extends Component {
  componentDidMount() {
    const { getSelectedConference, match } = this.props;
    const token = localStorage.getItem("crsToken");
    getSelectedConference(token, match.params.confID);
  }

  render() {
    const { loginState, selectedConference } = this.props;
    return (
      <>
        {loginState ? (
          <PageContainer>
            <RegisterNavbar conference={selectedConference} />
            <RegisterSection>
              <TitleContainer>
                <WelcomeTitle>Welcome</WelcomeTitle>
              </TitleContainer>
              <DescriptionText>
                {selectedConference.description}
              </DescriptionText>
              <DetailContainer>
                <TitleContainer>
                  <DetailTitle>Event Dates</DetailTitle>
                </TitleContainer>
                <DescriptionText>
                  {FORMATER.dateFormater(
                    selectedConference.eventStartTime,
                    selectedConference.eventTimezone,
                    "ddd, MMM D, YYYY h:mma "
                  )}{" "}
                  -{" "}
                  {FORMATER.dateFormater(
                    selectedConference.eventEndTime,
                    selectedConference.eventTimezone,
                    "ddd, MMM D, YYYY h:mma"
                  )}
                </DescriptionText>
              </DetailContainer>
              {!selectedConference.locationAddress &&
              !selectedConference.locationName &&
              !selectedConference.locationCity &&
              !selectedConference.locationState &&
              !selectedConference.locationZipCode ? null : (
                <DetailContainer>
                  <TitleContainer>
                    <DetailTitle>Event Location</DetailTitle>
                  </TitleContainer>
                  <DescriptionText>
                    {selectedConference.locationName} <br />
                    {selectedConference.locationAddress} <br />
                    {selectedConference.locationCity},
                    {selectedConference.locationState}{" "}
                    {selectedConference.locationZipCode}
                  </DescriptionText>
                </DetailContainer>
              )}
              <DetailContainer>
                <TitleContainer>
                  <DetailTitle>Registration Window</DetailTitle>
                </TitleContainer>
                <DescriptionText>
                  {FORMATER.dateFormater(
                    selectedConference.registrationStartTime,
                    selectedConference.eventTimezone,
                    "ddd, MMM D, YYYY h:mma z"
                  )}{" "}
                  -{" "}
                  {FORMATER.dateFormater(
                    selectedConference.registrationEndTime,
                    selectedConference.eventTimezone,
                    "ddd, MMM D, YYYY h:mma z"
                  )}
                </DescriptionText>
              </DetailContainer>
              <DetailContainer>
                <TitleContainer>
                  <DetailTitle>Contact Info</DetailTitle>
                </TitleContainer>
                <DescriptionText>
                  {selectedConference.contactPersonName}
                  <br />
                  <a href={`mailto:${selectedConference.contactPersonEmail}`}>
                    {selectedConference.contactPersonEmail}
                  </a>
                </DescriptionText>
              </DetailContainer>
              <ButtonContainer>
                <RegisterButton>Register</RegisterButton>
              </ButtonContainer>
            </RegisterSection>

            <RegisterFooter />
          </PageContainer>
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginState: state.authenticationReducer.loginState,
    selectedConference: state.conferenceReducer.selectedConference
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSelectedConference: (authToken, confID) => {
      dispatch(selectConference(authToken, confID));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);

// Maybe find a better way to cover div with background img?
const PageContainer = styled.div`
  background: url(${BackgroundImg}) #e7e8e6;
  min-width: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

const RegisterSection = styled.section`
  margin: 20px auto;
  background: #fff;
  width: 582px;
  padding: 15px;
`;

const WelcomeTitle = styled.h2`
  color: #00a651;
  font-size: 28px;
  margin-top: 5px;
`;

const TitleContainer = styled.div`
  border-bottom: 2px solid #e9e9e9;
  padding-bottom: 4px;
  margin-bottom: 22px;
`;

const DetailContainer = styled.div`
  min-height: 20px;
  background: #fafde8;
  border-radius: 0;
  border: 0;
  padding: 19px;
  margin-bottom: 20px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DetailTitle = styled.h2`
  font-size: 18px;
  color: #00a651;
  margin-top: 5px;
`;

const DescriptionText = styled.p`
  font-size: 14px;
  font-family: sans-serif;
  color: #333333;
`;

const RegisterButton = styled.button`
  background: #00a651;
  text-transform: uppercase;
  font-family: sans-serif;
  font-weight: 600;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
  border-color: #4cae4c;
  color: #fff;
  margin: 0 auto;
`;
