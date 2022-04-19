/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import AddPin from "./AddPin";
import {
  MainWrapper,
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  SaveButton,
} from "../styles/Homepage.module";
import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

function Homapage(props) {
  const [isShowAddPin, setIsShowAddPin] = useState(false);
  const [pins, setPins] = useState();

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const getPins = async () => {
    const notesSnapshot = await getDocs(collection(db, "pin"));
    const mockPins = notesSnapshot.docs.map((doc) => doc.data());
    const addIsShowPins = mockPins.map((pin) => ({...pin, isShow: false}));
    setPins(addIsShowPins);
    return pins;
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
        {pins &&
          pins.map((pin, index) => (
            <>
              <PinWrapper key={pin.id}>
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
