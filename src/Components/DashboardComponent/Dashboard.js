import React, { useState, useEffect } from "react";
import Navbar from "../LandingPageComponents/Navbar/Navbar";
import Footer from "../LandingPageComponents/Footer/Footer";
import styled from "@emotion/styled";
import { faPlus, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { userConferenceSearch } from "../../actions";

document.title = "My Dashboard | Event Registration Tool";
const Dashboard = ({ getUserConferences, userConferences }) => {
  const [showArchived, changeShowArchived] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("crsToken");
    getUserConferences(token);
  }, [getUserConferences]);

  const handleCheckboxChange = event => {
    changeShowArchived(event.target.checked);
  };

  return (
    <>
      <PageContainer>
        <Navbar />
        <TitleSection>
          <DashboardContainer>
            <DashboardTitle>My Dashboard</DashboardTitle>
          </DashboardContainer>
        </TitleSection>
        <DashboardContainer>
          <ContentContainer>
            <p>
              Showing <strong>0 of {userConferences.length}</strong> events
            </p>
            <InputContainer>
              <ButtonContainer>
                <DashboardButtons>
                  <Icon icon={faPlus} />
                  Create New Event
                </DashboardButtons>
                <DashboardButtons>
                  <Icon icon={faKey} />
                  Request Access to Existing Event
                </DashboardButtons>
              </ButtonContainer>
              <FilterInput type="text" placeholder="Filter Events" />
            </InputContainer>
            <ConferencesContainer>
              {showArchived ? (
                <div>
                  {userConferences.map(conference => {
                    return <div key={conference.id}>{conference.name}</div>;
                  })}
                </div>
              ) : (
                <div>
                  No events found.{" "}
                  <DashboardLink href="#">Create a new event</DashboardLink> or{" "}
                  <DashboardLink href="#">
                    request access to an existing event
                  </DashboardLink>{" "}
                  to get started!
                </div>
              )}
            </ConferencesContainer>
            <ArchivedContainer>
              <label>
                <ArchivedCheckbox
                  onChange={handleCheckboxChange}
                  type="checkbox"
                  checked={showArchived}
                />
                <strong>Show archived events</strong>
              </label>
            </ArchivedContainer>
          </ContentContainer>
        </DashboardContainer>
        <Footer />
      </PageContainer>
    </>
  );
};

const mapStateToProps = state => {
  return {
    userConferences: state.conferenceReducer.userConferences,
    crsToken: state.authenticationReducer.crsToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserConferences: token => {
      dispatch(userConferenceSearch(token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

const DashboardContainer = styled.div`
  width: 90%;
  margin: 0 20px;
`;
const ButtonContainer = styled.div`
  font-family: sans-serif;
  @media screen and (min-width: 768px) {
    width: 66.6%;
    float: left;
  }
`;
const ContentContainer = styled.div`
  width: 1170px;
  margin: 20px 10px;
  @media screen and (max-width: 1170px) {
    width: 100%;
    margin: 20px 0px;
  }
`;
const PageContainer = styled.div`
  box-sizing: border-box;
  display: block;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 14px;
  width: 100%;
  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const ArchivedContainer = styled.div`
  display: inline-block;
  flex-direction: row;
  margin-bottom: 5px;
  max-width: 100%;
  align-items: center;
  color: #333333;
`;

const ConferencesContainer = styled.div`
  width: 100%;
  height: 52px;
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
  border-radius: 4px;
  margin-bottom: 20px;
  margin: 20px 0px;
  > p {
    padding: 15px;
  }
  @media screen and (max-width: 430px) {
    height: 80px;
  }
`;

const TitleSection = styled.section`
  background-color: #fffef6;
  padding-top: 25px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ece8d8;
  font-family: sans-serif;
`;

const DashboardTitle = styled.h3`
  color: #7d7d83;
  font-weight: 300;
  font-size: 30px;
  margin-bottom: 10px;
  @media (max-width: 300px) {
    font-size: 20px;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

const DashboardButtons = styled.button`
  background: #00a651;
  border-color: #4cae4c;
  color: #fff;
  font-weight: 400px;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 12px;
  border-radius: 4px;
  margin-right: 5px;
  margin-bottom: .5em;
  :hover {
    background-color: #449d44;
    border-color: #398439
    text-decoration: none;
  }
`;

const ArchivedCheckbox = styled.input`
  margin-right: 5px;
`;

const DashboardLink = styled.a`
  color: #245269;
  font-weight: 700;
  :hover {
    color: #245269;
  }
`;

const FilterInput = styled.input`
  height: 34px;
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin-left: auto;
  padding-right: 42.5px;
  @media screen and (min-width: 465px) {
    padding: 2px 12px;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;
