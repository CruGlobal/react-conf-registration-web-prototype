import React from "react";
import styled from "@emotion/styled";
import Modal from "react-bootstrap/Modal";
import { DeleteCurrentRegistrant } from "../../../../actions/";
import { connect } from "react-redux";

const StartOverModal = ({
  changeShow,
  show,
  selectedConference,
  primaryRegistrantId,
  deleteCurrentRegistrant
}) => {
  let token = localStorage.getItem("crsToken");

  return (
    <Modal show={show} onHide={() => changeShow(false)} size="lg">
      <Modal.Header closeButton>
        <ModalTitle id="contained-modal-title-vcenter">Start Over</ModalTitle>
      </Modal.Header>
      <ModalContentContainer>
        <ModalText data-testid="signin-method-title">
          Are you sure you want to start over? All answers will be erased.
        </ModalText>
      </ModalContentContainer>
      <Modal.Footer>
        <CancelButton onClick={() => changeShow(false)}>Cancel</CancelButton>
        <StartOverButton
          onClick={() => {
            deleteCurrentRegistrant(
              token,
              selectedConference.id,
              primaryRegistrantId
            );
          }}
        >
          Start Over
        </StartOverButton>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    deleteCurrentRegistrant: (authToken, confID, regID) => {
      dispatch(DeleteCurrentRegistrant(authToken, confID, regID));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartOverModal);

const ModalContentContainer = styled(Modal.Body)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ModalTitle = styled(Modal.Title)`
  font-family: sans-serif;
  color: #333333;
  font-weight: 500;
  font-size: 18px;
  margin: 10px 0;
`;
const ModalText = styled.p`
  color: #333;
  font-size: 14px;
`;

const CancelButton = styled.button`
  color: #333;
  background-color: #fff;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  border-color: #ccc;
  padding: 6px 12px;
  :hover {
    background-color: #e6e5e5;
    border-color: #adadad;
  }
`;

const StartOverButton = styled(CancelButton)`
  color: #fff;
  background-color: #d9534f;
  border-color: #d43f3a;
  :hover {
    background-color: #c9302c;
    border-color: #ac2925;
  }
`;
