import React, { useEffect } from "react";
import styled from "@emotion/styled";
import EvtFormater from "../../../../Controllers/formatercontroller";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import RegisterButtons from "./RegisterButtons";

const FORMATER = new EvtFormater();

const RegisterLanding = ({ selectedConference, isLoading }) => {
  useEffect(() => {
    if (selectedConference.name) {
      document.title = `${
        selectedConference.name
      } - Register | Event Registration Tool`;
    }
  }, [selectedConference]);

  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <span>Loading... </span>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </LoadingContainer>
      ) : (
        <>
          <TitleContainer>
            <WelcomeTitle>Welcome</WelcomeTitle>
          </TitleContainer>
          <DescriptionText>{selectedConference.description}</DescriptionText>
          <DetailContainer>
            <TitleContainer>
              <DetailTitle>Event Dates</DetailTitle>
            </TitleContainer>
            <DescriptionText>
              {FORMATER.dateFormater(
                selectedConference.eventStartTime,
                selectedConference.eventTimezone,
                "MMM D, YYYY h:mma z"
              )}{" "}
              -{" "}
              {FORMATER.dateFormater(
                selectedConference.eventEndTime,
                selectedConference.eventTimezone,
                "MMM D, YYYY h:mma z"
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
                "MMM D, YYYY h:mma z"
              )}{" "}
              -{" "}
              {FORMATER.dateFormater(
                selectedConference.registrationEndTime,
                selectedConference.eventTimezone,
                "MMM D, YYYY h:mma z"
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
              <EmailText
                href={`mailto:${selectedConference.contactPersonEmail}`}
              >
                {selectedConference.contactPersonEmail}
              </EmailText>
            </DescriptionText>
          </DetailContainer>
          <RegisterButtons />
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    loginState: state.authenticationReducer.loginState,
    isLoading: state.conferenceReducer.isLoading,
    selectedConference: state.conferenceReducer.selectedConference
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterLanding);

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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const DetailTitle = styled.h2`
  font-size: 18px;
  color: #00a651;
  margin-top: 5px;
`;

const EmailText = styled.a`
  color: #337ab7;
  text-decoration: none;
`;

const DescriptionText = styled.p`
  font-size: 14px;
  font-family: sans-serif;
  color: #333333;
`;
