import {useState, useEffect, useRef} from "react";
import {collection, getDocs} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import Masonry from "react-masonry-css";
import "../styles/style.css";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

import {
  BackgroundDisplay,
  MainTitle,
  MainWrapper,
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  SaveButton,
  FilterTitleWrapper,
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
import AddPin from "./AddPin";
import LandingPage from "./LandingPageVideo";
import Loader from "./Loader";

function Homapage({db, uid}) {
  const [isShowVideo, setIsShowVideo] = useState(false);
  const [isShowAddPin, setIsShowAddPin] = useState(false);
  const [pins, setPins] = useState([]);
  const [filteredPins, setFilteredPins] = useState([]);
  const [pagedPins, setPagedPins] = useState([]);
  const [renderPins, setRenderPins] = useState([]);
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

  const breakpointColumnsObj = {
    default: 7,
    2280: 6,
    1950: 5,
    1620: 4,
    1300: 3,
    960: 2,
    300: 1,
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
      setFilteredPins(filteredResult);

      setPagedPins(chunk(filteredResult, 16));

      pageNow.current = 0;
    } else if (filterByTag) {
      filteredResult = clonedPins.filter(
        (pin) =>
          pin.pinPlacement === placement && pin.pinTags.includes(filterByTag)
      );
      setRenderPins([]);
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
      return;
    }
    !filteredPins.length > 0 && setPagedPins(chunk(pins, 16));
  };

  useEffect(() => {
    pagingPins();
  }, [pins, filteredPins]);

  const options = {
    rootMargin: "10px",
    threshold: 0.7,
  };

  useEffect(() => {
    const footerBlank = document.getElementById("footerBlank");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!pagedPins[pageNow.current]) {
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
    if (pins.length > 0 && pins && isShowVideo) {
      observer.observe(footerBlank);
    }
    return () => observer.disconnect();
  }, [pagedPins, renderPins, isShowVideo]);

  return !isShowVideo ? (
    <LandingPage setIsShowVideo={setIsShowVideo}></LandingPage>
  ) : pins.length > 0 ? (
    <BackgroundDisplay>
      <FilterTitleWrapper>
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
      </FilterTitleWrapper>
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
          <FilterTitle id={"Tags"}>Tags : </FilterTitle>
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
                    onClick={async () => {
                      if (!uid) {
                        await Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "Please sign-in bofore adding pins :o",
                        });
                        redirect("profile");
                        return;
                      }
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
                      pinIndex={index}
                      key={pin.pinName}
                      isShowAddPin={isShowAddPin}
                      setIsShowAddPin={setIsShowAddPin}
                      db={db}
                      uid={uid}
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
  ) : (
    <>
      <Loader></Loader>
      <FooterBlank id='footerBlank' />
    </>
  );
}

Homapage.propTypes = {
  db: PropTypes.object,
  uid: PropTypes.string,
};

export default Homapage;
