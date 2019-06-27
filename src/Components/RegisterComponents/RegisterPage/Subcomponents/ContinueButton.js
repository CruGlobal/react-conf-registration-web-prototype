import React from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";

const ContinueButton = ({ match, conference, history, isSaving }) => {
  let nextPage = "";
  const currentPage = conference.registrationPages.filter(
    Pages => Pages.id === match.params.pageID
  );
  const CurrentPageIndex = conference.registrationPages.indexOf(currentPage[0]);

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

  const CalculatePage = () => {
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
    }
  };

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
