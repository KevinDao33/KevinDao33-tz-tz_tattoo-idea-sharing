/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import Login from "./Login";
import {NavLink} from "react-router-dom";
import {initializeApp} from "firebase/app";
import {
  getAuth,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  doc,
} from "firebase/firestore";
import {
  PorfileWrapper,
  UserImage,
  UserName,
  ShowFollow,
  ButtonWrapper,
  Button,
  UserStuffWrapper,
  SelectSection,
  AllCollectionsWrapper,
  CollectionWarpper,
  CollectionImage,
  CollectionName,
  CreatePinButton,
} from "../styles/Profile.module";
import {AllPinsWrapper, PinWrapper, PinImage} from "../styles/Homepage.module";

const firebaseConfig = {
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

const auth = getAuth();
const db = getFirestore(app);

const allCollectionList = [
  {
    arm: [
      {pinId: "idididid", pinName: "Chicken", pinImageLink: "imageLink"},
      {pinId: "ididi222", pinName: "Bear", pinImageLink: "imageLink222"},
    ],
  },
  {
    back: [
      {pinId: "ididi333", pinName: "Wolf", pinImageLink: "imageLink333"},
      {pinId: "ididi444", pinName: "Frog", pinImageLink: "imageLink444"},
    ],
  },
  {
    vintage: [
      {pinId: "ididi555", pinName: "Tree", pinImageLink: "imageLink555"},
      {pinId: "ididi666", pinName: "Flower", pinImageLink: "imageLink666"},
    ],
  },
];

function Profile(props) {
  // 0=> my pin/ 1=> my collection/ 2=> my schedual(artist only)
  const [showSection, setShowSection] = useState(1);
  const [pins, setPins] = useState();
  const [userData, setUserData] = useState();
  const [collectionList, setCollectionList] = useState(allCollectionList);

  const showMyPin = () => {
    setShowSection(0);
  };
  const showMyCollection = () => {
    setShowSection(1);
  };
  const showMySchedule = () => {
    setShowSection(2);
  };

  function logOut() {
    signOut(auth)
      .then(() => {
        props.setLogin(false);
        localStorage.clear();
      })
      .catch((error) => {});
  }

  const renderUserSection = () => {
    if (showSection === 0) {
      return (
        <AllPinsWrapper>
          {pins &&
            pins.map((pin, index) => (
              <PinWrapper key={index}>
                <PinImage src={pin.pinImage} />
              </PinWrapper>
            ))}
          <NavLink to='/create-pin'>
            <CreatePinButton>+</CreatePinButton>
          </NavLink>
        </AllPinsWrapper>
      );
    } else if (showSection === 1) {
      return (
        <AllCollectionsWrapper>
          {collectionList &&
            collectionList.map((collection, index) => (
              <CollectionWarpper key={index}>
                <CollectionImage></CollectionImage>
                <CollectionName>{Object.keys(collection)}</CollectionName>
              </CollectionWarpper>
            ))}
        </AllCollectionsWrapper>
      );
    } else if (showSection === 2) {
      return <div>welcom to my scheduel</div>;
    }
  };

  const getPins = async (id) => {
    const querySnapshot = await getDocs(collection(db, "user", id, "pin"));
    let myPins = [];
    querySnapshot.forEach((doc) => {
      myPins.push({...doc.data()});
    });
    setPins(myPins);
  };

  useEffect(() => {
    userData && getPins(userData.id);
  });

  const getUserData = (userId) => {
    const unsub = onSnapshot(doc(db, "user/" + userId), (doc) => {
      if (!props.uid) {
        return;
      } else if (props.uid) {
        setUserData({
          name: doc.data().name,
          email: doc.data().email,
          role: doc.data().role,
          following: doc.data().following,
          follower: doc.data().follower,
          pic: doc.data().pic,
          id: doc.data().uid,
          link: doc.data().link,
        });
      }
    });
  };

  useEffect(() => {
    getUserData(props.uid);
  });

  return (
    <>
      {props.login ? (
        userData && (
          <PorfileWrapper>
            <UserImage></UserImage>
            <UserName>{userData.name}</UserName>
            <ShowFollow>{userData.follower.length} following</ShowFollow>
            <ShowFollow>{userData.following.length} follower</ShowFollow>
            <ButtonWrapper>
              <Button>share</Button>
              <Button>edit</Button>
              <Button onClick={logOut}>logOut</Button>
            </ButtonWrapper>
            <UserStuffWrapper>
              <ButtonWrapper>
                <SelectSection onClick={showMyPin}>my pin</SelectSection>
                <SelectSection onClick={showMyCollection}>
                  my collection
                </SelectSection>
              </ButtonWrapper>
              {renderUserSection()}
            </UserStuffWrapper>
          </PorfileWrapper>
        )
      ) : (
        <Login userData={userData} setUserData={setUserData}></Login>
      )}
    </>
  );
}

export default Profile;
