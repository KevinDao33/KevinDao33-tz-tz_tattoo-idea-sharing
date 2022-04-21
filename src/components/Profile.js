/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {initializeApp} from "firebase/app";
import {getAuth, signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  doc,
  setDoc,
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
  Overlay,
  SaveButton,
  CreateCollectionWrapper,
  NameNewCollectionTitle,
  NameNewCollection,
  LeaveButton,
} from "../styles/Profile.module";

import Login from "./Login";
import {AllPinsWrapper, PinWrapper, PinImage} from "../styles/Homepage.module";

function Profile(props) {
  // myPin/ myCollection/ mySchedule(artist only)
  const MY_PIN = "myPin";
  const MY_COLLECTION = "myCollection";
  const MY_SCHEDULE = "mySchedule";

  const [showSection, setShowSection] = useState("");
  const [pins, setPins] = useState([]);
  const [userData, setUserData] = useState(null);
  const [collections, setCollections] = useState();
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState();

  // Initialize Firebase  
  const app = initializeApp(props.firebaseConfig);  
  const auth = getAuth();
  const db = getFirestore(app);

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
  // eslint-disable-next-line no-unused-vars
  const showMySchedule = () => {
    setShowSection(MY_SCHEDULE);
  };

  function logOut() {
    signOut(auth)
      .then(() => {
        props.setIsLogin(false);

        // for the planned functions now, the localStorage would be better be clear out when user logout (including user data and pin image url), so that the next user wouldn't be affect at all.
        localStorage.clear();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const redirect = useNavigate();

  const renderUserSection = () => {
    // let params = useParams();
    if (showSection === MY_PIN) {
      return (
        <AllPinsWrapper>
          {pins.length > 0 &&
            pins.map((pin, index) => (
              <PinWrapper key={index}>
                <PinImage src={pin.pinImage} />
              </PinWrapper>
            ))}
          <NavLink to='/create-pin'>
            <CreateButton>
              +<br></br>pin
            </CreateButton>
          </NavLink>
        </AllPinsWrapper>
      );
    } else if (showSection === MY_COLLECTION) {
      return (
        <AllCollectionsWrapper>
          {collections &&
            collections.map((collection) => (
              <CollectionWarpper
                key={collection.collectionName}
                onClick={() => {
                  // eslint-disable-next-line no-unused-vars
                  redirect(`/collection/${collection.collectionName}`);
                }}>
                <CollectionImage></CollectionImage>
                <CollectionName>{collection.collectionName}</CollectionName>
              </CollectionWarpper>
            ))}

          <CreateButton
            // onClick={setShowCreateCollection(true)}>
            onClick={() => {
              setShowCreateCollection(true);
            }}>
            create<br></br>collec
          </CreateButton>
        </AllCollectionsWrapper>
      );
    } else if (showSection === MY_SCHEDULE) {
      return <div>welcome to my schedule</div>;
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
    setCollections(myCollections);

    return;
  };

  useEffect(() => {
    userData && getPins(userData.id);
    userData && getCollections(userData.id);
  }, [userData]);

  const getUserData = (userId) => {
    // eslint-disable-next-line no-unused-vars
    const unsub = onSnapshot(doc(db, "user/" + userId), (doc) => {
      if (!props.uid) {
        return;
      }
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
    });
  };

  async function getUserInfoAndPins() {
    getUserData(props.uid);
    (await userData) && getPins(userData.id);
  }

  useEffect(() => {
    getUserInfoAndPins();
  }, [userData]);

  const setCollection2Firestore = (uid) => {
    const newCollectionRef = doc(
      db,
      "user",
      uid,
      "collection",
      newCollectionName
    );
    setDoc(
      newCollectionRef,
      {
        collectionName: newCollectionName,
        pins: [],
      },
      {merge: true}
    );
    alert(`pin added to new collection ${newCollectionName}!`);
  };

  const createNewCollection = () => {
    console.log("do u want to create a new collection?");
    newCollectionName.length > 0
      ? setCollection2Firestore(props.uid)
      : alert("please enter a name for the new collection");
  };

  const showCreateCollectionSection = () => {
    return (
      <>
        {showCreateCollection && (
          <>
            <Overlay></Overlay>
            <CreateCollectionWrapper>
              <LeaveButton onClick={() => setShowCreateCollection(false)}>
                x
              </LeaveButton>
              <NameNewCollectionTitle>new collection</NameNewCollectionTitle>
              <NameNewCollection
                value={newCollectionName}
                onChange={(e) =>
                  setNewCollectionName(e.target.value)
                }></NameNewCollection>
              <SaveButton onClick={createNewCollection}>create</SaveButton>
            </CreateCollectionWrapper>
          </>
        )}
      </>
    );
  };

  return (
    <>
      {props.isLogin ? (
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
              {showCreateCollectionSection()}
            </UserStuffWrapper>
          </PorfileWrapper>
        )
      ) : (
        <Login
          userData={userData}
          setUserData={setUserData}
          firebaseConfig={props.firebaseConfig}></Login>
      )}
    </>
  );
}

export default Profile;
