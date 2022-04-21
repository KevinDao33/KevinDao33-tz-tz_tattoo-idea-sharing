/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {initializeApp} from "firebase/app";
import {
  getFirestore,
  updateDoc,
  doc,
  getDoc,
  arrayRemove,
} from "firebase/firestore";

import {
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  SaveButton as RemoveButton,
} from "../styles/Homepage.module";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Collection(props) {
  const [pinsInCollection, setPinsInCollection] = useState([]);
  const [collectionName, setCollectionName] = useState();

  const getCollectionName = () => {
    const url = window.location.href;
    const decodeUrl = decodeURI(url);
    const lastSegment = decodeUrl.split("/").pop();
    setCollectionName(lastSegment);
  };

  const getPinsInCollection = async (id) => {
    const querySnapshot = await getDoc(
      doc(db, "user", id, "collection", collectionName)
    );
    const pinsInCollec = querySnapshot.data();
    setPinsInCollection(pinsInCollec);
  };

  useEffect(async () => {
    getCollectionName();
    props.uid && getPinsInCollection(props.uid);
  }, [collectionName, props.uid, pinsInCollection]);

  const removePinFromCollection = (collecName, pin, index) => {
    const collectionRef = doc(db, "user", props.uid, "collection", collecName);
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
