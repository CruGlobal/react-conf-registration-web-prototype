import React from "react";
import styled from "@emotion/styled";
import EvtFormater from "../../../Controllers/formatercontroller";
import {
  faCalendarAlt,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogout } from "../../../actions";

const RegisterNavbar = ({ userLogout, conference }) => {
  const FORMATER = new EvtFormater();

  return (
    <NavbarContainer>
      <NavbarHeader />
      <NavbarSection>
        <TitleContainer>
          <ConferenceTitle>{conference.name}</ConferenceTitle>
          <SignoutButton onClick={userLogout}>Sign Out</SignoutButton>
        </TitleContainer>
        <DetailContainer>
          <ConfDataContainer>
            <Icon icon={faCalendarAlt} size="xs" />
            <DetailText>
              {FORMATER.dateFormater(
                conference.eventStartTime,
                conference.eventTimezone,
                "ddd, MMM D, YYYY h:mma "
              )}{" "}
              -{" "}
              {FORMATER.dateFormater(
                conference.eventEndTime,
                conference.eventTimezone,
                "ddd, MMM D, YYYY h:mma"
              )}
            </DetailText>
          </ConfDataContainer>
          {conference.locationName ? (
            <ConfDataContainer>
              <Icon icon={faMapMarkerAlt} size="xs" />
              <DetailText>{conference.locationName}</DetailText>
            </ConfDataContainer>
          ) : null}
        </DetailContainer>
      </NavbarSection>
    </NavbarContainer>
  );
};

const mapStateToProps = state => {
  return {
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
)(RegisterNavbar);

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
  width: 612px;
  padding: 15px;
  margin: 0 auto;
  background: #156692;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailContainer = styled.div`
  margin: 21px 0 10px 0;
  display: flex;
  flex-direction: column;
`;

const ConfDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DetailText = styled.p`
  margin: 0;
  color: #fff;
  font-family: sans-serif;
  font-size: 14px;
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

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  color: #fff;
`;
