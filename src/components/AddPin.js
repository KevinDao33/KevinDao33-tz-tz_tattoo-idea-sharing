/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
// import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs} from "firebase/firestore";
import {
  Overlay,
  AddPinOptions,
  LeaveButton,
  PinImage,
  PinName,
  AddToCollection,
  CollectionName,
  SaveButton,
  CreateCollectionWrapper,
  NameNewCollectionTitle,
  NameNewCollection,
} from "../styles/AddPin.module";

// remove later
import chicken from "../test-images/chicken.jpg";
import {prodErrorMap} from "firebase/auth";

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

function AddPin(props) {
  const [collections, setCollections] = useState([]);

  // useState(() => {
  //   setCollections(mockAllCollections);
  // }, []);

  const closeAddPin = () => {
    // eslint-disable-next-line react/prop-types
    props.setIsShowAddPin(false);
  };

  const getCollections = async (id) => {
    const querySnapshot = await getDocs(
      collection(db, "user", id, "collection")
    );
    let myCollections = [];
    querySnapshot.forEach((doc) => {
      myCollections.push({...doc.data()});
    });
    console.log("myCollections", myCollections);
    setCollections(myCollections);
  };

  useEffect(() => {
    props.uid && getCollections(props.uid);
  }, []);

  return (
    <>
      <AddPinOptions>
        <LeaveButton
          onClick={() => {
            props.handleClosePinShow(props.indexxx);
          }}>
          x
        </LeaveButton>
        <PinName>{props.pin.pinName}</PinName>
        <PinImage src={props.pin.pinImage} />

        {collections.length>0 &&
          collections.map((collectionName, index) => (
            <AddToCollection key={index}>
              <CollectionName>{Object.keys(collection)}</CollectionName>
              <SaveButton>save</SaveButton>
            </AddToCollection>
          ))}
      </AddPinOptions>

      <CreateCollectionWrapper>
        <NameNewCollectionTitle>new collection</NameNewCollectionTitle>
        <NameNewCollection></NameNewCollection>
        <SaveButton>create</SaveButton>
      </CreateCollectionWrapper>

      <Overlay />
    </>
  );
}

export default AddPin;
