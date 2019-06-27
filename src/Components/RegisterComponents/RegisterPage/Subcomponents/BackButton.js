import React from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";

const BackButton = ({ conference, match, history, isSaving }) => {
  const currentPage = conference.registrationPages.filter(
    Pages => Pages.id === match.params.pageID
  );

  const CurrentPageIndex = conference.registrationPages.indexOf(currentPage[0]);

  const CalculatePage = () => {
    if (CurrentPageIndex === 0) {
      history.push(`/register/${match.params.confID}/page/`);
    } else {
      history.push(
        `/register/${match.params.confID}/page/${
          conference.registrationPages[CurrentPageIndex - 1].id
        }/${match.params.regID}`
      );
    }
  };
  return (
    <div>
      <Button
        onClick={() => {
          CalculatePage();
        }}
        disabled={isSaving}
      >
        Go Back
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
)(BackButton);

const Button = styled.button`
  background: #f4f4f4;
  width: 123px;
  border: 1px solid transparent;
  border-color: #ccc;
  color: #9b9b9b;
  padding: 10px 16px;
  font-size: 18px;
  border-radius: 6px;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  font-family: sans-serif;
  :hover {
    background: #e2e2e2;
    color: #333;
    border-color: #ccc;
    text-decoration: none;
  }
`;
