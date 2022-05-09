/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {
  getDoc,
  collection,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import imageCompression from "browser-image-compression";
import "../styles/style.css";
import {placements} from "../const";
import {v4 as uuid} from "uuid";

import {
  DarkBackgroundDisplay,
  CreateNewPinWrapper,
  PinDataUploadWrapper,
  NewPinDataWrapper,
  PinImageUploadWrapper,
  NewPinDataInput,
  CreatePinButton,
  UploadNewPinImageLabel,
  UploadNewPinImageInput,
  PreviewImage,
  PlacementTitle,
  PinTypeWrapper,
  PinTypeLabel,
  PinTypeInput,
} from "../styles/CreateNewPin.module";
import MultipleCombobox from "./MultipleCombobox";

function CreateNewPin(props) {
  const [pinName, setPinName] = useState("");
  const [pinDescription, setPinDescription] = useState("");
  const [pinLink, setPinLink] = useState("");
  const [pinTags, setPinTags] = useState([]);
  const [pinType, setPinType] = useState("tattoo");
  const [pinImage, setPinImage] = useState("");
  const [pinPlacement, setPinPlacement] = useState("");
  const [pinId, setPinId] = useState("");
  const [isGetPinImage, setIsGetPinImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const [isPinCreated, setIsPinCreated] = useState(false);
  const [userData, setUserData] = useState(null);

  const redirect = useNavigate();
  const storage = getStorage(props.app);

  async function handleImageUpload(e) {
    // show image preview
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);

      return;
    }

    const imageFile = e.target.files[0];
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

  const dataUrl2Blob = (dataUrl) => {
    // convert base64 to raw binary data held in a string
    const byteString = atob(dataUrl.split(",")[1]);
    // separate out the mime component
    let mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
    // write the bytes of the string to an ArrayBuffer
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let _ia = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      _ia[i] = byteString.charCodeAt(i);
    }

    let dataView = new DataView(arrayBuffer);
    let blob = new Blob([dataView], {type: mimeString});
    console.log(`uploading size ${blob.size / 1024 / 1024} MB`);

    return blob;
  };

  const successfullyCreatePin = (pinImageInLocal) => {
    dataUrl2Blob(pinImageInLocal);
    alert("pin successfully created!");
    redirect("/profile");
  };

  const submitPinData = () => {
    if (!pinName || !pinDescription || !pinLink || !pinTags || !pinPlacement) {
      alert("please check if all fields are filled");

      return;
    } else if (!pinImage) {
      alert("please upload and check the image for your pin");

      return;
    }
    const pinImageInLocal = localStorage.getItem("uploadedImage");
    pinImageInLocal
      ? successfullyCreatePin(pinImageInLocal)
      : alert("something went wrong, please try again :(");
  };

  const writeUserData = () => {
    if (!pinImage) {
      alert("please check image before creating a pin");

      return;
    }

    const collectionRefPin = collection(props.db, "pin");
    const docRefCollectionRefPin = doc(collectionRefPin);

    const collectionRefUser = doc(
      props.db,
      "user",
      props.uid,
      "pin",
      docRefCollectionRefPin.id
    );

    setDoc(collectionRefUser, {
      pinAutor: {uid: props.uid},
      // email: userInfo.email,
      // name: userInfo.name,
      pinId: docRefCollectionRefPin.id,
      pinDesc: pinDescription,
      pinName: pinName,
      pinImage: pinImage,
      pinLink: pinLink,
      pinTags: pinTags,
      pinPlacement: pinPlacement,
      pinType: pinType,
    });
    setDoc(docRefCollectionRefPin, {
      // change pinAuthor to contain only author uid
      pinAutor: {uid: props.uid},
      pinId: docRefCollectionRefPin.id,
      pinDesc: pinDescription,
      pinName: pinName,
      pinImage: pinImage,
      pinLink: pinLink,
      pinTags: pinTags,
      pinPlacement: pinPlacement,
      pinType: pinType,
    });
    // setPinId(docRefCollectionRefPin.id);
    // console.log('pinId', docRefCollectionRefPin.id);

    setIsPinCreated(true);
    return docRefCollectionRefPin.id;
  };

  const getPinImageUrl = (name) => {
    // const app = initializeApp(props.firebaseConfig);
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
    const result = dataUrl2Blob(uploadedImage);
    const storageRef = ref(storage, `pinImages/${uploadedImageName}`);

    try {
      uploadBytes(storageRef, result).then((snapshot) => {
        console.log("Uploaded image to firebase storage!");
        getPinImageUrl(uploadedImageName);
        alert("picture all set!")
      });
    } catch (error) {
      console.error(error);
    }
  }

  //get user follower list
  const getUserData = async () => {
    const userquery = await getDoc(doc(props.db, "user", props.uid));
    const userAAA = userquery.data();
    // console.log("userAAA", userAAA);
    setUserData(userAAA);
  };
  useEffect(() => {
    getUserData();
  }, [props.uid]);

  const sendNotification2Follower = (pinIddd) => {
    if (!userData) {
      console.log("no user data");
      return;
    }

    userData.follower.map(async (user) => {
      const docRef = collection(props.db, "user", user, "notification");
      const notificationDocRef = await addDoc(docRef, {
        isRead: false,
        authorUid: props.uid,
        authorName: userData.name,
        authorPic: userData.pic,
        timeStamp: serverTimestamp(),
        pinId: pinIddd,
        // notificationId: docRef.id,
      });
      updateDoc(
        doc(props.db, "user", user, "notification", notificationDocRef.id),
        {
          notificationId: notificationDocRef.id,
        }
      );
    });
  };

  async function handleCreatePin() {
    try {
      submitPinData(dataUrl2Blob);
      const pinIddd = writeUserData();
      //send alert to followers
      sendNotification2Follower(pinIddd);
      // isPinCreated && redirect("/profile");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DarkBackgroundDisplay>
      <CreateNewPinWrapper>
        {/* Pin Image */}
        <PinImageUploadWrapper>
          <UploadNewPinImageLabel>
            Upload Pin Image
            <UploadNewPinImageInput
              placeholder='Upload your Pin Image'
              type='file'
              accept='image/gif, image/jpeg, image/png, image/webp'
              multiple={false}
              onChange={handleImageUpload}></UploadNewPinImageInput>
            {selectedFile && <PreviewImage src={preview} />}
          </UploadNewPinImageLabel>
          <CreatePinButton onClick={uploadPinImage}>
            Check Image
          </CreatePinButton>
        </PinImageUploadWrapper>

        {/* Pin Info */}
        <PinDataUploadWrapper>
          <NewPinDataWrapper>
            <PlacementTitle>Pin Name :</PlacementTitle>
            <NewPinDataInput
              // placeholder='Enter Pin Name'
              value={pinName}
              onChange={(e) => setPinName(e.target.value)}></NewPinDataInput>
          </NewPinDataWrapper>
          <NewPinDataWrapper>
            <PlacementTitle>Description :</PlacementTitle>
            <NewPinDataInput
              // placeholder='Enter Pin Desc'
              value={pinDescription}
              onChange={(e) =>
                setPinDescription(e.target.value)
              }></NewPinDataInput>
          </NewPinDataWrapper>
          <NewPinDataWrapper>
            <PlacementTitle>Pin Link :</PlacementTitle>
            <NewPinDataInput
              // placeholder='Enter Pin Link'
              value={pinLink}
              onChange={(e) => setPinLink(e.target.value)}></NewPinDataInput>
          </NewPinDataWrapper>

          {/* add flash /tattoo selector */}
          <NewPinDataWrapper>
            <PlacementTitle>Type :</PlacementTitle>

            <PinTypeWrapper>
              <PinTypeLabel htmlFor='tattoo'>
                <PinTypeInput
                  type='radio'
                  name='type'
                  value='tattoo'
                  id='tattoo'
                  defaultChecked={true}
                  onClick={() => {
                    // document.getElementById("tattoo").checked = true;
                    setPinType("tattoo");
                  }}
                />
                Tattoo
              </PinTypeLabel>
              <PinTypeLabel htmlFor='flash'>
                <PinTypeInput
                  type='radio'
                  name='type'
                  value='flash'
                  id='flash'
                  onClick={() => {
                    // document.getElementById("flash").checked = true;
                    setPinType("flash");
                  }}
                />
                Flash
              </PinTypeLabel>
            </PinTypeWrapper>
          </NewPinDataWrapper>

          {/* add placement selector */}
          <NewPinDataWrapper>
            <PlacementTitle>Placement :</PlacementTitle>
            <div className='list-choice'>
              <div className='list-choice-title'>
                {pinPlacement ? pinPlacement : "Choose Placement"}
              </div>
              <div className='list-choice-objects'>
                {placements &&
                  placements.map((option) => {
                    return (
                      <label key={uuid()}>
                        <input
                          type='radio'
                          name='placement'
                          id={option}
                          onClick={() => {
                            document.getElementById(option).checked = true;
                            setPinPlacement(option);
                          }}
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
              </div>
            </div>
          </NewPinDataWrapper>

          <NewPinDataWrapper>
            <MultipleCombobox
              pinTags={pinTags}
              setPinTags={setPinTags}></MultipleCombobox>
          </NewPinDataWrapper>

          <CreatePinButton onClick={handleCreatePin}>Create</CreatePinButton>
        </PinDataUploadWrapper>
      </CreateNewPinWrapper>
    </DarkBackgroundDisplay>
  );
}

export default CreateNewPin;
