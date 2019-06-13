import React from "react";
import styled from "@emotion/styled";
import EvtFormater from "../../../../Controllers/formatercontroller";

const FORMATER = new EvtFormater();

const RegisterLanding = ({ selectedConference, changeRegistering }) => {
  return (
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
            {selectedConference.locationCity},{selectedConference.locationState}{" "}
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
        <RegisterButton onClick={changeRegistering}>Register</RegisterButton>
      </ButtonContainer>
    </>
  );
};

export default RegisterLanding;

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
