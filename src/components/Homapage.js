/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {collection, getDocs} from "firebase/firestore";
import {useNavigate, Link, NavLink} from "react-router-dom";
import Masonry from "react-masonry-css";
import "../styles/style.css";
import {v4 as uuid} from "uuid";

import LandingPage from "./LandingPageVideo";
import AddPin from "./AddPin";
import {
  MainWrapper,
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  SaveButton,
  FilterWrapper,
  FilterButton,
  FilterTitle,
  FitlerTagWrapper,
  FilterTagLink,
  ClearFitlerTagWrapper,
  ClearFilterTagLink,
} from "../styles/Homepage.module";
import {items} from "../const";
import {placements} from "../const";

function Homapage(props) {
  // check user visit is not done pageYOffset, so to prevent replay video everytime entering homepage, set isShowVideo' init to false
  const [isShowVideo, setIsShowVideo] = useState(false);
  const [isShowAddPin, setIsShowAddPin] = useState(false);
  const [pins, setPins] = useState([]);
  const [filteredPins, setFilteredPins] = useState([]);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [filterByPlacement, setFilterByPlacement] = useState("");
  const [filterByTag, setFilterByTag] = useState("");

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

  const handleIsShowFilter = () => {
    !isShowFilter ? setIsShowFilter(true) : setIsShowFilter(false);
  };

  const handleFilterByPlacement = (placement) => {
    setFilterByPlacement(placement);
    setFilteredPins([]);
    const clonedPins = [...pins];
    let filteredResult = [];
    if (!filterByTag) {
      filteredResult = clonedPins.filter(
        (pin) => pin.pinPlacement === placement
      );
      setFilteredPins(filteredResult);
    } else if (filterByTag) {
      filteredResult = clonedPins.filter(
        (pin) =>
          pin.pinPlacement === placement && pin.pinTags.includes(filterByTag)
      );
      setFilteredPins(filteredResult);
    }
  };

  const handleFilterByTag = (item) => {
    setFilterByTag(item);
    setFilteredPins([]);
    const clonedPins = [...pins];
    let filteredResult = [];
    if (!filterByPlacement) {
      filteredResult = clonedPins.filter((pin) => pin.pinTags.includes(item));
      setFilteredPins(filteredResult);
    } else if (filterByPlacement) {
      filteredResult = clonedPins.filter(
        (pin) =>
          pin.pinPlacement === filterByPlacement && pin.pinTags.includes(item)
      );
      setFilteredPins(filteredResult);
    }
  };

  const handlePlacementClear = () => {
    setFilterByPlacement("");
    setFilteredPins([]);
    if (!filterByTag) {
      return;
    }
    const clonedPins = [...pins];
    let filteredResult = clonedPins.filter((pin) =>
      pin.pinTags.includes(filterByTag)
    );
    setFilteredPins(filteredResult);
  };

  const handleTagClear = () => {
    setFilterByPlacement("");
    setFilteredPins([]);
    if (!filterByPlacement) {
      return;
    }
    const clonedPins = [...pins];
    let filteredResult = clonedPins.filter(
      (pin) => pin.pinPlacement === filterByPlacement
    );
    setFilteredPins(filteredResult);
  };

  return isShowVideo ? (
    <LandingPage setIsShowVideo={setIsShowVideo}></LandingPage>
  ) : (
    <>
      <FilterWrapper>
        <FilterButton onClick={handleIsShowFilter}>Filters</FilterButton>
      </FilterWrapper>
      {isShowFilter ? (
        <>
          <FilterWrapper>
            <FilterTitle>Placement : </FilterTitle>
            <ClearFitlerTagWrapper>
              <ClearFilterTagLink
                to={!filterByTag ? "/" : `/?tag=${filterByTag}`}
                onClick={handlePlacementClear}>
                Clear
              </ClearFilterTagLink>
            </ClearFitlerTagWrapper>
            {placements.map((placement) => {
              return (
                <FitlerTagWrapper key={uuid()}>
                  <FilterTagLink
                    to={
                      !filterByTag
                        ? `/?placement=${placement}`
                        : `/?placement=${placement}?tag=${filterByTag}`
                    }
                    onClick={() => {
                      handleFilterByPlacement(placement);
                    }}
                    style={({isActive}) => {
                      return {
                        color: isActive ? "white" : "black",
                      };
                    }}>
                    {placement}
                  </FilterTagLink>
                </FitlerTagWrapper>
              );
            })}
          </FilterWrapper>
          <FilterWrapper>
            <FilterTitle>Tags : </FilterTitle>
            <ClearFitlerTagWrapper>
              <ClearFilterTagLink
                to={
                  !filterByPlacement ? "/" : `/?placement=${filterByPlacement}`
                }
                onClick={handleTagClear}>
                Clear
              </ClearFilterTagLink>
            </ClearFitlerTagWrapper>
            {items.map((item) => {
              return (
                <FitlerTagWrapper key={uuid()}>
                  <FilterTagLink
                    to={
                      !filterByPlacement
                        ? `/?tag=${item}`
                        : `/?placement=${filterByPlacement}?tag=${item}`
                    }
                    onClick={() => {
                      handleFilterByTag(item);
                    }}
                    style={({isActive}) => {
                      return {
                        color: isActive ? "white" : "black",
                      };
                    }}>
                    {item}
                  </FilterTagLink>
                </FitlerTagWrapper>
              );
            })}
          </FilterWrapper>
        </>
      ) : (
        <></>
      )}

      <MainWrapper>
        <AllPinsWrapper>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className='my-masonry-grid'
            columnClassName='my-masonry-grid_column'>
            {filteredPins.length > 0
              ? filteredPins.map((pin, index) => (
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
                ))
              : pins.length > 0 &&
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
    </>
  );
}

export default Homapage;
