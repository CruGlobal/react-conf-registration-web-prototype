import React from "react";
import Navbar from "../Navbar/Navbar";
import LandingJumbotron from "../LandingJumbotron/LandingJumbotron";
import LandingEventContainer from "../LandingEventContainer/LandingEventContainer";
import Footer from "../Footer/Footer";

const LandingPage = ({
  setConferences,
  setIsLoading,
  conferences,
  isLoading
}) => {
  document.title = "Search for event | Event Registration Tool";

  return (
    <>
      <Navbar />
      <LandingJumbotron
        setConferences={setConferences}
        setIsLoading={setIsLoading}
      />
      <LandingEventContainer conferences={conferences} isLoading={isLoading} />
      <Footer />
    </>
  );
};

export default LandingPage;
