import React from "react";
import styled from "@emotion/styled";
import {
  faUsers,
  faMedkit,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { LinkContainer } from "react-router-bootstrap";

const DropDownButton = ({ userLogout }) => {
  return (
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
          <DropDownItemText onClick={userLogout} data-testid="sign-out-title">
            Sign out
          </DropDownItemText>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownButton;

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
