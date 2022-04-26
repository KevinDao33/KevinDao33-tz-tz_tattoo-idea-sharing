/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  EditWrapper,
  EditNavAllWrapper,
  EditNavLeftWrapper,
  EditNavRightWrapper,
  BackButton,
  EditTitle,
  CancelButton,
  SaveButton,
  InputTextWrapper,
  InputDescTextWrapper,
  InputTextTitle,
  InputText,
  InputFileWrapper,
  InputFileTitle,
  LabelFile,
  PhotoDisplay,
  InputFile,
  InputDesc,
} from "../styles/EditProfile.module";

function EditProfile(props) {
  const [userData, setUserData] = useState("");
  const [displayPhoto, setDisplayPhoto] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newUserPhotoName, setNewUserPhotoName] = useState("");

  const storage = getStorage(props.app);
  const redirect = useNavigate();

  const getUserData = (userId) => {
    // eslint-disable-next-line no-unused-vars
    // change from onSnapShot to getDoc to prevent infinite loop
    const unsub = getDoc(doc(props.db, "user", userId), (doc) => {
      if (!props.uid) {
        return;
      } else if (props.uid && !userData) {
        setDisplayPhoto(doc.data().pic);
        setNewDescription(doc.data().desc);
        setNewName(doc.data().name);
        setNewLink(doc.data().link);
        return;
      }
      return;
    });
  };

  useEffect(() => {
    props.uid && !userData && getUserData(props.uid);
  }, [props.uid]);

  const handleImageUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const imageFile = e.target.files[0];
    setSelectedFile(imageFile);

    const imageName = imageFile.name.split(".");
    setNewUserPhotoName(imageName[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setDisplayPhoto(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handleNewDesc = (e) => {
    setNewDescription(e.target.value);
  };
  const handleNewLink = (e) => {
    setNewLink(e.target.value);
  };

  const back2Profile = () => {
    const leave = confirm("user data not changed, do you want to leave?");
    if (leave) {
      redirect("/profile");
    }
  };

  const cancelDataChange = () => {
    if (!userData) {
      alert("something went wrong, please try again later");

      return;
    }
    const cancel = confirm("data not saved, do you want to cancel update?");
    if (cancel) {
      setDisplayPhoto(userData.pic);
      setSelectedFile("");
      setNewName(userData.name);
      setNewLink(userData.link);
      setNewDescription(userData.desc);
    }
  };

  const updateUserData = async () => {
    const userRef = doc(props.db, "user", props.uid);
    updateDoc(userRef, {
      name: newName,
      link: newLink,
      desc: newDescription,
    });
  };

  const getUserImageUrl = async (name) => {
    getDownloadURL(ref(storage, `profileImages/${name}`))
      .then((url) => {
        const userRef = doc(props.db, "user", props.uid);
        updateDoc(userRef, {
          pic: url,
        });
      })
      .then(() => {
        alert("profile updated!");
        redirect("/profile");
      });
  };

  async function uploadNewUserPhotoImage() {
    const storageRef = ref(storage, `profileImages/${newUserPhotoName}`);

    try {
      uploadBytes(storageRef, selectedFile).then(() =>
        getUserImageUrl(newUserPhotoName)
      );
    } catch (error) {
      console.log(error);
    }
  }

  const submitNewUserData = async () => {
    if (!newName && !newDescription && !newLink && !selectedFile) {
      alert("if not updating, press the leave-button on the left");

      return;
    } else if (newName || newDescription || newLink || selectedFile) {
      if (selectedFile && !newName && !newDescription && !newLink) {
        // only new photo
        await uploadNewUserPhotoImage();
      } else if ((newName || newDescription || newLink) && !selectedFile) {
        // no new photo but other updates
        updateUserData();
      } else if ((newName || newDescription || newLink) && selectedFile) {
        // new photo and other updates
        //first upload new data to firestore
        await updateUserData();
        //then upload image and redirect to profile
        await uploadNewUserPhotoImage();
      }
    }
  };

  return userData ? (
    <EditWrapper>
      <EditNavAllWrapper>
        <EditNavLeftWrapper>
          <BackButton onClick={back2Profile}>{"<-"}</BackButton>
          <EditTitle>Settings</EditTitle>
        </EditNavLeftWrapper>

        <EditNavRightWrapper>
          <CancelButton onClick={cancelDataChange}>Cancel</CancelButton>
          <SaveButton onClick={submitNewUserData}>Save</SaveButton>
        </EditNavRightWrapper>
      </EditNavAllWrapper>

      <InputFileWrapper>
        <LabelFile>
          <PhotoDisplay src={displayPhoto} />
          <InputFile
            type='file'
            accept='image/gif, image/jpeg, image/png, image/webp'
            multiple={false}
            onChange={handleImageUpload}></InputFile>
        </LabelFile>
        <InputFileTitle>{userData.name}</InputFileTitle>
      </InputFileWrapper>

      <InputTextWrapper>
        <InputTextTitle>Name</InputTextTitle>
        <InputText
          type='text'
          value={newName}
          onChange={handleNewName}></InputText>
      </InputTextWrapper>

      <InputTextWrapper>
        <InputTextTitle>Link</InputTextTitle>
        <InputText
          type='text'
          value={newLink}
          onChange={handleNewLink}></InputText>
      </InputTextWrapper>

      <InputDescTextWrapper>
        <InputTextTitle>About Me</InputTextTitle>
        <InputDesc
          type='text'
          value={newDescription}
          onChange={handleNewDesc}></InputDesc>
      </InputDescTextWrapper>
    </EditWrapper>
  ) : (
    <div>Loading</div>
  );
}

export default EditProfile;
