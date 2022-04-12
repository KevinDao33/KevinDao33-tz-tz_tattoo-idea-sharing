import React, { useState, useEffect } from "react";
import {
  PorfileWrapper,
  UserImage,
  UserName,
  ShowFollow,
  ButtonWeapper,
  Button,
  UserStuffWrapper,
  SelectSection,
  UserPin,
} from "../styles/Profile.module";
import {
  AllPinsWrapper,
  PinWrapper,
  PinImage,
} from "../styles/Homepage.module";

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

const allPins = [
  { pinImage: chicken },
  { pinImage: kitty },
  { pinImage: wolf },
  { pinImage: flower },
  { pinImage: bear },
  { pinImage: cherry },
  { pinImage: death },
  { pinImage: frog },
  { pinImage: guitarfrog },
  { pinImage: hands },
  { pinImage: raccoon },
  { pinImage: trex },
  { pinImage: uglyflower },
  { pinImage: skateboard },
  { pinImage: duck },
];

function Profile() {
  const [showSection, setShowSection] = useState(0);
  // 0=> my pin/ 1=> my collection/ 2=> my schedual(artist only)
  const [pins, setPins] = useState(allPins);

  const showMyPin = () => {
    setShowSection(0);
  };
  const showMyCollection = () => {
    setShowSection(1);
  };
  const showMySchedule = () => {
    setShowSection(2);
  };

  return (
    <>
      <PorfileWrapper>
        <UserImage></UserImage>
        <UserName>Kevin Dao</UserName>
        <ShowFollow>{2} following</ShowFollow>
        <ShowFollow>{5} follower</ShowFollow>
        <ButtonWeapper>
          <Button>share</Button>
          <Button>edit</Button>
        </ButtonWeapper>

        <UserStuffWrapper>
          <ButtonWeapper>
            <SelectSection onClick={showMyPin}>my pin</SelectSection>
            <SelectSection onClick={showMyCollection}>
              my collection
            </SelectSection>
          </ButtonWeapper>

          {showSection === 0 ? (
            <AllPinsWrapper>
              {pins &&
                pins.map((pin, index) => (
                  <PinWrapper key={index}>
                    <PinImage src={pin.pinImage} />
                  </PinWrapper>
                ))}
            </AllPinsWrapper>
          ) : (
            <div>welcome to collection</div>
          )}
          
        </UserStuffWrapper>
      </PorfileWrapper>
    </>
  );
}

export default Profile;
