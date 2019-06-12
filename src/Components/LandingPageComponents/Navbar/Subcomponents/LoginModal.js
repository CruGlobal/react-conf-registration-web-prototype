import React from "react";
import styled from "@emotion/styled";
import Modal from "react-bootstrap/Modal";
import RelayImg from "../../../../img/signin-relay.png";
import FacebookImg from "../../../../img/signin-facebook.png";
import InstagramImg from "../../../../img/signin-instagram.jpeg";

const LoginModal = ({ changeShow, show }) => {
  return (
    <Modal show={show} onHide={() => changeShow(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Welcome to the Event Registration Tool!
        </Modal.Title>
      </Modal.Header>
      <ModalContentContainer>
        <ModalText data-testid="signin-method-title">
          Please sign in with one of the following services:
        </ModalText>
        <LoginMethodContainer href="https://api.stage.eventregistrationtool.com/eventhub-api/rest/auth/instagram/authorization">
          <img src={InstagramImg} alt="Instagram Login" />
        </LoginMethodContainer>
        <LinkContent href="https://www.instagram.com">
          Create an Instagram account
        </LinkContent>
        <LoginMethodContainer href="https://api.stage.eventregistrationtool.com/eventhub-api/rest/auth/facebook/authorization">
          <img src={FacebookImg} alt="Facebook Login" />
        </LoginMethodContainer>
        <LinkContent href="https://www.facebook.com">
          Create a Facebook account
        </LinkContent>
        <LoginMethodContainer href="https://api.stage.eventregistrationtool.com/eventhub-api/rest/auth/relay/login?logoutCallbackUrl=https://api.stage.eventregistrationtool.com/eventhub-api/rest/auth/relay/logout&ticket=None">
          <img src={RelayImg} alt="Relay Login" />
        </LoginMethodContainer>
        <LinkContent href="https://signon.cru.org/cas/login?action=signup&service=https%3A%2F%2Fapi.eventregistrationtool.com%2Feventhub-api%2Frest%2Fauth%2Frelay%2Flogin%3FlogoutCallbackUrl%3Dhttps%3A%2F%2Fapi.eventregistrationtool.com%2Feventhub-api%2Frest%2Fauth%2Frelay%2Flogout">
          Create a Relay account
        </LinkContent>
      </ModalContentContainer>
    </Modal>
  );
};

export default LoginModal;

const ModalContentContainer = styled(Modal.Body)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ModalText = styled.p`
  font-weight: 300;
  font-size: 21px;
`;

const LoginMethodContainer = styled.a`
  width: 300px;
  background: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  :hover {
    opacity: 0.8;
    background-color: #e2e2e2;
  }
`;

const LinkContent = styled.a`
  color: #337ab7;
`;
