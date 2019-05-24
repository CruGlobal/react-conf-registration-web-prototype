import React, { Component } from "react";
// import styled from "@emotion/styled";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPageComponents/LandingPage/LandingPage";
import HelpComponent from "./Components/HelpComponent/HelpComponent";
import AuthPage from "./Components/AuthComponent/AuthPage";
import APIController from "./Controllers/apicontroller";
import {
  applicationInit,
  setProfile,
  successfulLogin,
  failedLogin
} from "./actions";
import { connect } from "react-redux";

const API = new APIController();

class App extends Component {
  state = {
    cruStatus: true,
    isLoading: false,
    conferences: [],
    selectedConference: [],
    error: null
  };

  setConferences = (conferences, error) => {
    this.setState({
      conferences: conferences,
      error: error
    });
  };

  setIsLoading = status => {
    this.setState({
      isLoading: status
    });
  };

  checkLocalAuth = () => {
    const token = localStorage.getItem("crsToken");
    if (token) {
      this.props.getCrsToken();
    } else {
      this.props.getCrsToken();
    }
  };

  setSignInStatus = () => {
    if (localStorage.getItem("crsToken")) {
      this.props.successfulLogin();
    } else {
      this.props.failedLogin();
    }
  };

  getUserProfile = userToken => {
    API.getUser(`${API.BASE_URL}${API.PROFILE_SEARCH}`, userToken)
      .then(res => res.json())
      .then(response => {
        this.props.setProfile(response);
      });
  };

  async componentDidMount() {
    await this.checkLocalAuth();
    this.setSignInStatus();
    if (this.props.crsToken) {
      this.getUserProfile(this.props.crsToken);
    }
  }

  render() {
    const { conferences, isLoading } = this.state;

    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <LandingPage
                {...props}
                setConferences={this.setConferences}
                setIsLoading={this.setIsLoading}
                conferences={conferences}
                isLoading={isLoading}
              />
            )}
          />

          <Route path="/help" render={props => <HelpComponent {...props} />} />
          <Route
            exact
            path="/auth/"
            render={props => <AuthPage {...props} />}
          />

          <Route path="/auth/:id" render={props => <AuthPage {...props} />} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    crsToken: state.authenticationReducer.crsToken,
    loginState: state.authenticationReducer.loginState,
    profile: state.authenticationReducer.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getCrsToken: () => {
      dispatch(applicationInit());
    },
    successfulLogin: () => {
      dispatch(successfulLogin());
    },

    failedLogin: () => {
      dispatch(failedLogin());
    },
    setProfile: profile => {
      dispatch(setProfile(profile));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
