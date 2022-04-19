/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {initializeApp} from "firebase/app";
import {getFirestore, collection, addDoc, doc, setDoc} from "firebase/firestore";
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

const firebaseConfig = {
  // eslint-disable-next-line no-undef
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

function CreateNewPin() {
  const [pinName, setPinName] = useState("");
  const [pinDescription, setPinDescription] = useState("");
  const [pinLink, setPinLink] = useState("");
  const [pinImage, setPinImage] = useState();
  const [isGetPinImage, setIsGetPinImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [isPinCreated, setIsPinCreated] = useState(false);

  const redirect = useNavigate();

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

  const dataURLtoBlob = (dataURL) => {
    // convert base64 to raw binary data held in a string
    const byteString = atob(dataURL.split(",")[1]);
    // separate out the mime component
    let mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    // write the bytes of the string to an ArrayBuffer
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let _ia = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], {type: mimeString});
    console.log(`uploading size ${blob.size / 1024 / 1024} MB`);

    return blob;
  };

  const submitPinData = (dataURLtoBlob) => {
    if (!pinName || !pinDescription || !pinLink) {
      alert("please check if all fields are filled");

      return;
    } else if (pinName && pinDescription && pinLink && !pinImage) {
      alert("please upload and check the image for your pin");

      return;
    }
    dataURLtoBlob(localStorage.getItem("uploadedImage"));
    alert("pin successfully created!");
  };

  const writeUserData = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const collectionRefPin = collection(db, "pin");
    const docRefCollectionRefPin = doc(collectionRefPin);

    const collectionRefUser = doc(db, "user", userInfo.id, "pin", docRefCollectionRefPin.id);


    setDoc(collectionRefUser, {
      pinAutor: {
        email: userInfo.email,
        name: userInfo.name,
        uid: userInfo.id,
      },
      pinId: docRefCollectionRefPin.id,
      pinDesc: pinDescription,
      pinName: pinName,
      pinImage: pinImage,
      pinLink: pinLink,
      pinTags: ["vintage", "arm ideas", "black & white", "dot-work", "animal"],
    });
    setDoc(docRefCollectionRefPin, {
      pinAutor: {
        email: userInfo.email,
        name: userInfo.name,
        uid: userInfo.id,
      },
      pinId: docRefCollectionRefPin.id,
      pinDesc: pinDescription,
      pinName: pinName,
      pinImage: pinImage,
      pinLink: pinLink,
      pinTags: ["vintage", "arm ideas", "black & white", "dot-work", "animal"],
    });
    setIsPinCreated(true);
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

  async function uploadPinImage() {
    const uploadedImage = localStorage.getItem("uploadedImage");
    const uploadedImageName = localStorage.getItem("uploadedImageName");
    const result = dataURLtoBlob(uploadedImage);
    const storage = getStorage(app);
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
            uploadPinImage();
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
          onClick={async () => {
            submitPinData(dataURLtoBlob);
            writeUserData();
            isPinCreated && redirect("/profile");
          }}>
          Create
        </CreatePinButton>
      </PinDataUploadWrapper>
    </CreateNewPinWrapper>
  );
}

export default CreateNewPin;
