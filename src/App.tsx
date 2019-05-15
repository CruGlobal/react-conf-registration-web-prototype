import React, { Component } from "react";
// import styled from "@emotion/styled";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import LandingJumbotron from "./Components/LandingJumbotron/LandingJumbotron";
import LandingEventContainer from "./Components/LandingEventContainer/LandingEventContainer";
import Footer from "./Components/Footer/Footer";

class App extends Component {
  state = {
    name: "Christian",
    signedIn: true,
    cruStatus: true,
    isLoading: false,
    conferences: [],
    error: null
  };

  signOut = () => {
    const { signedIn } = this.state;
    this.setState({ signedIn: !signedIn });
  };

  setConferences = (conferences: Array<object>, error: any): void => {
    this.setState({
      conferences: conferences,
      error: error
    });
  };

  setIsLoading = (status: boolean) => {
    this.setState({
      isLoading: status
    });
  };

  render() {
    const { name, signedIn, conferences, isLoading } = this.state;
    return (
      <>
        <Navbar name={name} signedIn={signedIn} signout={this.signOut} />
        <LandingJumbotron
          setConferences={this.setConferences}
          setIsLoading={this.setIsLoading}
        />
        <LandingEventContainer
          conferences={conferences}
          isLoading={isLoading}
        />
        <Footer />
      </>
    );
  }
}

export default App;
