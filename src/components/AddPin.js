import React, {useState} from "react";
import chicken from "../test-images/chicken.jpg";
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

const mockAllCollections = [
  "arm ideas",
  "back ideas",
  "black & white",
  "vintage",
  "dootwork",
  "others",
];

function AddPin(props) {
  const [collections, setCollections] = useState();

  useState(()=>{
    setCollections(mockAllCollections)
  },[])

  const closeAddPin = () => {
    // eslint-disable-next-line react/prop-types
    props.setIsShowAddPin(false);
  };

  return (
    <>
      <AddPinOptions>
        <LeaveButton onClick={closeAddPin}>x</LeaveButton>
        <PinName>Skateboard Chicken</PinName>
        <PinImage src={chicken} />

        {collections &&
          collections.map((collectionName, index) => (
            <AddToCollection key={index}>
              <CollectionName>{collectionName}</CollectionName>
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
