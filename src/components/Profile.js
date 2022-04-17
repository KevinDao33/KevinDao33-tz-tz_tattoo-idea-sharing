import React, {useState, useEffect} from "react";
import {
  PorfileWrapper,
  UserImage,
  UserName,
  ShowFollow,
  ButtonWrapper,
  Button,
  UserStuffWrapper,
  SelectSection,
  AllCollectionsWrapper,
  CollectionWarpper,
  CollectionImage,
  CollectionName,
  CreatePinButton,
} from "../styles/Profile.module";
import {AllPinsWrapper, PinWrapper, PinImage} from "../styles/Homepage.module";

import chicken from "../test-images/chicken.jpg";
import kitty from "../test-images/kitty.jpg";
import wolf from "../test-images/wolf.jpg";
import flower from "../test-images/flower.jpg";
import bear from "../test-images/bear.jpg";
import cherry from "../test-images/cherry.jpg";
import death from "../test-images/death.jpg";
import frog from "../test-images/frog.jpg";
import guitarfrog from "../test-images/guitar-frog.jpg";
import hands from "../test-images/hands.jpg";
import raccoon from "../test-images/raccoon.jpg";
import trex from "../test-images/t-rex.jpg";
import uglyflower from "../test-images/ugly-flower.jpg";
import skateboard from "../test-images/skateboard.jpg";
import duck from "../test-images/duck.jpg";

const mockAllPins = [
  {pinImage: chicken},
  {pinImage: kitty},
  {pinImage: wolf},
  {pinImage: flower},
  {pinImage: bear},
  {pinImage: cherry},
  {pinImage: death},
  {pinImage: frog},
  {pinImage: guitarfrog},
  {pinImage: hands},
  {pinImage: raccoon},
  {pinImage: trex},
  {pinImage: uglyflower},
  {pinImage: skateboard},
  {pinImage: duck},
];

const mockAllCollections = [
  {
    arm: [
      {pinId: "idididid", pinName: "Chicken", pinImageLink: "imageLink"},
      {pinId: "ididi222", pinName: "Bear", pinImageLink: "imageLink222"},
    ],
  },
  {
    back: [
      {pinId: "ididi333", pinName: "Wolf", pinImageLink: "imageLink333"},
      {pinId: "ididi444", pinName: "Frog", pinImageLink: "imageLink444"},
    ],
  },
  {
    vintage: [
      {pinId: "ididi555", pinName: "Tree", pinImageLink: "imageLink555"},
      {pinId: "ididi666", pinName: "Flower", pinImageLink: "imageLink666"},
    ],
  },
];


function Profile() {
  // myPin/ myCollection/ mySchedule(artist only)
  const MY_PIN = "myPin";
  const MY_COLLECTION = "myCollection";
  const MY_SCHEDULE = "mySchedule";

  const [showSection, setShowSection] = useState();
  const [pins, setPins] = useState();
  const [collections, setCollections] = useState();

  useEffect(() => {
    setShowSection(MY_COLLECTION);
    setPins(mockAllPins);
    setCollections(mockAllCollections);
  }, []);

  const showMyPin = () => {
    setShowSection(MY_PIN);
  };
  const showMyCollection = () => {
    setShowSection(MY_COLLECTION);
  };
  const showMySchedule = () => {
    setShowSection(MY_SCHEDULE);
  };

  function logOut() {
    signOut(auth)
      .then(() => {
        props.setLogin(false);
      })
      .catch((error) => {});
  }

  const renderUserSection = () => {
    if (showSection === MY_PIN) {
      return (
        <AllPinsWrapper>
          {pins &&
            pins.map((pin, index) => (
              <PinWrapper key={index}>
                <PinImage src={pin.pinImage} />
              </PinWrapper>
            ))}
          <NavLink to='/create-pin'>
            <CreatePinButton>+</CreatePinButton>
          </NavLink>
        </AllPinsWrapper>
      );
    } else if (showSection === MY_COLLECTION) {
      return (
        <AllCollectionsWrapper>
          {collections &&
            collections.map((collection, index) => (
              <CollectionWarpper key={index}>
                <CollectionImage></CollectionImage>
                <CollectionName>{Object.keys(collection)}</CollectionName>
              </CollectionWarpper>
            ))}
        </AllCollectionsWrapper>
      );
    } else if (showSection === MY_SCHEDULE) {
      return <div>welcome to my schedule</div>;
    }
  };

  return (
    <PorfileWrapper>
      <UserImage></UserImage>
      <UserName>Kevin Dao</UserName>
      <ShowFollow>{2} following</ShowFollow>
      <ShowFollow>{5} follower</ShowFollow>
      <ButtonWrapper>
        <Button>share</Button>
        <Button>edit</Button>
      </ButtonWrapper>
      <UserStuffWrapper>
        <ButtonWrapper>
          <SelectSection onClick={showMyPin}>my pin</SelectSection>
          <SelectSection onClick={showMyCollection}>
            my collection
          </SelectSection>
        </ButtonWrapper>
        {renderUserSection()}
      </UserStuffWrapper>
    </PorfileWrapper>
  );
}

export default Profile;
