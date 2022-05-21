import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Masonry from "react-masonry-css";
import "../styles/style.css";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import arrangeIcon from "../icon/arrange.png";
import removeIcon from "../icon/remove.png";
import {SHOW_PINS, ARRANGE_PINS, DELETE_PINS} from "../const";
import api from "../util/api";

import {
  CollectionBackgroundDisplay,
  CollectionHeader,
  CollectionName,
  AllButtonWrapper,
  ButtonWrapper,
  Button,
  ButtonName,
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  RemoveButton,
  ShowEmptyMessage,
  PinImageDelete,
  BackButton,
} from "../styles/Collection.module";
import ArrangeCollection from "./ArrangeCollection";

function Collection({uid}) {
  const [pinsInCollection, setPinsInCollection] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [handlePin, setHandlePin] = useState(SHOW_PINS);

  const redirect = useNavigate();

  const getAllPinsInCollection = () => {
    const url = window.location.href;
    const decodeUrl = decodeURI(url);
    const lastSegment = decodeUrl.split("/").pop();
    setCollectionName(lastSegment);

    api.getAllPinsDataInCollection(setPinsInCollection, uid, lastSegment);
  };

  useEffect(() => {
    uid && getAllPinsInCollection();
  }, [uid]);

  const removePinFromCollection = async (collecName, pin, index) => {
    api.removePin(uid, collecName, pin);

    setPinsInCollection((prev) => prev.pins.splice(index, 1));
    await Swal.fire(`pin removed from ${collectionName}`, "bye bye", "success");

    window.location.reload();
  };

  const breakpointColumnsObj = {
    default: 4,
  };

  const switch2Show = () => {
    setHandlePin(SHOW_PINS);
  };

  const switch2Arrange = () => {
    setHandlePin(ARRANGE_PINS);
  };

  const switch2Delete = () => {
    handlePin !== DELETE_PINS
      ? setHandlePin(DELETE_PINS)
      : setHandlePin(SHOW_PINS);
  };

  return (
    <CollectionBackgroundDisplay id='CollectionBackgroundDisplay'>
      {handlePin === ARRANGE_PINS ? (
        <ArrangeCollection uid={uid} switch2Show={switch2Show} />
      ) : (
        <CollectionHeader id='CollectionHeader'>
          <BackButton
            onClick={() => {
              redirect("/profile");
            }}></BackButton>
          <CollectionName onClick={switch2Show}>
            {collectionName}
          </CollectionName>

          {pinsInCollection.collectionName &&
          pinsInCollection.pins.length > 0 ? (
            <>
              <AllButtonWrapper>
                <ButtonWrapper>
                  <Button src={arrangeIcon} onClick={switch2Arrange}></Button>
                  <ButtonName>
                    Arrange<br></br>Pin-Order
                  </ButtonName>
                </ButtonWrapper>

                <ButtonWrapper>
                  <Button src={removeIcon} onClick={switch2Delete}></Button>
                  <ButtonName>Delete Pin</ButtonName>
                </ButtonWrapper>
              </AllButtonWrapper>

              <AllPinsWrapper>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className='my-masonry-grid'
                  columnClassName='my-masonry-grid_column'>
                  {pinsInCollection.collectionName &&
                  pinsInCollection.pins.length > 0 &&
                  handlePin === DELETE_PINS
                    ? pinsInCollection.pins.map((pin, index) => (
                        <PinWrapper key={pin.pinId}>
                          <PinImageDelete src={pin.pinImage} />

                          <RemoveButton
                            onClick={() => {
                              removePinFromCollection(
                                collectionName,
                                pin,
                                index
                              );
                            }}>
                            -
                          </RemoveButton>
                        </PinWrapper>
                      ))
                    : pinsInCollection.pins.map((pin) => (
                        <PinWrapper key={pin.pinId}>
                          <PinImage src={pin.pinImage} />
                        </PinWrapper>
                      ))}
                </Masonry>
              </AllPinsWrapper>
            </>
          ) : (
            <ShowEmptyMessage></ShowEmptyMessage>
          )}
        </CollectionHeader>
      )}
    </CollectionBackgroundDisplay>
  );
}

Collection.propTypes = {
  uid: PropTypes.string,
};

export default Collection;
