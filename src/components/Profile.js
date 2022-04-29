/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import Masonry from "react-masonry-css";
import {
  collection,
  getDocs,
  // onSnapshot,
  getDoc,
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
  const [collections, setCollections] = useState([]);
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  const auth = getAuth(props.app);

  useEffect(() => {
    setShowSection(MY_COLLECTION);
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
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className='my-masonry-grid'
            columnClassName='my-masonry-grid_column'>
            {pins.length > 0 &&
              pins.map((pin, index) => (
                <PinWrapper key={index}>
                  <PinImage src={pin.pinImage} />
                </PinWrapper>
              ))}
          </Masonry>
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
          {collections.length > 0 &&
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
    const querySnapshot = await getDocs(
      collection(props.db, `user/${id}`, "pin")
    );
    let myPins = [];
    querySnapshot.forEach((doc) => {
      myPins.push({...doc.data()});
    });
    setPins(myPins);
  };

  const getCollections = async (id) => {
    const querySnapshot = await getDocs(
      collection(props.db, `user/${id}`, "collection")
    );

    let myCollections = [];
    querySnapshot.forEach((doc) => {
      myCollections.push({...doc.data()});
    });
    setCollections(myCollections);

    return;
  };

  const getUserData = async (userId) => {
    if (!props.uid) {
      return;
    }
    const docRef = doc(props.db, `user/${userId}`);
    const docSnap = await getDoc(docRef);
    setUserData({
      name: docSnap.data().name,
      email: docSnap.data().email,
      role: docSnap.data().role,
      following: docSnap.data().following,
      follower: docSnap.data().follower,
      pic: docSnap.data().pic,
      id: docSnap.data().uid,
      link: docSnap.data().link,
      desc: docSnap.data().desc,
    });
  };

  async function getUserInfoAndPinsAndCollection() {
    getUserData(props.uid);
    await getPins(props.uid);
    await getCollections(props.uid);
  }

  useEffect(() => {
    getUserInfoAndPinsAndCollection();
  }, [props.uid]);

  // =================================================================

  const setCollection2Firestore = (uid) => {
    const newCollectionRef = doc(
      props.db,
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
    alert(`collection ${newCollectionName} created!`);
  };

  const createNewCollection = () => {
    newCollectionName
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
            <UserImage src={userData.pic}></UserImage>
            <UserName>{userData.name}</UserName>
            <ShowFollow>{userData.follower.length} following</ShowFollow>
            <ShowFollow>{userData.following.length} follower</ShowFollow>
            <ButtonWrapper>
              <Button>share</Button>
              <Button
                onClick={() => {
                  redirect("/edit-profile");
                }}>
                edit
              </Button>
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
