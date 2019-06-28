import React from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";

const ContinueButton = ({ match, conference, history, isSaving }) => {
  // Create a variable with an empty value, will be used to set the route we wish to push too
  let nextPage = "";
  // Filter through our pages to find the current page we are on
  const currentPage = conference.registrationPages.filter(
    Pages => Pages.id === match.params.pageID
  );
  // Find the index number we are currently on
  const CurrentPageIndex = conference.registrationPages.indexOf(currentPage[0]);

  // If the index of current page + 1 does not equal the total length of all the pages, then it has a next page
  const HasNextPage = () => {
    if (
      conference.registrationPages.indexOf(currentPage[0]) + 1 !==
      conference.registrationPages.length
    ) {
      return true;
    } else {
      return false;
    }
  };

  // We use this to calculate which page we want to route to and what text to render
  const CalculatePage = () => {
    // If the amount of pages is greater than one and is not currently saving check if it has a next page
    if (conference.registrationPages.length > 1 && !isSaving) {
      if (HasNextPage()) {
        nextPage = `/register/${match.params.confID}/page/${
          conference.registrationPages[CurrentPageIndex + 1].id
        }/${match.params.regID}`;
        return "NEXT PAGE";
      } else if (!HasNextPage()) {
        nextPage = `/reviewRegistration/${match.params.confID}`;
        return "CONTINUE";
      }
    } else if (isSaving) {
      return "SAVING";
    } else {
      // If the page is not saving and it's length is one, than the next page will be the review page
      nextPage = `/reviewRegistration/${match.params.confID}`;
      return "CONTINUE";
    }
  };

  // When the Button is clicked, pushed to the next page which is decided by the functions above
  const GoToNextPage = () => {
    history.push(nextPage);
  };

  return (
    <div>
      <Button
        disabled={isSaving}
        onClick={() => {
          GoToNextPage();
        }}
      >
        {CalculatePage()}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isSaving: state.conferenceReducer.isSaving
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContinueButton);

const Button = styled.button`
  background: #00a651;
  width: 429px;
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
