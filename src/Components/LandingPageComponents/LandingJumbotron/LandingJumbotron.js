import React, { useState } from "react";
import styled from "@emotion/styled";
import bigBreak from "../../../img/big-break.jpg";
import climbingImg from "../../../img/187.jpg";
import friendsImg from "../../../img/311.jpg";
import { conferenceSearch } from "../../../actions";
import { connect } from "react-redux";

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

let randomImage =
  jumbotronImages[
    Math.floor(Math.random() * Math.floor(jumbotronImages.length))
  ];

const LandingJumbotron = ({ setConferences, conferences }) => {
  // State Hook for storing our searchQuery
  const [searchQuery, setSearchQuery] = useState("");
  const [setLocation, changeLocation] = useState("");

  const generateLocations = conferences => {
    let locations = [];
    let addedLocations = [];

    // Map through all the conferences
    conferences.map(conference => {
      if (
        conference.locationName && // if the conference has a locationName
        !addedLocations.includes(conference.locationName) // and the addLocatiosn array  does not includes the current conference name
      ) {
        // Push an object that has the locationName and a default number of appearences(1)
        locations.push({
          locationName: conference.locationName,
          appeared: 1
        });
        addedLocations.push(conference.locationName); // Then push that locationName to our addedLocations array
        // Else if the conference has a locationName
      } else if (conference.locationName) {
        // If a object in our locations array includes the current conference locationName
        if (locations.some(e => e.locationName === conference.locationName)) {
          //Create a variable that filters through all the locations and finds the one that matches the locationName
          let currentLocation = locations.filter(
            loc => loc.locationName === conference.locationName
          );
          currentLocation[0].appeared += 1; // Up that objects appeared value + 1, since it has appeared additionally
        }
      }
      return null;
    });
    // We then map through all our locations
    return locations.map(location => {
      // If it has appeared more than once we have to include the number of times it has appeared
      if (location.appeared > 1) {
        return (
          <option key={location.locationName} value={location.locationName}>
            {`${location.locationName} (${location.appeared})`}
          </option>
        );
        // Else just create an option with the locationName
      } else {
        return (
          <option key={location.locationName} value={location.locationName}>
            {location.locationName}
          </option>
        );
      }
    });
  };

  return (
    <JumbotronContainer>
      <ContentContainer>
        <JumbotronTitle>Search for an event</JumbotronTitle>
        <form onSubmit={e => e.preventDefault()}>
          <InputContainer>
            <EventInput
              type="text"
              name="eventInput"
              placeholder="Event name"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                if (e.target.value.length >= 2) {
                  setConferences(e.target.value);
                }
              }}
            />
            {/* Need to actually make filter functionality work */}
            <LocationInput onChange={e => changeLocation(e.target.value)}>
              {conferences.length > 0 ? (
                <>
                  <option value="">-Any Location-</option>
                  {generateLocations(conferences)}
                </>
              ) : (
                <option value="">-Any Location-</option>
              )}
            </LocationInput>
            {/* Need to Filter Based on Search results start times */}
            <DateInput>
              <option>-Any Date-</option>
              <option value="">This Week</option>
              <option value="">This Month</option>
              <option value="">Next Month</option>
              <option value="">Greater Than Next Month</option>
            </DateInput>
            <SearchButton
              data-testid="search-button"
              type="button"
              onClick={() => {
                if (searchQuery.length >= 2) {
                  setConferences(`${searchQuery}`);
                }
              }}
            >
              Search
            </SearchButton>
          </InputContainer>
        </form>
      </ContentContainer>
    </JumbotronContainer>
  );
};

const mapStateToProps = state => {
  return {
    conferences: state.conferenceReducer.conferences
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setConferences: searchQuery => {
      dispatch(conferenceSearch(searchQuery));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingJumbotron);

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
  border: 1px solid transparent;
  border-color: #337ab7;
  font-size: 120%;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  :hover {
    background-color: #337ab7;
  }
`;
