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
import imageCompression from "browser-image-compression";
import MultiDownshift from "./MultiTagSelection";
import {matchSorter} from "match-sorter";
import glamorous, {Div} from "glamorous";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

function CreateNewPin() {
  const [pinName, setPinName] = useState();
  const [pinDescription, setPinDescription] = useState();
  const [pinLink, setPinLink] = useState();
  const [pinImage, setPinImage] = useState();
  const [isGetPinImage, setIsGetPinImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  async function handleImageUpload(e) {
    const imageFile = e.target.files[0];

    // show image preview
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(imageFile);

    // compress image
    console.log(`original size ${imageFile.size / 1024 / 1024} MB`);
    const imageName = imageFile.name.split(".");
    localStorage.setItem("uploadedImageName", imageName[0]);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(`compressed size ${compressedFile.size / 1024 / 1024} MB`);

      // convert pinImage from Blob to string and store in localStorage
      const reader = new FileReader();
      reader.onload = (event) => {
        localStorage.setItem("uploadedImage", event.target.result);
      };
      reader.readAsDataURL(compressedFile);
      setIsGetPinImage(true);
    } catch (error) {
      console.log(error);
    }
  }

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

  const getPinImageUrl = (name) => {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    getDownloadURL(ref(storage, `pinImages/${name}`)).then((url) => {
      setPinImage(url);
    });
  };

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

  async function testUpload() {
    const uploadedImage = localStorage.getItem("uploadedImage");
    const uploadedImageName = localStorage.getItem("uploadedImageName");
    const result = dataURLtoBlob(uploadedImage);
    const storage = getStorage();
    const storageRef = ref(storage, `pinImages/${uploadedImageName}`);

    try {
      uploadBytes(storageRef, result).then((snapshot) => {
        console.log("Uploaded image to firebase storage!");
        getPinImageUrl(uploadedImageName);
      });
    } catch (error) {
      console.log(error);
    }
  }

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
            onChange={handleImageUpload}></UploadNewPinImageInput>
          {selectedFile && <PreviewImage src={preview} />}
        </UploadNewPinImageLabel>
        <CreatePinButton
          onClick={() => {
            testUpload();
          }}>
          Check Image
        </CreatePinButton>
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

        <CreatePinButton
          onClick={() => {
            submitPinData(dataURLtoBlob);
          }}>
          Create
        </CreatePinButton>
      </PinDataUploadWrapper>
    </CreateNewPinWrapper>
  );
}

export default CreateNewPin;
