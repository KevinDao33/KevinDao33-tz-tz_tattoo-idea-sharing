/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {updateDoc, doc, getDoc, arrayRemove} from "firebase/firestore";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import photo from "../icon/profile.png";

import {
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  SaveButton as RemoveButton,
} from "../styles/Homepage.module";
import {
  CollectionHeader,
  UserPhoto,
  CollectionName,
  ArrangeButton,
  SaveOrderButton,
} from "../styles/Collection.module";

function Collection(props) {
  const [pinsInCollection, setPinsInCollection] = useState([]);
  // init cloocetionName with empty string (0427)
  const [collectionName, setCollectionName] = useState("");

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

  useEffect(async () => {
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

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(pinsInCollection.pins);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPinsInCollection((prev) => ({...prev, pins: items}));
  };

  return (
    <>
      <CollectionHeader>
        <UserPhoto src={photo}></UserPhoto>
        <CollectionName>{collectionName}</CollectionName>
        <ArrangeButton></ArrangeButton>
      </CollectionHeader>
      <AllPinsWrapper>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='testing'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {pinsInCollection.collectionName &&
                pinsInCollection.pins.length > 0 ? (
                  pinsInCollection.pins.map((pin, index) => (
                    <Draggable
                      key={index}
                      draggableId={JSON.stringify(index)}
                      index={index}>
                      {(provided) => (
                        <PinWrapper
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}>
                          <PinImage src={pin.pinImage} />
                          <RemoveButton
                            onClick={() => {
                              removePinFromCollection(
                                collectionName,
                                pin,
                                index
                              );
                            }}>
                            remove
                          </RemoveButton>
                        </PinWrapper>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <h2>Collection is empty :(</h2>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <SaveOrderButton
          onClick={() =>
            alert(
              "firebase doesn't support soting array orders, so the change won't be saved; however, feel free to come back an play with the drag and drop function."
            )
          }>
          save
        </SaveOrderButton>
      </AllPinsWrapper>
    </>
  );
}

export default Collection;
