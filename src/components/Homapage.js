/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import AddPin from "./AddPin";
import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs} from "firebase/firestore";

import {
  MainWrapper,
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  SaveButton,
} from "../styles/Homepage.module";

function Homapage(props) {
  const [isShowAddPin, setIsShowAddPin] = useState(false);
  const [pins, setPins] = useState([]);

  const app = initializeApp(props.firebaseConfig);
  const db = getFirestore(app);

  const showAddPin = () => {
    setIsShowAddPin(true);
  };

  const getPins = async () => {
    try {
      const notesSnapshot = await getDocs(collection(db, "pin"));
      const pins = notesSnapshot.docs.map((doc) => doc.data());
      setPins(pins);

      return pins;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPins();
  }, []);

  return (
    <MainWrapper>
      <AllPinsWrapper>
        {pins.length > 0 &&
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
