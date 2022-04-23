/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

import AddPin from "./AddPin";
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

  const redirect = useNavigate();

  const getPins = async () => {
    try {
      const notesSnapshot = await getDocs(collection(props.db, "pin"));
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
              <PinWrapper key={pin.id}>
                <PinImage
                  src={pin.pinImage}
                  onClick={() => {
                    redirect(`/pin-detail/${pin.pinId}`);
                  }}
                />
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
                  // eslint-disable-next-line react/prop-types
                  uid={props.uid}
                  db={props.db}
                  pin={pin}
                  pins={pins}
                />
              )}
            </>
          ))}
      </AllPinsWrapper>
    </MainWrapper>
  );
}

export default Homapage;
