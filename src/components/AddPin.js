import {useState, useEffect} from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import api from "../util/api";

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

function AddPin({uid, pin, handleClosePinShow, pinIndex}) {
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState("");

  useEffect(() => {
    api.getUserCollection(uid, setCollections);
  }, []);

  const addPinToCollection = (collection, pin) => {
    api.addPin2Collection(uid, collection.collectionName, pin);

    Swal.fire(
      "success",
      `pin added to ${collection.collectionName}`,
      "success"
    );
  };

  const setCollection2Firestore = () => {
    api.addPin2NewCollection(uid, pin, newCollectionName);
    Swal.fire(
      "success",
      `Pin added to new collection ${newCollectionName}!`,
      "success"
    );
  };

  const createNewCollection = () => {
    newCollectionName.length > 0
      ? setCollection2Firestore()
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
  uid: PropTypes.string,
  pin: PropTypes.object,
  handleClosePinShow: PropTypes.func,
  pinIndex: PropTypes.number,
};

export default AddPin;
