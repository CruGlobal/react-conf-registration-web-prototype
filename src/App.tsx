import React, { Component } from "react";
// import styled from "@emotion/styled";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPageComponents/LandingPage/LandingPage";
import AuthPage from "./Components/AuthComponent/AuthPage";

class App extends Component {
  state = {
    profile: {},
    signedIn: true,
    cruStatus: true,
    isLoading: false,
    conferences: [],
    crsToken: "",
    selectedConference: [],
    error: null
  };

  signOut = () => {
    const { signedIn } = this.state;
    this.setState({
      signedIn: !signedIn,
      crsToken: "",
      profile: {}
    });
    localStorage.removeItem("crsToken");
  };

  setConferences = (conferences: Array<object>, error: any): void => {
    this.setState({
      conferences: conferences,
      error: error
    });
  };

  setProfile = (userProfile: object) => {
    this.setState({
      profile: userProfile
    });
  };

  setIsLoading = (status: boolean) => {
    this.setState({
      isLoading: status
    });
  };

  setCrsToken = (token: string) => {
    this.setState({
      crsToken: token
    });
  };

  checkLocalAuth = () => {
    const token = localStorage.getItem("crsToken");
    if (token) {
      this.setCrsToken(token);
    } else {
      this.setCrsToken("");
    }
  };

  setSignInStatus = () => {
    if (this.state.crsToken) {
      this.setState({
        signedIn: true
      });
    } else {
      this.setState({
        signedIn: false
      });
    }
  };

  async componentDidMount() {
    await this.checkLocalAuth();
    this.setSignInStatus();
  }

  render() {
    const { signedIn, conferences, isLoading, profile } = this.state;

    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <LandingPage
                {...props}
                userProfile={profile}
                signedIn={signedIn}
                signout={this.signOut}
                setConferences={this.setConferences}
                setIsLoading={this.setIsLoading}
                conferences={conferences}
                isLoading={isLoading}
              />
            )}
          />

          <Route
            exact
            path="/auth/"
            render={props => (
              <AuthPage
                {...props}
                setCrsToken={this.setCrsToken}
                setProfile={this.setProfile}
              />
            )}
          />

          <Route
            path="/auth/:id"
            render={props => (
              <AuthPage
                {...props}
                setCrsToken={this.setCrsToken}
                setProfile={this.setProfile}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
