import React from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";

const ContinueButton = ({ match, currentData, history, isSaving }) => {
  return (
    <div>
      <Button
        disabled={isSaving}
        onClick={() => {
          history.push(`/register/${match.params.confID}/page/`);
        }}
      >
        {isSaving ? "SAVING" : "CONTINUE"}
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
