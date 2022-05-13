/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
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

import {
  CollectionBackgroundDisplay,
  CollectionHeader,
  // UserPhoto,
  CollectionName,
  AllButtonWrapper,
  ButtonWrapper,
  Button,
  ButtonName,
  // SaveOrderButton,
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  RemoveButton,
  ShowEmptyMessage,
  PinImageDelete,
  BackButton,
} from "../styles/Collection.module";
import ArrangeCollection from "./ArrangeCollection";

function Collection(props) {
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
        doc(props.db, "user", id, "collection", lastSegment)
      );
      const pinsInCollec = querySnapshot.data();
      setPinsInCollection(pinsInCollec);
      // console.log('pinsInCollec', pinsInCollec);
    };
    getPinsInCollection(props.uid);
  };

  useEffect(() => {
    getCollectionName();
  }, [props.uid]);

  const removePinFromCollection = async (collecName, pin, index) => {
    const collectionRef = doc(
      props.db,
      "user",
      props.uid,
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
    alert(`pin removed from ${collectionName}`);
    window.location.reload();
  };

  const breakpointColumnsObj = {
    default: 4,
    // 2521: 6,
    // 2154: 5,
    // 1789: 4,
    // 1422: 3,
    // 1052: 2,
    // 688: 1,
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
          uid={props.uid}
          db={props.db}
          switch2Show={switch2Show}
        />
      ) : (
        <CollectionHeader id='CollectionHeader'>
          <BackButton
            onClick={() => {
              redirect("/profile");
            }}></BackButton>
          {/* <UserPhoto src={photo}></UserPhoto> */}
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

                          {/* <RemoveButton
                          onClick={() => {
                            removePinFromCollection(collectionName, pin, index);
                          }}>
                          -
                        </RemoveButton> */}
                        </PinWrapper>
                      ))}
                </Masonry>
              </AllPinsWrapper>
            </>
          ) : (
            //remove message for demo
            <ShowEmptyMessage></ShowEmptyMessage>
          )}
        </CollectionHeader>
      )}
    </CollectionBackgroundDisplay>
  );
}

export default Collection;
