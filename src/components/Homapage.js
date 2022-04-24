/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import Masonry from "react-masonry-css";

import "../styles/style.css";
import AddPin from "./AddPin";
import {
  MainWrapper,
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  SaveButton,
} from "../styles/Homepage.module";

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
  const redirect = useNavigate();

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

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

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
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'>
          {pins &&
            pins.map((pin, index) => (
              <PinWrapper key={pin.pinId}>
                {/* <PinWrapper key={pin.pinId}> */}
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
                {/* </PinWrapper> */}
                {pin.isShow && (
                  <AddPin
                    handleClosePinShow={handleClosePinShow}
                    indexxx={index}
                    key={pin.pinName}
                    isShowAddPin={isShowAddPin}
                    setIsShowAddPin={setIsShowAddPin}
                    // eslint-disable-next-line react/prop-types
                    uid={props.uid}
                    pin={pin}
                    pins={pins}
                  />
                )}
              </PinWrapper>
            ))}
        </Masonry>
      </AllPinsWrapper>
    </MainWrapper>
  );
}

export default Homapage;
