/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, {useState, useEffect, useRef} from "react";
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
  FooterBlank,
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
  // ===========================================
  const [pagedPins, setPagedPins] = useState([]);
  const [renderPins, setRenderPins] = useState([]);
  // ===========================================
  const [filterByPlacement, setFilterByPlacement] = useState("");
  const [filterByTag, setFilterByTag] = useState("");
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowLike, setIsShowLike] = useState(false);
  const pageNow = useRef(0);

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
      setRenderPins([]);
      // setPagedPins([]);
      setFilteredPins(filteredResult);

      setPagedPins(chunk(filteredResult, 16));

      pageNow.current = 0;
    } else if (filterByTag) {
      filteredResult = clonedPins.filter(
        (pin) =>
          pin.pinPlacement === placement && pin.pinTags.includes(filterByTag)
      );
      setRenderPins([]);
      // setPagedPins([]);
      setFilteredPins(filteredResult);

      setPagedPins(chunk(filteredResult, 16));

      pageNow.current = 0;
    }
  };

  const handleFilterByTag = (item) => {
    setFilterByTag(item);
    setFilteredPins([]);
    const clonedPins = [...pins];
    let filteredResult = [];
    if (!filterByPlacement) {
      filteredResult = clonedPins.filter((pin) => pin.pinTags.includes(item));
      setRenderPins([]);
      setFilteredPins(filteredResult);
      setPagedPins(chunk(filteredResult, 16));
      pageNow.current = 0;
    } else if (filterByPlacement) {
      filteredResult = clonedPins.filter(
        (pin) =>
          pin.pinPlacement === filterByPlacement && pin.pinTags.includes(item)
      );
      setRenderPins([]);
      setFilteredPins(filteredResult);
      setPagedPins(chunk(filteredResult, 16));
      pageNow.current = 0;
    }
  };

  const handlePlacementClear = () => {
    setFilterByPlacement("");
    setPagedPins(chunk(pins, 16));
    setRenderPins([]);
    setFilteredPins([]);
    if (!filterByTag) {
      return;
    }
    const clonedPins = [...pins];
    let filteredResult = clonedPins.filter((pin) =>
      pin.pinTags.includes(filterByTag)
    );
    setFilteredPins(filteredResult);
    setPagedPins(chunk(filteredResult, 16));
    pageNow.current = 0;
  };

  const handleTagClear = () => {
    setFilterByTag("");
    setPagedPins(chunk(pins, 16));
    setFilteredPins([]);
    if (!filterByPlacement) {
      return;
    }
    const clonedPins = [...pins];
    let filteredResult = clonedPins.filter(
      (pin) => pin.pinPlacement === filterByPlacement
    );
    setRenderPins([]);
    setPagedPins(chunk(filteredResult, 16));
    setFilteredPins(filteredResult);
    pageNow.current = 0;
  };

  // ======================== page the pins (each page 16 pins) ====================================
  const chunk = (arr, size) =>
    arr.reduce(
      (carry, _, index, orig) =>
        !(index % size)
          ? carry.concat([orig.slice(index, index + size)])
          : carry,
      []
    );

  const pagingPins = () => {
    if (!filteredPins.length > 0 && !pins.length > 0) {
      console.log("there is no pins");
      return;
    }
    !filteredPins.length > 0 && setPagedPins(chunk(pins, 16));
    // filteredPins.length > 0
    //   ? setPagedPins(chunk(filteredPins, 16))
    //   : setPagedPins(chunk(pins, 16));
  };

  useEffect(() => {
    pagingPins();
  }, [pins, filteredPins]);

  // ======================== set up intersection obsever ====================================
  // const makeInfiniteScrollPage = function () {
  //   const options = {
  //     rootMargin: "5px",
  //     threshold: 1,
  //   };

  //   const callback = (entries) => {
  //     entries.forEach((entry) => {
  //       console.log("pageNow.current", pageNow.current);

  //       if (entry.isIntersecting) {
  //         // =========================
  //         if (!pagedPins[pageNow.current]) {
  //           console.log("there is no more pin");

  //           return;
  //         } else if (!pagedPins[pageNow.current - 1]) {
  //           setRenderPins(pagedPins[pageNow.current]);
  //           pageNow.current++;
  //         } else {
  //           setRenderPins((prev) =>
  //             [...prev].concat(pagedPins[pageNow.current])
  //           );
  //           pageNow.current++;
  //         }
  //         // =========================
  //       }
  //     });
  //   };
  // const footerBlank = document.getElementById("footerBlank");
  //   const observer = new IntersectionObserver(callback, options);
  //   observer.observe(footerBlank);
  // };
  const options = {
    rootMargin: "5px",
    threshold: 1,
  };
  const footerBlank = document.getElementById("footerBlank");

  useEffect(() => {
    // if (pagedPins.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!pagedPins[pageNow.current]) {
            console.log("there is no more pin", pagedPins[pageNow.current]);

            return;
          } else if (!pagedPins[pageNow.current - 1]) {
            setRenderPins(pagedPins[pageNow.current]);
            pageNow.current++;
          } else {
            setRenderPins((prev) =>
              [...prev].concat(pagedPins[pageNow.current])
            );
            pageNow.current++;
          }
        }
      });
    }, options);
    if (pins.length > 0 && pins) {
      observer.observe(footerBlank);
    }
    return () => observer.disconnect();
  }, [pagedPins, renderPins]);

  // useEffect(() => {
  // if (pagedPins.length < 1) return;
  // makeInfiniteScrollPage();
  // console.log("pagedPins", pagedPins);
  // console.log("renderPins", renderPins);

  // return () => makeInfiniteScrollPage()
  // }, []);
  // useEffect(() => {
  //   pagedPins.length > 0 && makeInfiniteScrollPage();

  // }, [pagedPins, filterByPlacement]);

  // useEffect(() => {
  //   console.log("filteredPins", filteredPins);
  //   console.log("pagedPins", pagedPins);
  //   console.log("renderPins", renderPins);
  // }, [pagedPins, renderPins, filteredPins]);

  // ============================================================

  return !isShowVideo ? (
    <LandingPage setIsShowVideo={setIsShowVideo}></LandingPage>
  ) : (
    <BackgroundDisplay>
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
        <AllPinsWrapper id='AllPinsWrapper'>
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
            {renderPins.length > 0 &&
              renderPins.map((pin, index) => (
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
              ))}
          </Masonry>
        </AllPinsWrapper>
      </MainWrapper>
      <FooterBlank id='footerBlank' />
    </BackgroundDisplay>
  );
}

export default Homapage;
