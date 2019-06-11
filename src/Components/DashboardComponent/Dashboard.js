import React, { Component } from "react";
import Navbar from "../LandingPageComponents/Navbar/Navbar";
import Footer from "../LandingPageComponents/Footer/Footer";
import styled from "@emotion/styled";
import { faPlus, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { userConferenceSearch } from "../../actions";
import _ from "lodash";

document.title = "My Dashboard | Event Registration Tool";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showArchived: false
    };
  }

  handleCheckboxChange = event => {
    this.setState({
      showArchived: event.target.checked
    });
  };

  componentDidMount() {
    const token = localStorage.getItem("crsToken");
    this.props.getUserConferences(token);
  }

  render() {
    const { showArchived } = this.state;

    return (
      <>
        <div>
          <Navbar />
          <TitleSection>
            <DashboardContainer>
              <DashboardTitle>My Dashboard</DashboardTitle>
            </DashboardContainer>
          </TitleSection>
          <DashboardContainer>
            <ContentContainer>
              <p>
                Showing{" "}
                <strong>0 of {this.props.userConferences.length}</strong> events
              </p>
              <InputContainer>
                <DashboardButtons>
                  <Icon icon={faPlus} />
                  Create New Event
                </DashboardButtons>
                <DashboardButtons>
                  <Icon icon={faKey} />
                  Request Access to Existing Event
                </DashboardButtons>
                <FilterInput type="text" placeholder="Filter Events" />
              </InputContainer>
              <ConferencesContainer>
                {showArchived ? (
                  <div>
                    {_.map(this.props.userConferences, conference => {
                      return <div>{conference.name}</div>;
                    })}
                  </div>
                ) : (
                  <p>
                    No events found.{" "}
                    <DashboardLink href="#">Create a new event</DashboardLink>{" "}
                    or{" "}
                    <DashboardLink href="#">
                      request access to an existing event
                    </DashboardLink>{" "}
                    to get started!
                  </p>
                )}
              </ConferencesContainer>
              <ArchivedContainer>
                <label>
                  <ArchivedCheckbox
                    onChange={this.handleCheckboxChange}
                    type="checkbox"
                    checked={showArchived}
                  />
                  <strong>Show archived events</strong>
                </label>
              </ArchivedContainer>
            </ContentContainer>
          </DashboardContainer>
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userConferences: state.conferenceReducer.userConferences,
    crsToken: state.authenticationReducer.crsToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserConferences: token => {
      dispatch(userConferenceSearch(token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

const DashboardContainer = styled.div`
  width: 1170px;
  margin: 0 auto;
`;

const ContentContainer = styled.section`
  margin: 20px 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 14px;
`;

const ArchivedContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #333333;
`;

const ConferencesContainer = styled.div`
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
  border-radius: 4px;
  margin: 20px 0;
  > p {
    padding: 15px;
  }
`;

const TitleSection = styled.section`
  background-color: #fffef6;
  padding-top: 25px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ece8d8;
`;

const DashboardTitle = styled.h3`
  color: #7d7d83;
  font-weight: 300;
  font-family: sans-serif;
  font-size: 30px;
  margin-bottom: 10px;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

const DashboardButtons = styled.button`
  background: #00a651;
  border-color: #4cae4c;
  color: #fff;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 6px 12px;
  border-radius: 4px;
  margin-right: 5px;
  :hover {
    background-color: #449d44;
    border-color: #398439
    text-decoration: none;
  }
`;

const ArchivedCheckbox = styled.input`
  margin-right: 5px;
`;

const DashboardLink = styled.a`
  color: #245269;
  font-weight: 700;
  :hover {
    color: #245269;
  }
`;

const FilterInput = styled.input`
  height: 34px;
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 33%;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin-left: auto;
`;
