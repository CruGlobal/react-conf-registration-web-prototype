import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { userLogout } from "../../../actions";
import LoginModal from "./Subcomponents/LoginModal";

const Navbar = ({ profile, loginState, userLogout }) => {
  const DashboardButton = styled.button`
    width: ${loginState ? "auto" : "180px"};
    height: 35px;
    font-size: ${loginState ? "18px" : "16px"};
    color: #3494c6;
    border-radius: ${loginState ? "0px" : "5px"};
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    text-transform: uppercase;
    :hover {
      cursor: pointer;
      background-color: #e6e5e5;
    }
  `;

  const [show, changeShow] = useState(false);

  return (
    <NavBarContainer>
      <NavBar>
        <MainHeadingContainer to="/">
          <FontAwesomeIcon icon={faUsers} size="3x" />
          <NavBarTitle>Event Registration Tool</NavBarTitle>
        </MainHeadingContainer>
        <ButtonContainer>
          {loginState ? (
            <>
              <DashboardButton data-testid="signed-in-title">
                Hello <strong>{profile.firstName}</strong>
              </DashboardButton>
              <Dropdown as={ButtonGroup}>
                <DownArrowButton
                  split
                  id="dropdown-split-basic"
                  data-testid="drop-down-button"
                />

                <Dropdown.Menu alignRight={true}>
                  <LinkContainer to="/eventDashboard">
                    <Dropdown.Item>
                      <FontAwesomeIcon icon={faUsers} />
                      <DropDownItemText>My Dashboard</DropDownItemText>
                    </Dropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/help">
                    <Dropdown.Item>
                      <FontAwesomeIcon icon={faMedkit} />
                      <DropDownItemText>I Need Help!</DropDownItemText>
                    </Dropdown.Item>
                  </LinkContainer>

                  <Dropdown.Item>
                    {" "}
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <DropDownItemText
                      onClick={userLogout}
                      data-testid="sign-out-title"
                    >
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
              <LoginModal show={show} changeShow={changeShow} />
            </>
          )}
        </ButtonContainer>
      </NavBar>
    </NavBarContainer>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.authenticationReducer.profile,
    loginState: state.authenticationReducer.loginState
  };
};
const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => {
      dispatch(userLogout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

const NavBarContainer = styled.header`
  width: 100%;
  background: #3494c6;
  color: white;
  display: flex;
  justify-content: center;
  border-bottom: 7px solid #2b86b7;
`;

const NavBar = styled.nav`
  width: 1170px;
  height: 75px;
  background: #3494c6;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const MainHeadingContainer = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  :hover {
    color: white;
    text-decoration: none;
  }
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
