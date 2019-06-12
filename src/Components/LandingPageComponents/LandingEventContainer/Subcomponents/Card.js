import React from "react";
import styled from "@emotion/styled";
import {
  faCalendarAlt,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import EvtFormater from "../../../../Controllers/formatercontroller";

const Card = ({ cardData }) => {
  const FORMATER = new EvtFormater();

  return (
    <CardContainer>
      <CardName>{cardData.name}</CardName>

      <DetailContainer>
        <Icon size="xs" icon={faCalendarAlt} />
        <DetailText>
          {FORMATER.dateFormater(
            cardData.eventStartTime,
            cardData.eventTimezone,
            "ddd, MMM D, YYYY h:00a "
          )}{" "}
          -{" "}
          {FORMATER.dateFormater(
            cardData.eventEndTime,
            cardData.eventTimezone,
            "ddd, MMM D, YYYY h:00a"
          )}
        </DetailText>
      </DetailContainer>

      {cardData.locationName ? (
        <DetailContainer>
          <Icon size="xs" icon={faMapMarkerAlt} />
          <DetailText>{cardData.locationName}</DetailText>
        </DetailContainer>
      ) : null}
      <DescriptionText>{cardData.description}</DescriptionText>
      <ButtonContainer>
        <RegisterButton to={`/register/${cardData.id}/page/`}>
          Register
        </RegisterButton>
      </ButtonContainer>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  padding: 20px;
  border: 1px solid #eee;
  border-left-width: 5px;
  border-radius: 3px;
  border-left-color: #3494c7;
  width: 543px;
  display: inline-block;
  vertical-align: top;
  margin-bottom: 10px;
`;

const CardName = styled.p`
  font-size: 24px;
  color: black;
`;

const RegisterButton = styled(Link)`
  background: #3494c7;
  border-color: #2f84cd;
  padding: 6px 12px;
  color: #fff;
  margin-top: 0.5em;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DetailContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

const DetailText = styled.p`
  margin: 0;
`;

const DescriptionText = styled.p`
  margin: 21px 0 10px 0;
`;
