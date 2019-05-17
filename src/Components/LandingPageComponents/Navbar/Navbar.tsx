import React, { useState, FunctionComponent } from "react";
import styled from "@emotion/styled";
import {
  faUsers,
  faMedkit,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import RelayImg from "../../../img/signin-relay.png";
import FacebookImg from "../../../img/signin-facebook.png";
import InstagramImg from "../../../img/signin-instagram.jpeg";

const NavBarContainer = styled.div`
  width: 100%;
  background: #3494c6;
  color: white;
  display: flex;
  justify-content: center;
  border-bottom: 7px solid #2b86b7;
`;

const NavBar = styled.div`
  width: 1170px;
  height: 75px;
  background: #3494c6;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const MainHeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NavBarTitle = styled.h3`
  font-size: 36px;
  text-decoration: none;
  margin: 0 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const DownArrowButton = styled(Dropdown.Toggle)`
  height: 36px;
  width: 30px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  background-image: linear-gradient(to bottom, #3494c7 0px, #2b86b7 100%);
  border-color #2969a0;
  color: white;
`;

const DropDownItemText = styled.span`
  margin-left: 5px;
`;

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

type Props = {
  name: string;
  signedIn: boolean;
  signout: any;
};

const Navbar: FunctionComponent<Props> = ({ name, signedIn, signout }) => {
  const DashboardButton = styled.button`
    width: ${signedIn ? "auto" : "180px"};
    height: 35px;
    font-size: ${signedIn ? "18px" : "16px"};
    color: #3494c6;
    border-radius: ${signedIn ? "0px" : "5px"};
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    text-transform: uppercase;
    :hover {
      cursor: pointer;
      opacity: 0.7;
    }
  `;

  const [show, changeShow] = useState(false);

  return (
    <NavBarContainer>
      <NavBar>
        <MainHeadingContainer>
          <FontAwesomeIcon icon={faUsers} size="3x" />
          <NavBarTitle>Event Registration Tool</NavBarTitle>
        </MainHeadingContainer>
        <ButtonContainer>
          {signedIn ? (
            <>
              <DashboardButton data-testid="signed-in-title">
                Hello <strong>{name}</strong>
              </DashboardButton>
              <Dropdown as={ButtonGroup}>
                <DownArrowButton split id="dropdown-split-basic" />

                <Dropdown.Menu alignRight={true}>
                  <Dropdown.Item hred="#/action-1">
                    <FontAwesomeIcon icon={faUsers} />
                    <DropDownItemText>My Dashboard</DropDownItemText>
                  </Dropdown.Item>
                  <Dropdown.Item hred="#/action-2">
                    <FontAwesomeIcon icon={faMedkit} />
                    <DropDownItemText>I Need Help!</DropDownItemText>
                  </Dropdown.Item>
                  <Dropdown.Item hred="#/action-3">
                    {" "}
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <DropDownItemText onClick={signout}>
                      Sign out
                    </DropDownItemText>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <DashboardButton
                data-testid="unsigned-in-title"
                onClick={() => changeShow(true)}
              >
                EVENT DASHBOARD
              </DashboardButton>
              <Modal show={show} onHide={() => changeShow(false)} size="lg">
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Welcome to the Event Registration Tool!
                  </Modal.Title>
                </Modal.Header>
                <ModalContentContainer>
                  <ModalText>
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
            </>
          )}
        </ButtonContainer>
      </NavBar>
    </NavBarContainer>
  );
};

export default Navbar;
