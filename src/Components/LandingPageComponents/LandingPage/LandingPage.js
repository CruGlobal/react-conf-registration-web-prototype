import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import LandingJumbotron from "../LandingJumbotron/LandingJumbotron";
import LandingEventContainer from "../LandingEventContainer/LandingEventContainer";
import Footer from "../Footer/Footer";
import { connect } from "react-redux";
import { wipeCurrentData } from "../../../actions";

const LandingPage = ({ WipeCurrentData }) => {
  document.title = "Search for event | Event Registration Tool";
  useEffect(() => {
    WipeCurrentData();
  }, [WipeCurrentData]);
  return (
    <>
      <Navbar />
      <LandingJumbotron />
      <LandingEventContainer />
      <Footer />
    </>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    WipeCurrentData: () => {
      dispatch(wipeCurrentData());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
