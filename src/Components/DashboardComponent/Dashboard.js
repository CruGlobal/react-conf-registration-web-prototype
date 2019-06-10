import React from "react";
import Navbar from "../LandingPageComponents/Navbar/Navbar";
import Footer from "../LandingPageComponents/Footer/Footer";
import styled from "@emotion/styled";

const Dashboard = () => {
  document.title = "My Dashboard | Event Registration Tool";

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
          <p>Stuff Here</p>
        </DashboardContainer>
        <Footer />
      </div>
    </>
  );
};

const DashboardContainer = styled.div`
  width: 1170px;
  margin: 0 auto;
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

export default Dashboard;
