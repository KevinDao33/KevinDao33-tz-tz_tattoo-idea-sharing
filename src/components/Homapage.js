/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {collection, getDocs} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import Masonry from "react-masonry-css";

import "../styles/style.css";

import LandingPage from "./LandingPageVideo";
import AddPin from "./AddPin";
import {
  MainWrapper,
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  SaveButton,
} from "../styles/Homepage.module";

function Homapage(props) {
  const [isShowVideo, setIsShowVideo] = useState(true);
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

  return isShowVideo ? (
    <LandingPage setIsShowVideo={setIsShowVideo}></LandingPage>
  ) : (
    // <h1>there is nothing here now :(</h1>

    <MainWrapper>
      <AllPinsWrapper>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'>
          {pins &&
            pins.map((pin, index) => (
              <PinWrapper key={index}>
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
                    db={props.db}
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
