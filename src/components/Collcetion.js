/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {updateDoc, doc, getDoc, arrayRemove} from "firebase/firestore";
// import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import Masonry from "react-masonry-css";
import {v4 as uuid} from "uuid";
import "../styles/style.css";
import arrangeIcon from "../icon/arrange.png";
import removeIcon from "../icon/remove.png";
import {SHOW_PINS} from "../const";
import {ARRANGE_PINS} from "../const";
import {DELETE_PINS} from "../const";

import {
  CollectionHeader,
  UserPhoto,
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
  // DragPinWrapper,
} from "../styles/Collection.module";
import ArrangeCollection from "./ArrangeCollection";

function Collection(props) {
  const [pinsInCollection, setPinsInCollection] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [handlePin, setHandlePin] = useState(SHOW_PINS);

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
    };
    getPinsInCollection(props.uid);
  };

  // const getPinsInCollection = async (id) => {
  //   const querySnapshot = await getDoc(
  //     doc(props.db, "user", id, "collection", collectionName)
  //   );
  //   const pinsInCollec = querySnapshot.data();
  //   setPinsInCollection(pinsInCollec);
  // };

  // ===========================================

  // adjusted prevent infinite loop

  // useEffect(async () => {
  //   getCollectionName();
  //   props.uid && getPinsInCollection(props.uid);
  // }, [collectionName, props.uid, pinsInCollection]);

  useEffect(() => {
    getCollectionName();
  }, [props.uid]);

  const removePinFromCollection = (collecName, pin, index) => {
    const collectionRef = doc(
      props.db,
      "user",
      props.uid,
      "collection",
      collecName
    );
    updateDoc(collectionRef, {
      pins: arrayRemove({
        pinName: pin.pinName,
        pinId: pin.pinId,
        pinImage: pin.pinImage,
      }),
    });
    setPinsInCollection((prev) => prev.pins.splice(index, 1));
    alert(`pin removed from ${collectionName}`);
  };

  // const handleOnDragEnd = (result) => {
  //   if (!result.destination) return;

  //   const items = Array.from(pinsInCollection.pins);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);

  //   setPinsInCollection((prev) => ({...prev, pins: items}));
  // };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const switch2Show = () => {
    setHandlePin(SHOW_PINS);
  };

  const switch2Arrange = () => {
    setHandlePin(ARRANGE_PINS);
  };

  const switch2Delete = () => {
    setHandlePin(DELETE_PINS);
  };

  return (
    <>
      {handlePin === ARRANGE_PINS ? (
        <ArrangeCollection uid={props.uid} db={props.db} switch2Show={switch2Show}/>
      ) : (
        <CollectionHeader>
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
                    pinsInCollection.pins.map((pin, index) => (
                      <PinWrapper key={uuid()}>
                        <PinImage src={pin.pinImage} />
                        {handlePin === DELETE_PINS && (
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
                        )}
                      </PinWrapper>
                    ))}
                </Masonry>
              </AllPinsWrapper>
            </>
          ) : (
            <ShowEmptyMessage>The Collection is Empty :(</ShowEmptyMessage>
          )}
        </CollectionHeader>
      )}
    </>
  );
}

export default Collection;

{
  /* <SaveOrderButton
onClick={() =>
alert(
"firebase doesn't support soting array orders, so the change won't be saved; however, feel free to come back an play with the drag and drop function."
)
}>
save
</SaveOrderButton> */
}
