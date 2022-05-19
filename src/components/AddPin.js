import {useState, useEffect} from "react";
import {
  collection as co,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

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

function AddPin({db, uid, pin, handleClosePinShow, pinIndex}) {
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState("");

  // !!!!!!!!!!!!!!!! move this function to api.js !!!!!!!!!!!!!!!!
  const getCollections = async (id) => {
    const querySnapshot = await getDocs(co(db, "user", id, "collection"));

    let myCollections = [];
    querySnapshot.forEach((doc) => {
      myCollections.push({...doc.data()});
    });
    setCollections(myCollections);
  };

  useEffect(() => {
    uid && getCollections(uid);
  }, []);
  // !!!!!!!!!!!!!!!! move this function to api.js !!!!!!!!!!!!!!!!

  // !!!!!!!!!!!!!!!! move this function to api.js !!!!!!!!!!!!!!!!
  const addPinToCollection = (collection, pin) => {
    const collectionRef = doc(
      db,
      "user",
      uid,
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
  // !!!!!!!!!!!!!!!! move this function to api.js !!!!!!!!!!!!!!!!“

  // !!!!!!!!!!!!!!!! move this function to api.js !!!!!!!!!!!!!!!!“
  const setCollection2Firestore = (uid) => {
    const newCollectionRef = doc(
      db,
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
            pinId: pin.pinId,
            pinImage: pin.pinImage,
            pinName: pin.pinName,
          },
        ],
      },
      {merge: true}
    );
    Swal.fire(
      "success",
      `pin added to new collection ${newCollectionName}!`,
      "success"
    );
  };
  // !!!!!!!!!!!!!!!! move this function to api.js !!!!!!!!!!!!!!!!“

  const createNewCollection = () => {
    newCollectionName.length > 0
      ? setCollection2Firestore(uid)
      : Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a name for the new collection",
        });
  };

  return (
    <AllAddPinWrapper>
      <AddPinOptions>
        <LeaveButton
          onClick={() => {
            handleClosePinShow(pinIndex);
          }}>
          x
        </LeaveButton>
        <PinName>{pin.pinName}</PinName>
        <PinImage src={pin.pinImage} />

        {collections.length > 0 &&
          collections.map((collection, index) => (
            <AddToCollection key={index}>
              <CollectionName>{collection.collectionName}</CollectionName>
              <SaveButton
                onClick={() => {
                  addPinToCollection(collection, pin);
                  handleClosePinShow(pinIndex);
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

AddPin.propTypes = {
  db: PropTypes.object,
  uid: PropTypes.string,
  pin: PropTypes.object,
  handleClosePinShow: PropTypes.func,
  pinIndex: PropTypes.number,
};

export default AddPin;
