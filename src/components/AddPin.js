/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {
  collection as co,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import Swal from "sweetalert2";

import {
  Overlay,
  AllAddPinWrapper,
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

function AddPin(props) {
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState("");

  const getCollections = async (id) => {
    const querySnapshot = await getDocs(co(props.db, "user", id, "collection"));

    let myCollections = [];
    querySnapshot.forEach((doc) => {
      myCollections.push({...doc.data()});
      // myCollections.collectionName = doc.id;
    });
    setCollections(myCollections);
  };

  useEffect(() => {
    props.uid && getCollections(props.uid);
  }, []);

  const addPinToCollection = (collection, pin) => {
    const collectionRef = doc(
      props.db,
      "user",
      props.uid,
      "collection",
      collection.collectionName
    );
    updateDoc(
      collectionRef,
      {
        pins: arrayUnion({
          pinName: pin.pinName,
          pinId: pin.pinId,
          pinImage: pin.pinImage,
        }),
      },
      {merge: true}
    );
    Swal.fire(
      "success",
      `pin added to ${collection.collectionName}`,
      "success"
    );
  };

  const setCollection2Firestore = (uid) => {
    const newCollectionRef = doc(
      props.db,
      "user",
      uid,
      "collection",
      newCollectionName
    );
    setDoc(
      newCollectionRef,
      {
        collectionName: newCollectionName,
        pins: [
          {
            pinId: props.pin.pinId,
            pinImage: props.pin.pinImage,
            pinName: props.pin.pinName,
          },
        ],
      },
      {merge: true}
    );
    // alert(`pin added to new collection ${newCollectionName}!`);
    Swal.fire(
      "success",
      `pin added to new collection ${newCollectionName}!`,
      "success"
    );
  };

  const createNewCollection = () => {
    console.log("do u want to create a new collection?");
    newCollectionName.length > 0
      ? setCollection2Firestore(props.uid)
      : // : alert("please enter a name for the new collection");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a name for the new collection",
          // footer: '<a href="">Why do I have this issue?</a>',
        });
  };

  return (
    <AllAddPinWrapper>
      <AddPinOptions>
        <LeaveButton
          onClick={() => {
            props.handleClosePinShow(props.indexxx);
          }}>
          x
        </LeaveButton>
        <PinName>{props.pin.pinName}</PinName>
        <PinImage src={props.pin.pinImage} />

        {collections.length > 0 &&
          collections.map((collection, index) => (
            <AddToCollection key={index}>
              {/* <CollectionName>{Object.keys(collection)}</CollectionName> */}
              <CollectionName>{collection.collectionName}</CollectionName>
              <SaveButton
                onClick={() => {
                  addPinToCollection(collection, props.pin);
                  props.handleClosePinShow(props.indexxx);
                }}>
                save
              </SaveButton>
            </AddToCollection>
          ))}
      </AddPinOptions>

      <CreateCollectionWrapper>
        <NameNewCollectionTitle>new collection</NameNewCollectionTitle>
        <NameNewCollection
          value={newCollectionName}
          onChange={(e) =>
            setNewCollectionName(e.target.value)
          }></NameNewCollection>
        <SaveButton onClick={createNewCollection}>create</SaveButton>
      </CreateCollectionWrapper>

      <Overlay />
    </AllAddPinWrapper>
  );
}

export default AddPin;
