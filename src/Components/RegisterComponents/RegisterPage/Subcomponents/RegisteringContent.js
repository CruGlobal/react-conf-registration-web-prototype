import React from "react";
import AddressQuestion from "../../QuestionsComponents/addressQuestion";
import GenderQuestion from "../../QuestionsComponents/genderQuestion";
import RadioQuestion from "../../QuestionsComponents/radioQuestion";
import YearQuestion from "../../QuestionsComponents/yearQuestion";

const RegisteringContent = () => {
  return (
    <>
      <AddressQuestion />
      <GenderQuestion />
      <RadioQuestion />
      <YearQuestion />
    </>
  );
};

export default RegisteringContent;
