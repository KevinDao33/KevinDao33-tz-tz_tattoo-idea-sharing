import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

import {
  EditProfileBackgroundDisplay,
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
import Loader from "./Loader";

function EditProfile({app, db, uid}) {
  const [userData, setUserData] = useState(null);
  const [displayPhoto, setDisplayPhoto] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newUserPhotoName, setNewUserPhotoName] = useState("");

  const storage = getStorage(app);
  const redirect = useNavigate();

  const getUserData = async () => {
    const userquery = await getDoc(doc(db, "user", uid));
    const userAAA = userquery.data();

    setUserData({
      name: userAAA.name,
      email: userAAA.email,
      role: userAAA.role,
      following: userAAA.following,
      follower: userAAA.follower,
      pic: userAAA.pic,
      id: userAAA.uid,
      link: userAAA.link,
      desc: userAAA.desc,
    });
    setDisplayPhoto(userAAA.pic);
    setNewDescription(userAAA.desc);
    setNewName(userAAA.name);
    setNewLink(userAAA.link);
  };

  useEffect(() => {
    uid && !userData && getUserData();
  }, [uid]);

  const handleImageUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const imageFile = e.target.files[0];
    setSelectedFile(imageFile);

    const imageName = imageFile.name.split(".");
    // localStorage.setItem("newUserPhotoName", imageName[0]);
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Something went wrong, please try again later",
      })

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
    const userRef = doc(db, "user", uid);
    updateDoc(userRef, {
      name: newName,
      link: newLink,
      desc: newDescription,
    });
  };

  const getUserImageUrl = async (name) => {
    getDownloadURL(ref(storage, `profileImages/${name}`))
      .then((url) => {
        const userRef = doc(db, "user", uid);
        updateDoc(userRef, {
          pic: url,
        });
      })
      .then(async() => {
        await Swal.fire(
          "profile updated!",
          'Looking fresh',
          'success'
        )
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
      Swal.fire(
        'Nothing changed',
        "if not updating, press the leave-button on the left",
        'question'
      )

      return;
    } else if (newName || newDescription || newLink || selectedFile) {
      if (selectedFile && !newName && !newDescription && !newLink) {
        await uploadNewUserPhotoImage();
      } else if ((newName || newDescription || newLink) && !selectedFile) {
        await updateUserData();
        await Swal.fire(
          "Changes saved",
          'Looking fresh :)',
          'success'
        )
        
        redirect("/profile");
      } else if ((newName || newDescription || newLink) && selectedFile) {
        await updateUserData();
        await uploadNewUserPhotoImage();
      }
    }
  };

  return userData ? (
    <EditProfileBackgroundDisplay>
      <EditWrapper>
        <EditNavAllWrapper>
          <EditNavLeftWrapper>
            <BackButton onClick={back2Profile}></BackButton>
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
    </EditProfileBackgroundDisplay>
  ) : (
    <Loader />
  );
}

EditProfile.propTypes = {
  app: PropTypes.object,
  db: PropTypes.object,
  uid: PropTypes.string,
};

export default EditProfile;
