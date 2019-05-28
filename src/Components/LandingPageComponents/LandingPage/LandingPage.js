import React from "react";
import Navbar from "../Navbar/Navbar";
import LandingJumbotron from "../LandingJumbotron/LandingJumbotron";
import LandingEventContainer from "../LandingEventContainer/LandingEventContainer";
import Footer from "../Footer/Footer";

const LandingPage = () => {
  document.title = "Search for event | Event Registration Tool";

  return (
    <>
      <Navbar />
      <LandingJumbotron />
      <LandingEventContainer />
      <Footer />
    </>
  );
};

export default LandingPage;
