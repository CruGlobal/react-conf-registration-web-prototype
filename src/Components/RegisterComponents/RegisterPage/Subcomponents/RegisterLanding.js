import React from "react";
import styled from "@emotion/styled";
import EvtFormater from "../../../../Controllers/formatercontroller";
import UUIDController from "../../../../Controllers/uuidcontroller";
import { Link } from "react-router-dom";
import _ from "lodash";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

const FORMATER = new EvtFormater();
const UUID = new UUIDController();

const newUUID = UUID.createUUID();

const RegisterLanding = ({
  selectedConference,
  isLoading,
  currentRegistration
}) => {
  // Render Correct buttons depending on selectedConference results
  // We have the null value because before Redux sets the selected conference
  // If it tries to render a link to the next page, react throws an error because selectedConference is not set yet
  const RenderButtons = () => {
    if (selectedConference.registrantTypes === null) {
      return (
        <ButtonContainer>
          <RegisterButton>Loading</RegisterButton>
        </ButtonContainer>
      );
    } else if (selectedConference.registrantTypes.length > 1) {
      return (
        <MultipleTypeContainer>
          {_.map(selectedConference.registrantTypes, registrantType => {
            return (
              <RegistrantRowContainer key={registrantType.id}>
                <RegisterTypeTitle>{registrantType.name}</RegisterTypeTitle>
                <RegisterTypeTotal>${registrantType.cost}.00</RegisterTypeTotal>
                <Link
                  to={`/register/${selectedConference.id}/page/${
                    selectedConference.registrationPages[0].id
                  }/${currentRegistration.primaryRegistrantId}`}
                >
                  <RegisterTypeButton>Register</RegisterTypeButton>
                </Link>
              </RegistrantRowContainer>
            );
          })}
        </MultipleTypeContainer>
      );
    } else {
      return (
        <ButtonContainer>
          <Link
            to={`/register/${selectedConference.id}/page/${
              selectedConference.registrationPages[0].id
            }/${currentRegistration.primaryRegistrantId}`}
          >
            <RegisterButton>Register</RegisterButton>
          </Link>
        </ButtonContainer>
      );
    }
  };

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
                "MMM D, YYYY h:mma "
              )}{" "}
              -{" "}
              {FORMATER.dateFormater(
                selectedConference.eventEndTime,
                selectedConference.eventTimezone,
                "MMM D, YYYY h:mma"
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
          {RenderButtons()}
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    loginState: state.authenticationReducer.loginState,
    isLoading: state.conferenceReducer.isLoading,
    selectedConference: state.conferenceReducer.selectedConference,
    currentRegistration: state.conferenceReducer.currentRegistration
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const MultipleTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const RegistrantRowContainer = styled.div`
  display: flex;
  padding: 10px 5px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  :last-child {
    border-bottom: none;
  }
`;

const RegisterTypeButton = styled.button`
  background: #00a651;
  text-transform: uppercase;
  font-family: sans-serif;
  font-weight: 600;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 3px;
  color: #fff;
  border-color: #4cae4c;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
`;

const RegisterTypeTitle = styled.h4`
  font-size: 18px;
  color: #333;
`;

const RegisterTypeTotal = styled(RegisterTypeTitle)`
  font-size: 16px;
  margin-left: auto;
  padding-right: 20px;
`;
