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

  const showAddPin = (pin, index) => {
    // setIsShowAddPin(true);
    pin.isShow = true;
    //use pin[index].isShow to show or not show AddPin
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

  const handleAddPinShow = (index) => {
    let mockPin = [...pins];
    mockPin[index].isShow = true;
    setPins(mockPin);
  };

  const handleClosePinShow = (index) => {
    let mockPin = [...pins];
    mockPin[index].isShow = false;
    setPins(mockPin);
  };

  return (
    <MainWrapper>
      <AllPinsWrapper>
        {pins.length > 0 &&
          pins.map((pin, index) => (
            <>
              <PinWrapper key={pin.pinName}>
                <PinImage src={pin.pinImage} />
                <SaveButton
                  onClick={() => {
                    handleAddPinShow(index);
                  }}>
                  save
                </SaveButton>
              </PinWrapper>

              {pin.isShow && (
                <AddPin
                  handleClosePinShow={handleClosePinShow}
                  indexxx={index}
                  key={pin.pinName}
                  isShowAddPin={isShowAddPin}
                  setIsShowAddPin={setIsShowAddPin}
                  uid={props.uid}
                  pin={pin}
                  pins={pins}
                />
              )}
            </>
          ))}
        {/* {isShowAddPin && (
          <AddPin
            isShowAddPin={isShowAddPin}
            setIsShowAddPin={setIsShowAddPin}
            uid={props.uid}
          />
        )} */}
      </AllPinsWrapper>
    </MainWrapper>
  );
}

export default Homapage;
