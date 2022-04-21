/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {AllPinsWrapper, PinWrapper, PinImage} from "../styles/Homepage.module";
import {initializeApp} from "firebase/app";
import {getFirestore, doc, getDoc} from "firebase/firestore";

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
    // const pinsInCollec = querySnapshot.data();
    console.log(querySnapshot.data());
    setPinsInCollection(querySnapshot.data());
  };

  useEffect(async () => {
    const aaa = await getCollectionName();
    props.uid && getPinsInCollection(props.uid);
  }, [collectionName, props.uid]);

  return (
    <AllPinsWrapper>
      {pinsInCollection.collectionName && pinsInCollection.pins.length > 0 ? (
        pinsInCollection.pins.map((pin, index) => (
          <PinWrapper key={index}>
            <PinImage src={pin.pinImage} />
          </PinWrapper>
        ))
      ) : (
        <h2>There is no pin in this collection</h2>
      )}
    </AllPinsWrapper>
  );
}

export default Collection;
