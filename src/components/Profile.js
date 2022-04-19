/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import Login from "./Login";
import {NavLink} from "react-router-dom";
import {initializeApp} from "firebase/app";
import {getAuth, signOut} from "firebase/auth";
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
  CreateButton,
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

// const mockAllCollections = [
//   {
//     arm: [
//       {pinId: "idididid", pinName: "Chicken", pinImageLink: "imageLink"},
//       {pinId: "ididi222", pinName: "Bear", pinImageLink: "imageLink222"},
//     ],
//   },
//   {
//     back: [
//       {pinId: "ididi333", pinName: "Wolf", pinImageLink: "imageLink333"},
//       {pinId: "ididi444", pinName: "Frog", pinImageLink: "imageLink444"},
//     ],
//   },
//   {
//     vintage: [
//       {pinId: "ididi555", pinName: "Tree", pinImageLink: "imageLink555"},
//       {pinId: "ididi666", pinName: "Flower", pinImageLink: "imageLink666"},
//     ],
//   },
// ];

function Profile(props) {
  // myPin/ myCollection/ mySchedule(artist only)
  const MY_PIN = "myPin";
  const MY_COLLECTION = "myCollection";
  const MY_SCHEDULE = "mySchedule";

  const [showSection, setShowSection] = useState();
  const [pins, setPins] = useState();
  const [userData, setUserData] = useState();
  const [collections, setCollections] = useState();

  useEffect(() => {
    setShowSection(MY_COLLECTION);
    // setCollections(mockAllCollections);
  }, []);

  const showMyPin = () => {
    setShowSection(MY_PIN);
  };
  const showMyCollection = () => {
    setShowSection(MY_COLLECTION);
  };
  const showMySchedule = () => {
    setShowSection(MY_SCHEDULE);
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
    if (showSection === MY_PIN) {
      return (
        <AllPinsWrapper>
          {pins &&
            pins.map((pin, index) => (
              <PinWrapper key={index}>
                <PinImage src={pin.pinImage} />
              </PinWrapper>
            ))}
          <NavLink to='/create-pin'>
            <CreateButton>+<br></br>pin</CreateButton>
          </NavLink>
        </AllPinsWrapper>
      );
    } else if (showSection === MY_COLLECTION) {
      return (
        <AllCollectionsWrapper>
          {collections &&
            collections.map((collection, index) => (
              <CollectionWarpper key={index}>
                <CollectionImage></CollectionImage>
                <CollectionName>{Object.keys(collection)}</CollectionName>
              </CollectionWarpper>
            ))}
             <CreateButton>create<br></br>collec</CreateButton>
        </AllCollectionsWrapper>
      );
    } else if (showSection === MY_SCHEDULE) {
      return <div>welcom to my schedule</div>;
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

  const getCollections = async (id) => {
    const querySnapshot = await getDocs(
      collection(db, "user", id, "collection")
    );
    let myCollections = [];
    querySnapshot.forEach((doc) => {
      myCollections.push({...doc.data()});
    });
    console.log("myCollections", myCollections);
    setCollections(myCollections);

    return;
  };

  useEffect(() => {
    userData && getPins(userData.id);
    userData && getCollections(userData.id);
  }, [userData]);

  const getUserData = (userId) => {
    const unsub = onSnapshot(doc(db, "user/" + userId), (doc) => {
      if (!props.uid) {
        return;
      } else if (props.uid && !userData) {
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
        return;
      }
      return;
    });
  };

  useEffect(() => {
    !userData && getUserData(props.uid);
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
