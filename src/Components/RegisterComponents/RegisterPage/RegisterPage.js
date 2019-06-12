import React, { Component } from "react";
import RegisterNavbar from "../RegisterNavbar/RegisterNavbar";
import RegisterFooter from "../RegisterFooter/RegisterFooter";
import styled from "@emotion/styled";
import BackgroundImg from "../../../img/rough_diagonal.png";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class RegisterPage extends Component {
  componentDidMount() {
    console.log(this.props.match.params.confID);
  }

  render() {
    const { loginState, selectedConference, match } = this.props;
    return (
      <>
        {loginState ? (
          <PageContainer>
            <RegisterNavbar />
            <RegisterSection>{match.params.confID}</RegisterSection>

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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);

const PageContainer = styled.div`
  background: url(${BackgroundImg});
  height: 100%;
`;

const RegisterSection = styled.section`
  margin: 20px auto;
  background: #fff;
  width: 582px;
  padding: 15px;
`;
