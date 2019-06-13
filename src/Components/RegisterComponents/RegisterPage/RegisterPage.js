import React, { Component } from "react";
import RegisterNavbar from "../RegisterNavbar/RegisterNavbar";
import RegisterFooter from "../RegisterFooter/RegisterFooter";
import styled from "@emotion/styled";
import BackgroundImg from "../../../img/rough_diagonal.png";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { selectConference } from "../../../actions";
import RegisterLanding from "./Subcomponents/RegisterLanding";
import RegisteringContent from "./Subcomponents/RegisteringContent";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registeringStarted: false
    };
  }
  componentDidMount() {
    const { getSelectedConference, match } = this.props;
    const token = localStorage.getItem("crsToken");
    getSelectedConference(token, match.params.confID);
  }

  changeRegistering = () => {
    this.setState({
      registeringStarted: true
    });
  };

  render() {
    const { loginState, selectedConference } = this.props;
    return (
      <>
        {loginState ? (
          <PageContainer>
            <RegisterNavbar conference={selectedConference} />
            <RegisterSection>
              {this.state.registeringStarted ? (
                <RegisteringContent />
              ) : (
                <RegisterLanding
                  selectedConference={selectedConference}
                  changeRegistering={this.changeRegistering}
                />
              )}
            </RegisterSection>
            <RegisterFooter />
          </PageContainer>
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginState: state.authenticationReducer.loginState,
    selectedConference: state.conferenceReducer.selectedConference
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSelectedConference: (authToken, confID) => {
      dispatch(selectConference(authToken, confID));
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
