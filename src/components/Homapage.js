import React, { useState, useEffect } from "react";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import AddPin from "./AddPin";
import {
  MainWrapper,
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  SaveButton,
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

function Homapage() {
  const [isShowAddPin, setIsShowAddPin] = useState(false);
  const [pins, setPins] = useState(allPins);

  const showAddPin = () => {
    setIsShowAddPin(true);
  };

  return (
    <MainWrapper>
      <AllPinsWrapper>
        {pins &&
          pins.map((pin, index) => (
            <PinWrapper key={index}>
              <PinImage src={pin.pinImage} />
              <SaveButton onClick={showAddPin}>save</SaveButton>
            </PinWrapper>
          ))}
        {isShowAddPin && (
          <AddPin
            isShowAddPin={isShowAddPin}
            setIsShowAddPin={setIsShowAddPin}
          />
        )}
      </AllPinsWrapper>
    </MainWrapper>
  );
}

export default Homapage;
