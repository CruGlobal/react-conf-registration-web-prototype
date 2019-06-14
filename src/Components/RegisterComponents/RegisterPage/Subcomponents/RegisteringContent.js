import React from "react";
import AddressQuestion from "../../QuestionsComponents/addressQuestion";
import GenderQuestion from "../../QuestionsComponents/genderQuestion";
import RadioQuestion from "../../QuestionsComponents/radioQuestion";
import YearQuestion from "../../QuestionsComponents/yearQuestion";
import SelectQuestion from "../../QuestionsComponents/selectQuestion";
import TextQuestion from "../../QuestionsComponents/textQuestion";
import TextAreaQuestion from "../../QuestionsComponents/textAreaQuestion";

const RegisteringContent = () => {
  return (
    <>
      <AddressQuestion />
      <GenderQuestion />
      <RadioQuestion />
      <YearQuestion />
      <SelectQuestion />
      <TextQuestion />
      <TextAreaQuestion />
    </>
  );
};

export default RegisteringContent;
