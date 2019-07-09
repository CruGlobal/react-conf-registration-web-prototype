import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import StartOverModal from "./StartOverModal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateCurrentRegistration } from "../../../../actions";
import UUIDController from "../../../../Controllers/uuidcontroller";
const UUID = new UUIDController();
const newRegistrationId = UUID.createUUID();

// Render Correct buttons depending on selectedConference results
// We have the null value because before Redux sets the selected conference
// If it tries to render a link to the next page, react throws an error because selectedConference is not set yet
const RegisterButtons = ({
  selectedConference,
  currentRegistration,
  updateCurrentRegistrant,
  crsToken
}) => {
  const [show, changeShow] = useState(false);
  const [currentData, updateCurrentValue] = useState(currentRegistration);
  const [hasUpdated, changeUpdated] = useState(false);

  useEffect(() => {
    if (hasUpdated) {
      updateCurrentRegistrant(
        crsToken,
        currentRegistration.id,
        selectedConference.id,
        currentData
      );

      changeUpdated(false);
    }
  }, [
    crsToken,
    currentData,
    currentRegistration.id,
    currentRegistration.primaryRegistrantId,
    hasUpdated,
    selectedConference.id,
    selectedConference.registrationPages,
    updateCurrentRegistrant
  ]);

  const createNewCurrent = async registrantTypeId => {
    await updateCurrentValue({
      ...currentData,
      registrants: [
        {
          id: newRegistrationId,
          registrantTypeId: registrantTypeId,
          registrationId: currentRegistration.id,
          answers: []
        }
      ]
    });
    changeUpdated(true);
  };
  if (selectedConference.registrantTypes === null) {
    return (
      <ButtonContainer>
        <RegisterButton>Loading</RegisterButton>
      </ButtonContainer>
    );
  } else if (
    selectedConference.registrantTypes.length > 1 &&
    !currentRegistration.primaryRegistrantId
  ) {
    return (
      <MultipleTypeContainer>
        {selectedConference.registrantTypes.map(registrantType => {
          return (
            <RegistrantRowContainer key={registrantType.id}>
              <RegisterTypeTitle>{registrantType.name}</RegisterTypeTitle>
              <RegisterTypeTotal>${registrantType.cost}.00</RegisterTypeTotal>

              <RegisterTypeButton
                onClick={() => {
                  createNewCurrent(registrantType.id);
                }}
              >
                Register
              </RegisterTypeButton>
            </RegistrantRowContainer>
          );
        })}
      </MultipleTypeContainer>
    );
  } else if (currentRegistration.primaryRegistrantId) {
    return (
      <ButtonContainer>
        <StartoverButton onClick={() => changeShow(true)}>
          Start Over
        </StartoverButton>
        <Link
          to={`/register/${selectedConference.id}/page/${
            selectedConference.registrationPages[0].id
          }/${currentRegistration.primaryRegistrantId}`}
        >
          <ContinueButton>Continue</ContinueButton>
        </Link>
        <StartOverModal
          show={show}
          changeShow={changeShow}
          selectedConference={selectedConference}
          primaryRegistrantId={currentRegistration.primaryRegistrantId}
        />
      </ButtonContainer>
    );
  } else {
    return (
      <ButtonContainer>
        <RegisterButton
          onClick={() =>
            createNewCurrent(selectedConference.registrantTypes[0].id)
          }
        >
          Register
        </RegisterButton>
      </ButtonContainer>
    );
  }
};

const mapStateToProps = state => {
  return {
    selectedConference: state.conferenceReducer.selectedConference,
    currentRegistration: state.conferenceReducer.currentRegistration,
    crsToken: state.authenticationReducer.crsToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentRegistrant: (authToken, userId, confID, currentData) => {
      dispatch(
        UpdateCurrentRegistration(authToken, userId, confID, currentData)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterButtons);

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: row;
`;

const MultipleTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  border: 1px solid transparent;
  border-color: #4cae4c;
  color: #fff;
  margin: 0 auto;
  :hover {
    background-color: #449d44;
    border-color: #398439;
  }
`;

const ContinueButton = styled(RegisterButton)`
  width: 429px;
  margin: 0 5px;
  @media screen and (max-width: 670px) {
    width: 200px;
  }
  @media screen and (max-width: 390px) {
    width: 130px;
  }
`;

const StartoverButton = styled.button`
  width: 100%;
  height: 46px;
  background: #f4f4f4;
  border: 1px solid transparent;
  border-color: #ccc;
  color: #9b9b9b;
  padding: 10px 16px;
  font-size: 18px;
  border-radius: 6px;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  margin: 0 10px;
  :hover {
    background: #e2e2e2;
    color: #333;
    border-color: #ccc;
  }
  @media screen and (max-width: 415px) {
    padding: 10px 2px;
  }
  @media screen and (max-width: 300px) {
    font-size: 12px;
  }
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
