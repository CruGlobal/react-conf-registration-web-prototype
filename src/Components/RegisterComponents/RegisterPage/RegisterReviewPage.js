import React, { useEffect } from "react";
import RegisterNavbar from "../RegisterNavbar/RegisterNavbar";
import RegisterFooter from "../RegisterFooter/RegisterFooter";
import BackgroundImg from "../../../img/rough_diagonal.png";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { selectConference, GetCurrentRegistrant } from "../../../actions";
import Table from "react-bootstrap/Table";

const RegisterReviewPage = ({
  LoginState,
  history,
  selectedConference,
  currentRegistration,
  crsToken,
  match,
  getSelectedConference,
  getCurrentRegistrant
}) => {
  //if not logged in, history.push them to / to the homepage
  //   useEffect(() => {
  //     if (crsToken) {
  //       getSelectedConference(crsToken, match.params.confID);
  //       getCurrentRegistrant(crsToken, match.params.confID);
  //     }
  //   }, [
  //     LoginState,
  //     crsToken,
  //     getCurrentRegistrant,
  //     getSelectedConference,
  //     history,
  //     match.params.confID
  //   ]);

  return (
    <PageContainer>
      <RegisterNavbar conference={selectedConference} history={history} />
      <ReviewSection>
        <TitleContainer>
          <WelcomeTitle>Registration Review</WelcomeTitle>
        </TitleContainer>
        <Table>
          <thead>
            <tr>
              <th> </th>
              <th>Registrant</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> </td>
              {/* <td>{selectedConference.registrationPages[0].blocks[0].title}</td> */}
              <td> </td>
              <td> </td>
            </tr>
          </tbody>
        </Table>
        <TitleContainer>
          <WelcomeTitle>Summary</WelcomeTitle>
        </TitleContainer>
        <div>A breakdown of the costs associated with your registration.</div>
        <ButtonContainer>
          <ConfirmButton>Confirm</ConfirmButton>
        </ButtonContainer>
      </ReviewSection>
      <RegisterFooter />
    </PageContainer>
  );
};

const mapStateToProps = state => {
  return {
    LoginState: state.authenticationReducer.loginState,
    selectedConference: state.conferenceReducer.selectedConference,
    currentRegistration: state.conferenceReducer.currentRegistration,
    crsToken: state.authenticationReducer.crsToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSelectedConference: (authToken, confID) => {
      dispatch(selectConference(authToken, confID));
    },
    getCurrentRegistrant: (authToken, confID) => {
      dispatch(GetCurrentRegistrant(authToken, confID));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterReviewPage);

const ReviewSection = styled.div`
  margin: 20px auto;
  background: #fff;
  width: 612px;
  padding: 15px;
`;

const PageContainer = styled.div`
  background: url(${BackgroundImg}) #e7e8e6;
  min-width: 100%;
  min-height: 100%;
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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  background: #00a651;
  width: 118px;
  text-transform: uppercase;
  border: 1px solid transparent;
  border-color: #4cae4c;
  color: #fff;
  padding: 10px 16px;
  font-size: 18px;
  border-radius: 6px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  font-family: sans-serif;
  :hover {
    color: #fff;
    background-color: #449d44;
    border-color: #398439;
  }
`;
