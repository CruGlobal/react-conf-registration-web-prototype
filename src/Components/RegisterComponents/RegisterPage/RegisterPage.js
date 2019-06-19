import React, { Component } from "react";
import RegisterNavbar from "../RegisterNavbar/RegisterNavbar";
import RegisterFooter from "../RegisterFooter/RegisterFooter";
import styled from "@emotion/styled";
import BackgroundImg from "../../../img/rough_diagonal.png";
import { connect } from "react-redux";

import { selectConference, GetCurrentRegistrant } from "../../../actions";
import RegisterLanding from "./Subcomponents/RegisterLanding";
import RegisteringContent from "./Subcomponents/RegisteringContent";
import { Link } from "react-router-dom";
import _ from "lodash";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginState: true
    };
  }

  async componentWillMount() {
    const { getSelectedConference, getCurrentRegistrant, match } = this.props;
    const token = localStorage.getItem("crsToken");
    getSelectedConference(token, match.params.confID);
    getCurrentRegistrant(token, match.params.confID);
  }
  componentDidMount() {}

  componentDidUpdate() {
    if (!this.state.loginState) {
      this.props.history.push("/");
    }
  }

  render() {
    const {
      selectedConference,
      currentRegistration,
      match,
      history
    } = this.props;

    return (
      <>
        <PageContainer>
          <RegisterNavbar conference={selectedConference} history={history} />
          <RegisterSection>
            {match.params.pageID ? (
              <PageSelectorSection>
                {_.map(selectedConference.registrationPages, page => {
                  const PageButton = styled.div`
                    background: ${match.params.pageID === page.id
                      ? "#337AB7"
                      : "#d6d6d6"};
                    width: 170px;
                    height: 45px;
                    font-size: 14px;
                    color: ${match.params.pageID === page.id
                      ? "#ffffff"
                      : "#156692"};
                    padding: 0 10px;
                    display: block;
                    white-space: nowrap;
                    margin-bottom: 3px;
                    display: flex;
                    align-items: center;
                  `;

                  const Circle = styled.span`
                    width: 26px;
                    height: 26px;
                    border: 2px solid
                      ${match.params.pageID === page.id ? "#ffffff" : "#156692"};
                    color: ${match.params.pageID === page.id
                      ? "#ffffff"
                      : "#156692"};
                    line-height: 20px;
                    margin-right: 5px;
                    border-radius: 55px;
                    font-size: 14px;
                    text-align: center;
                    font-weight: 700;
                    font-family: sans-serif;
                    display: inline-block;
                  `;

                  if (page.blocks.length === 0) {
                    return null;
                  }
                  return (
                    <PageLink
                      key={page.id}
                      to={`/register/${selectedConference.id}/page/${page.id}/${
                        currentRegistration.primaryRegistrantId
                      }`}
                    >
                      <PageButton>
                        <Circle>
                          {_.indexOf(
                            selectedConference.registrationPages,
                            page
                          ) + 1}
                        </Circle>
                        {page.title}
                      </PageButton>
                    </PageLink>
                  );
                })}
              </PageSelectorSection>
            ) : null}

            {match.params.pageID ? (
              _.map(selectedConference.registrationPages, page => {
                return (
                  <RegisteringContent
                    history={history}
                    match={match}
                    key={page.id}
                    pageData={page}
                    currentData={currentRegistration}
                  />
                );
              })
            ) : (
              <RegisterLanding />
            )}
          </RegisterSection>
          <RegisterFooter />
        </PageContainer>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginState: state.authenticationReducer.loginState,
    selectedConference: state.conferenceReducer.selectedConference,
    currentRegistration: state.conferenceReducer.currentRegistration
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSelectedConference: (authToken, confID) => {
      dispatch(selectConference(authToken, confID));
    },
    getCurrentRegistrant: (authToken, confID) => {
      dispatch(GetCurrentRegistrant(authToken, confID));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);

// Maybe find a better way to cover div with background img?
const PageContainer = styled.div`
  background: url(${BackgroundImg}) #e7e8e6;
  min-width: 100%;
  min-height: 100%;
`;

const RegisterSection = styled.section`
  margin: 20px auto;
  background: #fff;
  width: 612px;
  padding: 15px;
`;

const PageSelectorSection = styled.div`
  width: 200px;
  float: left;
  position: absolute;
  margin-left: -230px;
  background: #fff;
  padding: 10px 0;
  margin-top: -14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
`;

const PageLink = styled(Link)`
  :hover {
    text-decoration: none;
  }
`;
