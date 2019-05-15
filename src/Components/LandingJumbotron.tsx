import React, { FunctionComponent, useState } from "react";
import styled from "@emotion/styled";
import _ from "lodash";
import bigBreak from "../img/big-break.jpg";
import climbingImg from "../img/187.jpg";
import friendsImg from "../img/311.jpg";
import APIController from "../Controllers/apicontroller";

type Props = {
  setConferences: any;
  setIsLoading: any;
};

let jumbotronImages = [
  {
    img: climbingImg,
    position: "60"
  },
  {
    img: friendsImg,
    position: "10"
  },
  {
    img: bigBreak,
    position: "85"
  }
];

let randomImage = jumbotronImages[_.random(0, jumbotronImages.length - 1)];

const LandingJumbotron: FunctionComponent<Props> = ({
  setConferences,
  setIsLoading
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const API = new APIController();

  // THIS IS CODE TO GET THE USER PROFILE, WILL FLESH OUT IN FURTHER DEVELOPMENT
  // const authToken = "3d2ab0731b570800a20040d69f2da815b7161bec";

  // const getUser = (url: string) => {
  //   return fetch(url, {
  //     method: "GET", // *GET, POST, PUT, DELETE, etc.
  //     mode: "cors", // no-cors, cors, *same-origin
  //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: "same-origin", // include, *same-origin, omit
  //     headers: {
  //       "Content-Type": "application/json",
  //       // "Content-Type": "application/x-www-form-urlencoded",
  //       Authorization: `${authToken}`
  //     },
  //     redirect: "follow", // manual, *follow, error
  //     referrer: "no-referrer" // no-referrer, *client
  //   })
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(res => console.log(res))
  //     .catch(error => console.log("Error", error));
  // };

  // getUser(
  //   "https://api.stage.eventregistrationtool.com/eventhub-api/rest/profile"
  // );

  const getConferences = (searchQuery: string) => {
    setIsLoading(true);
    setConferences([], null);
    API.getConferences(
      `${API.BASE_URL}${API.CONFERENCE_SEARCH_NAME}${searchQuery}`
    )
      .then(res => {
        setIsLoading(false);
        return res.json();
      })
      .then(response => setConferences(response, null))
      .catch(error => console.log("Error", error));
  };

  return (
    <JumbotronContainer>
      <ContentContainer>
        <JumbotronTitle>Search for an event</JumbotronTitle>
        <form>
          <InputContainer>
            <EventInput
              type="text"
              name="eventInput"
              placeholder="Event name"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                if (e.target.value.length >= 2) {
                  getConferences(`${e.target.value}`);
                }
              }}
              autoFocus={true}
            />
            <LocationInput>
              <option value="">-Any Location-</option>
            </LocationInput>
            <DateInput>
              <option>-Any Date-</option>
              <option value="">This Week</option>
              <option value="">This Month</option>
              <option value="">Next Month</option>
              <option value="">Greater Than Next Month</option>
            </DateInput>
            <SearchButton
              type="button"
              onClick={() => getConferences(`${searchQuery}`)}
            >
              Search
            </SearchButton>
          </InputContainer>
        </form>
      </ContentContainer>
    </JumbotronContainer>
  );
};

export default LandingJumbotron;

const JumbotronContainer = styled.div`
  width: 100%;
  height: 250px;
  background-image: url(${randomImage.img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 ${randomImage.position}%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  width: 1170px;
  height: auto;
`;

const JumbotronTitle = styled.h3`
  font-size: 2.4em;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px black;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const EventInput = styled.input`
  width: 470px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 120%;
  padding-left: 10px;
`;

const LocationInput = styled.select`
  width: 300px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const DateInput = styled.select`
  width: 300px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const SearchButton = styled.button`
  height: 40px;
  width: 90px;
  color: white;
  background-color: #3494c6;
  border-color: #337ab7;
  font-size: 120%;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  :hover {
    background-color: #337ab7;
  }
`;
