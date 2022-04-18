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

function Homapage() {
  const [isShowAddPin, setIsShowAddPin] = useState(false);
  const [pins, setPins] = useState();

  const showAddPin = () => {
    setIsShowAddPin(true);
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const getPins = async () => {
    const notesSnapshot = await getDocs(collection(db, "pin"));
    const pins = notesSnapshot.docs.map((doc) => doc.data());
    console.log("pins", pins);
    setPins(pins);

    return pins;
  };

  useEffect(() => {
    getPins();
  }, []);

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
