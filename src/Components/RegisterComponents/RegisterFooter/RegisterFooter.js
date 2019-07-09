import React from "react";
import styled from "@emotion/styled";

const RegisterFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <div>
        © {currentYear} | Created with Event Registration Tool, powerred by{" "}
        <a
          href="https://www.cru.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cru
        </a>
      </div>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  width: 100%;
  padding: 15px;
  margin: 0 auto;
  font-size: 14px;
  text-align: center;
  > p a {
    color: #337ab7;
    :hover {
      color: #23527c;
    }
  }
`;

export default RegisterFooter;
