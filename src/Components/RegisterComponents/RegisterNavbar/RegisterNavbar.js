import React from "react";
import styled from "@emotion/styled";

const RegisterNavbar = () => {
  return (
    <NavbarContainer>
      <NavbarHeader />
      <NavbarSection>
        <TitleContainer>
          <ConferenceTitle>Hello</ConferenceTitle>
          <SignoutButton>Sign Out</SignoutButton>
        </TitleContainer>
      </NavbarSection>
    </NavbarContainer>
  );
};

export default RegisterNavbar;

const NavbarContainer = styled.div`
  width: 100%;
  background: #156692;
`;

const NavbarHeader = styled.header`
  background: #3494c7;
  border-bottom: 4px solid #2b86b7;
  padding-top: 12px;
`;

const NavbarSection = styled.div`
  width: 582px;
  padding: 15px;
  margin: 0 auto;
  background: #156692;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ConferenceTitle = styled.h3`
  color: #fff;
  font-size: 24px;
  font-family: sans-serif;
  font-weight: 600;
  margin: 5px 0 0 0;
`;
const SignoutButton = styled.button`
  background: #3494c7;
  border-color: #2f84cd;
  text-transform: uppercase;
  color: #fff;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.428571429;
  border-radius: 4px;
  :hover {
    background-color: #337ab7;
    border-color: #2969a0;
  }
`;
