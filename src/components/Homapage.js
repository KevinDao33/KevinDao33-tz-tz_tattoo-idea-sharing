/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {collection, getDocs} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import Masonry from "react-masonry-css";
import "../styles/style.css";
// import {v4 as uuid} from "uuid";

import LandingPage from "./LandingPageVideo";
import AddPin from "./AddPin";
import {
  BackgroundDisplay,
  MainTitle,
  MainWrapper,
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  SaveButton,
  FilterWrapper,
  FilterButton,
  FilterButtonSpan,
  FilterTitle,
  ShowFilterKeyWrapper,
  ShowFilterKey,
  FitlerTagWrapper,
  FilterTagLink,
  ClearFitlerTagWrapper,
  ClearFilterTagLink,
  MainFilterWrapper,
  Heart,
  HoverPinName,
  LinkButton,
  PinTagIntroduction,
  PinTagIntroductionTitle,
  PinTagIntroductionContext,
} from "../styles/Homepage.module";
import {
  items,
  placements,
  tagsWithIntroduction,
  tagIntroductions,
} from "../const";

function Homapage(props) {
  // check user visit is not done pageYOffset, so to prevent replay video everytime entering homepage, set isShowVideo' init to false
  const [isShowVideo, setIsShowVideo] = useState(false);
  const [isShowAddPin, setIsShowAddPin] = useState(false);
  const [pins, setPins] = useState([]);
  const [filteredPins, setFilteredPins] = useState([]);
  const [filterByPlacement, setFilterByPlacement] = useState("");
  const [filterByTag, setFilterByTag] = useState("");
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowLike, setIsShowLike] = useState(false);

  const redirect = useNavigate();

  const checkIsShowVideo = () => {
    const isVisted = localStorage.getItem("isShowVideo");

    isVisted && setIsShowVideo(true);
  };

  useEffect(() => {
    checkIsShowVideo();
  }, []);

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

  // const handleLikeShow = (index)=>{

  // }

  const handleClosePinShow = (index) => {
    let mockPin = [...pins];
    mockPin[index].isShow = false;
    setPins(mockPin);
  };

  const handleIsShowFilter = () => {
    setIsShowFilter((prev) => !prev);
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
    setFilterByTag("");
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

  return !isShowVideo ? (
    <LandingPage setIsShowVideo={setIsShowVideo}></LandingPage>
  ) : (
    <BackgroundDisplay>
      {/* <MainTitle>Explore Tattoos</MainTitle> */}
      <FilterWrapper>
        <MainTitle>Explore Tattoos | </MainTitle>

        <ShowFilterKeyWrapper>
          <ShowFilterKey>{`${
            filterByPlacement && filterByPlacement
          } `}</ShowFilterKey>
          <ShowFilterKey>{`${filterByTag && filterByTag}`}</ShowFilterKey>
        </ShowFilterKeyWrapper>

        <FilterButton onClick={handleIsShowFilter}>
          <FilterButtonSpan>Filters</FilterButtonSpan>
        </FilterButton>
      </FilterWrapper>

      <MainFilterWrapper $filter={isShowFilter}>
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
              <FitlerTagWrapper key={placement}>
                <FilterTagLink
                  to={
                    !filterByTag
                      ? `/?placement=${placement}`
                      : `/?placement=${placement}?tag=${filterByTag}`
                  }
                  onClick={() => {
                    handleFilterByPlacement(placement);
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
              to={!filterByPlacement ? "/" : `/?placement=${filterByPlacement}`}
              onClick={handleTagClear}>
              Clear
            </ClearFilterTagLink>
          </ClearFitlerTagWrapper>
          {items.map((item) => {
            return (
              <FitlerTagWrapper key={item}>
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
      </MainFilterWrapper>

      <MainWrapper>
        <AllPinsWrapper>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className='my-masonry-grid'
            columnClassName='my-masonry-grid_column'>
            {filterByTag && tagsWithIntroduction.includes(filterByTag) && (
              <PinWrapper>
                <PinTagIntroduction>
                  <PinTagIntroductionTitle>
                    {filterByTag}
                  </PinTagIntroductionTitle>
                  <PinTagIntroductionContext>
                    {tagIntroductions[filterByTag]}
                  </PinTagIntroductionContext>
                </PinTagIntroduction>
              </PinWrapper>
            )}
            {filteredPins.length > 0
              ? filteredPins.map((pin, index) => (
                  <PinWrapper
                    key={index}
                    onMouseEnter={() => setIsShowLike(index)}
                    onMouseLeave={() => setIsShowLike(-1)}>
                    <PinImage
                      src={pin.pinImage}
                      onClick={() => {
                        redirect(`/pin-detail/${pin.pinId}`);
                      }}
                    />
                    <SaveButton
                      $like={isShowLike === index}
                      onClick={() => {
                        handleAddPinShow(index);
                      }}>
                      <Heart></Heart>
                    </SaveButton>

                    <LinkButton
                      $link={isShowLike === index}
                      onClick={() => {
                        window.location.assign(pin.pinLink);
                      }}></LinkButton>

                    <HoverPinName $name={isShowLike === index}>
                      {pin.pinName}
                    </HoverPinName>
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
                  <PinWrapper
                    key={index}
                    onMouseEnter={() => setIsShowLike(index)}
                    onMouseLeave={() => setIsShowLike(-1)}>
                    {/* <PinWrapper key={pin.pinId}> */}
                    <PinImage
                      src={pin.pinImage}
                      onClick={() => {
                        redirect(`/pin-detail/${pin.pinId}`);
                      }}
                    />
                    <SaveButton
                      $like={isShowLike === index}
                      onClick={() => {
                        handleAddPinShow(index);
                      }}>
                      <Heart></Heart>
                    </SaveButton>

                    <LinkButton
                      $link={isShowLike === index}
                      onClick={() => {
                        window.location.assign(pin.pinLink);
                      }}></LinkButton>

                    <HoverPinName $name={isShowLike === index}>
                      {pin.pinName}
                    </HoverPinName>
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
    </BackgroundDisplay>
  );
}

export default Homapage;
