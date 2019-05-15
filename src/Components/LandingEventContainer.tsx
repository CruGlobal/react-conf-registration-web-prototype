import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  conferences: any;
  isLoading: boolean;
};

const LandingEventContainer: FunctionComponent<Props> = ({
  conferences,
  isLoading
}) => {
  const Container = styled.div`
    width: 1170px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
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

  const LinkContent = styled.a`
    color: #337ab7;
  `;

  return (
    <Container>
      {!isLoading && conferences.length <= 0 ? (
        <>
          <ContentTitle>Register for an event</ContentTitle>
          <ContentInfo>
            To register for an event, search the event name above.
          </ContentInfo>
          <ContentTitle>Create or manage an event</ContentTitle>
          <ContentInfo>
            To create a new event or view registrations, manage scholarships or
            change questions on an existing event, continue to your{" "}
            <LinkContent href="#/dashboard">Event Dashboard</LinkContent>
          </ContentInfo>{" "}
        </>
      ) : conferences.length <= 0 ? (
        <SearchingContainer>
          <SearchingTitle>Searching Events...</SearchingTitle>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </SearchingContainer>
      ) : (
        <div>Results found</div>
      )}
    </Container>
  );
};

export default LandingEventContainer;
