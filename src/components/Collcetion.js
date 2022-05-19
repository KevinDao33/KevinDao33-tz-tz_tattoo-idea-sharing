import React, {useState, useEffect} from "react";
import {updateDoc, doc, getDoc, arrayRemove} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import Masonry from "react-masonry-css";
import {v4 as uuid} from "uuid";
import "../styles/style.css";
import arrangeIcon from "../icon/arrange.png";
import removeIcon from "../icon/remove.png";
import {SHOW_PINS} from "../const";
import {ARRANGE_PINS} from "../const";
import {DELETE_PINS} from "../const";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

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

function Collection({db, uid}) {
  const [pinsInCollection, setPinsInCollection] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [handlePin, setHandlePin] = useState(SHOW_PINS);

  const redirect = useNavigate();

  const getCollectionName = () => {
    const url = window.location.href;
    const decodeUrl = decodeURI(url);
    const lastSegment = decodeUrl.split("/").pop();
    setCollectionName(lastSegment);

    const getPinsInCollection = async (id) => {
      const querySnapshot = await getDoc(
        doc(db, "user", id, "collection", lastSegment)
      );
      const pinsInCollec = querySnapshot.data();
      setPinsInCollection(pinsInCollec);
    };
    getPinsInCollection(uid);
  };

  useEffect(() => {
    getCollectionName();
  }, [uid]);

  const removePinFromCollection = async (collecName, pin, index) => {
    const collectionRef = doc(
      db,
      "user",
      uid,
      "collection",
      collecName
    );
    await updateDoc(collectionRef, {
      pins: arrayRemove({
        pinName: pin.pinName,
        pinId: pin.pinId,
        pinImage: pin.pinImage,
      }),
    });
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
        <ArrangeCollection
          uid={uid}
          db={db}
          switch2Show={switch2Show}
        />
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
                        <PinWrapper key={uuid()}>
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
                        <PinWrapper key={uuid()}>
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
  db: PropTypes.object,
  uid: PropTypes.string,
};

export default Collection;
