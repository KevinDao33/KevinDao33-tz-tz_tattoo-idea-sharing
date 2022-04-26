/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {updateDoc, doc, getDoc, arrayRemove} from "firebase/firestore";

import {
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  SaveButton as RemoveButton,
} from "../styles/Homepage.module";

function Collection(props) {
  const [pinsInCollection, setPinsInCollection] = useState([]);
  const [collectionName, setCollectionName] = useState("");

  const getCollection = () => {
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

  useEffect(() => {
    getCollection();
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

  return (
    <AllPinsWrapper>
      {pinsInCollection.collectionName && pinsInCollection.pins.length > 0 ? (
        pinsInCollection.pins.map((pin, index) => (
          <PinWrapper key={index}>
            <PinImage src={pin.pinImage} />
            <RemoveButton
              onClick={() => {
                removePinFromCollection(collectionName, pin, index);
              }}>
              remove
            </RemoveButton>
          </PinWrapper>
        ))
      ) : (
        <h2>Collection empty :(</h2>
      )}
    </AllPinsWrapper>
  );
}

export default Collection;
