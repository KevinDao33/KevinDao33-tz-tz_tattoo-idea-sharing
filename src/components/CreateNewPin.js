import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getStorage, ref, uploadBytes} from "firebase/storage";
import imageCompression from "browser-image-compression";
import "../styles/style.css";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import {placements} from "../const";
import api from "../util/api";

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

function CreateNewPin({app, uid}) {
  const [pinName, setPinName] = useState("");
  const [pinDescription, setPinDescription] = useState("");
  const [pinLink, setPinLink] = useState("");
  const [pinTags, setPinTags] = useState([]);
  const [pinType, setPinType] = useState("tattoo");
  const [pinImage, setPinImage] = useState("");
  const [pinPlacement, setPinPlacement] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const [userData, setUserData] = useState(null);

  const redirect = useNavigate();
  const storage = getStorage(app);

  async function handleImageUpload(e) {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);

      return;
    }

    const imageFile = e.target.files[0];
    setSelectedFile(imageFile);

    const imageName = imageFile.name.split(".");
    localStorage.setItem("uploadedImageName", imageName[0]);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);

      const reader = new FileReader();
      reader.onload = (event) => {
        localStorage.setItem("uploadedImage", event.target.result);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error(error);
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

    return blob;
  };

  const successfullyCreatePin = async (pinImageInLocal) => {
    dataUrl2Blob(pinImageInLocal);
    await Swal.fire(
      "pin successfully created!",
      "You just made tz-tz a better place :)",
      "success"
    );
    redirect("/profile");
  };

  const submitPinData = async () => {
    if (!pinName || !pinDescription || !pinLink || !pinTags || !pinPlacement) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please check if all fields are filled",
      });

      return;
    } else if (!pinImage) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please upload and check the image for your pin",
      });

      return;
    }
    const pinImageInLocal = localStorage.getItem("uploadedImage");
    pinImageInLocal
      ? successfullyCreatePin(pinImageInLocal)
      : Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong, please try again :(",
        });
  };

  const writeUserData = async () => {
    if (!pinImage) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please check image before creating a pin",
      });

      return;
    }

    const newPinData = {
      pinDesc: pinDescription,
      pinName: pinName,
      pinImage: pinImage,
      pinLink: pinLink,
      pinTags: pinTags,
      pinPlacement: pinPlacement,
      pinType: pinType,
    };

    const returnedNewPinId = await api.setNewPinData(uid, newPinData);

    return returnedNewPinId;
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);

      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  async function uploadPinImage() {
    const uploadedImage = localStorage.getItem("uploadedImage");
    const uploadedImageName = localStorage.getItem("uploadedImageName");
    const result = dataUrl2Blob(uploadedImage);
    const storageRef = ref(storage, `pinImages/${uploadedImageName}`);

    try {
      uploadBytes(storageRef, result)
        .then(() => {
          api.getPinImageUrl(storage, uploadedImageName, setPinImage);
        })
        .then(() => {
          Swal.fire("Picture all set!", "good job! you're the best", "success");
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    api.getUserData(uid, setUserData);
  }, [uid]);

  const sendNotification2Follower = (newCreatePinId) => {
    if (!userData) {
      return;
    }

    userData.follower.map((user) =>
      api.sendNotification(user, uid, userData, newCreatePinId)
    );
  };

  async function handleCreatePin() {
    try {
      submitPinData(dataUrl2Blob);
      console.log("before writeUserData");

      const newPinId = await writeUserData();

      console.log("newPinId", newPinId);
      sendNotification2Follower(newPinId);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DarkBackgroundDisplay>
      <CreateNewPinWrapper>
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

        <PinDataUploadWrapper>
          <NewPinDataWrapper>
            <PlacementTitle>Pin Name :</PlacementTitle>
            <NewPinDataInput
              value={pinName}
              onChange={(e) => setPinName(e.target.value)}></NewPinDataInput>
          </NewPinDataWrapper>
          <NewPinDataWrapper>
            <PlacementTitle>Description :</PlacementTitle>
            <NewPinDataInput
              value={pinDescription}
              onChange={(e) =>
                setPinDescription(e.target.value)
              }></NewPinDataInput>
          </NewPinDataWrapper>
          <NewPinDataWrapper>
            <PlacementTitle>Pin Link :</PlacementTitle>
            <NewPinDataInput
              value={pinLink}
              onChange={(e) => setPinLink(e.target.value)}></NewPinDataInput>
          </NewPinDataWrapper>

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
                    setPinType("flash");
                  }}
                />
                Flash
              </PinTypeLabel>
            </PinTypeWrapper>
          </NewPinDataWrapper>

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
                      <label key={option}>
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

CreateNewPin.propTypes = {
  uid: PropTypes.string,
  app: PropTypes.object,
};

export default CreateNewPin;
