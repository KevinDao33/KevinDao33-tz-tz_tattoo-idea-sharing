import React, {useState, useEffect} from "react";
import {
  CreateNewPinWrapper,
  PinDataUploadWrapper,
  NewPinDataWrapper,
  PinImageUploadWrapper,
  NewPinDataTitle,
  NewPinDataInput,
  CreatePinButton,
  UploadNewPinImageLabel,
  UploadNewPinImageInput,
} from "../styles/CreateNewPin.module";

function CreateNewPin() {
  const [pinName, setPinName] = useState();
  const [pinDescription, setPinDescription] = useState();
  const [pinLink, setPinLink] = useState();

  const submitPinData = () => {
    if (!pinName || !pinDescription || !pinLink) {
      alert("please check if all fields are filled~");
      
      return;
    }
    // here's the pin-data that will be upload to firebase
    console.log("pinName", pinName);
    console.log("pinDescription", pinDescription);
    console.log("pinLink", pinLink);
  };

  return (
    <CreateNewPinWrapper>
      {/* Pin Image */}
      <PinImageUploadWrapper>
        <UploadNewPinImageLabel>
          Upload Pin Image
          <UploadNewPinImageInput
            placeholder='Upload your Pin Image'
            type='file'
            accept='image/gif, image/jpeg, image/png'></UploadNewPinImageInput>
        </UploadNewPinImageLabel>
      </PinImageUploadWrapper>

      {/* Pin Info */}
      <PinDataUploadWrapper>
        <NewPinDataWrapper>
          <NewPinDataInput
            placeholder='Enter Pin Name'
            value={pinName}
            onChange={(e) => setPinName(e.target.value)}></NewPinDataInput>
        </NewPinDataWrapper>
        <NewPinDataWrapper>
          <NewPinDataInput
            placeholder='Enter Pin Desc'
            value={pinDescription}
            onChange={(e) =>
              setPinDescription(e.target.value)
            }></NewPinDataInput>
        </NewPinDataWrapper>
        <NewPinDataWrapper>
          <NewPinDataInput
            placeholder='Enter Pin Link'
            value={pinLink}
            onChange={(e) => setPinLink(e.target.value)}></NewPinDataInput>
        </NewPinDataWrapper>

        <CreatePinButton onClick={submitPinData}>Create</CreatePinButton>
      </PinDataUploadWrapper>
    </CreateNewPinWrapper>
  );
}

export default CreateNewPin;
