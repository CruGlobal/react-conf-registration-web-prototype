import React from "react";
import styled from "@emotion/styled";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import Card from "./Subcomponents/Card";
import { Link } from "react-router-dom";
import _ from "lodash";

const LandingEventContainer = ({ conferences, isLoading, loginState }) => {
  if (!isLoading && conferences.length <= 0) {
    return (
      <Container>
        <>
          <ContentTitle data-testid='register-title'>
            Register for an event
          </ContentTitle>
          <ContentInfo>
            To register for an event, search the event name above.
          </ContentInfo>
          <ContentTitle>Create or manage an event</ContentTitle>
          <ContentInfo>
            To create a new event or view registrations, manage scholarships or
            change questions on an existing event, continue to your{" "}
            <LinkContent to='/eventDashboard'>Event Dashboard</LinkContent>
          </ContentInfo>{" "}
        </>
      </Container>
    );
  } else if (isLoading) {
    return (
      <Container>
        <SearchingContainer>
          <SearchingTitle data-testid='searching-title'>
            Searching Events...
          </SearchingTitle>
          <FontAwesomeIcon icon={faSpinner} spin size='3x' />
        </SearchingContainer>
      </Container>
    );
  } else if (!isLoading && conferences.length > 0) {
    return (
      <Container>
        <CardContainer>
          {_.map(conferences, conference => {
            return (
              <Card
                key={conference.id}
                cardData={conference}
                loginState={loginState}
              />
            );
          })}
        </CardContainer>
      </Container>
    );
  } else {
    return (
      <Container>
        <div>No Results Found</div>
      </Container>
    );
  }
};

const mapStateToProps = state => {
  return {
    loginState: state.authenticationReducer.loginState,
    conferences: state.conferenceReducer.conferences,
    isLoading: state.conferenceReducer.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingEventContainer);

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 0px 22px;
`;

const CardContainer = styled.div`
  columns: 2;
  column-gap: 10px;
  @media screen and (max-width: 1129px) {
    columns: 1;
    align-items: center;
  }
`;

const SearchingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchingTitle = styled.h3`
  font-size: 32px;
  font-weight: 500;
`;

const ContentTitle = styled.h3`
  font-size: 24px;
  margin: 10px 0;
`;

const ContentInfo = styled.p`
  font-size: 14px;
`;

const LinkContent = styled(Link)`
  color: #337ab7;
`;
