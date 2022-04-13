import React, {useState, useEffect} from "react";
import {
  CreateNewPinWrapper,
  PinDataUploadWrapper,
  NewPinDataWrapper,
  PinImageUploadWrapper,
  NewPinDataInput,
  CreatePinButton,
  UploadNewPinImageLabel,
  UploadNewPinImageInput,
  PreviewImage,
} from "../styles/CreateNewPin.module";

function CreateNewPin() {
  const [pinName, setPinName] = useState();
  const [pinDescription, setPinDescription] = useState();
  const [pinLink, setPinLink] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

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

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // prevent memory leak
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
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
            accept='image/gif, image/jpeg, image/png, image/webp'
            onChange={onSelectFile}></UploadNewPinImageInput>
          {selectedFile && <PreviewImage src={preview} />}
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
