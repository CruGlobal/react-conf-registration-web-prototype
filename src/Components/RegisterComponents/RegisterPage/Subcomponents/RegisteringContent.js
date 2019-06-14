import React from "react";
import styled from "@emotion/styled";
import CampusQuestion from "../../QuestionsComponents/campusQuestion";
import PhoneQuestion from "../../QuestionsComponents/PhoneQuestion";
import NumberQuestion from "../../QuestionsComponents/NumberQuestion";

const RegisteringContent = () => {
  return (
    <div>
      <CampusQuestion />
      <PhoneQuestion />
      <NumberQuestion />
    </div>
  );
};

export default RegisteringContent;
