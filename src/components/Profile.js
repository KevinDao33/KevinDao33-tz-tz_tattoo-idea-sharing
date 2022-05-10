/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import Masonry from "react-masonry-css";
import {collection, getDocs, getDoc, doc, setDoc} from "firebase/firestore";

import {
  ProfileBackgroundDisplay,
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
  CreateButtonWrapper,
  CreateButton,
  CreateButtonSpan,
  Overlay,
  SaveButton,
  CreateCollectionWrapper,
  NameNewCollectionTitle,
  NameNewCollection,
  LeaveButton,
  UserInfoWrapper,
  FollowInfoWrapper,
  FollowTitle,
  FollowUserWrapper,
  FollowUser,
  FollowUserImage,
  FollowUserName,
  CloseButton,
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
  const [isShowFollower, setIsShowFollower] = useState(false);
  const [isShowFollowing, setIsShowFollowing] = useState(false);

  const [followingUserData, setFollowingUserData] = useState([]);
  const [followerUserData, setFollowerUserData] = useState([]);

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
          {/* <NavLink to='/create-pin'>
            <CreateButton>
              <CreateButtonSpan> New Pin</CreateButtonSpan>
            </CreateButton>
          </NavLink> */}
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
                <CollectionImage
                  $pinImg={
                    collection.pins.length > 0
                      ? collection.pins[0].pinImage
                      : null
                  }></CollectionImage>
                <CollectionName>{`${collection.collectionName}`}</CollectionName>
              </CollectionWarpper>
            ))}

          {/* <CreateButton
            onClick={() => {
              setShowCreateCollection(true);
            }}>
            <CreateButtonSpan>+ New Collection</CreateButtonSpan>
          </CreateButton> */}
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

  const setCollection2Firestore = async (uid) => {
    const newCollectionRef = doc(
      props.db,
      "user",
      uid,
      "collection",
      newCollectionName
    );
    await setDoc(
      newCollectionRef,
      {
        collectionName: newCollectionName,
        pins: [],
      },
      {merge: true}
    );
    alert(`collection ${newCollectionName} created!`);
    window.location.reload();
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
              {/* <CreateButton onClick={createNewCollection}>
                <CreateButtonSpan>create</CreateButtonSpan>
              </CreateButton> */}
            </CreateCollectionWrapper>
          </>
        )}
      </>
    );
  };

  const getFollowingUserData = async () => {
    if (!userData) {
      console.log("No Following");
      return;
    }

    const clonedFollowing = [...userData.following];

    let result = [];
    clonedFollowing.map(async (user) => {
      const docRef = doc(props.db, "user", user);

      const docSnap = await getDoc(docRef);
      result.push(docSnap.data());
    });
    console.log("result", result);
    setFollowingUserData(result);
  };

  const getFollowerUserData = async () => {
    if (!userData) {
      return;
    }

    const clonedFollower = [...userData.follower];

    let result = [];
    clonedFollower.map(async (user) => {
      const docRef = doc(props.db, "user", user);
      const docSnap = await getDoc(docRef);
      result.push(docSnap.data());
    });
    setFollowerUserData(result);
  };

  useEffect(() => {
    getFollowingUserData();
    getFollowerUserData();
  }, [userData]);

  const renderFollow = () => {
    if (!isShowFollowing && !isShowFollower) {
      return;
    } else if (isShowFollowing && followingUserData.length > 0) {
      return followingUserData.map((data) => (
        // to={`/user/${authorData.uid}`}
        <NavLink
          key={data.uid}
          to={`/user/${data.uid}`}
          style={{color: "inherit", textDecoration: "none"}}>
          <FollowUser>
            <FollowUserImage src={data.pic}></FollowUserImage>
            <FollowUserName>{data.name}</FollowUserName>
          </FollowUser>
        </NavLink>
      ));
    } else if (isShowFollower && followerUserData.length > 0) {
      return followerUserData.map((data) => (
        // to={`/user/${authorData.uid}`}
        <NavLink
          key={data.uid}
          to={`/user/${data.uid}`}
          style={{color: "inherit", textDecoration: "none"}}>
          <FollowUser>
            <FollowUserImage src={data.pic}></FollowUserImage>
            <FollowUserName>{data.name}</FollowUserName>
          </FollowUser>
        </NavLink>
      ));
    }
  };

  return (
    <ProfileBackgroundDisplay>
      {props.isLogin ? (
        userData && (
          <>
            {/* {showCreateCollection && (
              <Overlay id={"Overlay"} $showOverlay={showCreateCollection}>
                {" "}
              </Overlay>
            )} */}

            <PorfileWrapper>
              <UserInfoWrapper $showFollow={isShowFollower || isShowFollowing}>
                <UserImage src={userData.pic}></UserImage>
                <UserName>{userData.name}</UserName>
                <ShowFollow onClick={() => setIsShowFollowing((prev) => !prev)}>
                  {userData.following.length} following
                </ShowFollow>
                <ShowFollow onClick={() => setIsShowFollower((prev) => !prev)}>
                  {userData.follower.length} follower
                </ShowFollow>
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
              </UserInfoWrapper>

              {/* ======================= */}
              <FollowInfoWrapper
                $showFollow={isShowFollower || isShowFollowing}>
                <FollowTitle
                  onClick={() =>
                    console.log("userData.following", userData.following)
                  }>
                  {isShowFollower
                    ? "My Follower"
                    : isShowFollowing && "My Following"}
                </FollowTitle>
                <CloseButton
                  onClick={() => {
                    setIsShowFollower(false);
                    setIsShowFollowing(false);
                  }}>
                  x
                </CloseButton>
                <FollowUserWrapper>{renderFollow()}</FollowUserWrapper>
              </FollowInfoWrapper>
              {/* ======================= */}

              <UserStuffWrapper>
                <ButtonWrapper>
                  <SelectSection
                    onClick={showMyPin}
                    $section={showSection === MY_PIN}>
                    my pin
                  </SelectSection>
                  <SelectSection
                    $section={showSection === MY_COLLECTION}
                    onClick={showMyCollection}>
                    my collection
                  </SelectSection>
                  <CreateButtonWrapper>
                    {showSection === MY_PIN ? (
                      <NavLink to='/create-pin'>
                        <CreateButton>
                          <CreateButtonSpan>+ New Pin</CreateButtonSpan>
                        </CreateButton>
                      </NavLink>
                    ) : showSection === MY_COLLECTION ? (
                      <CreateButton
                        onClick={() => {
                          setShowCreateCollection(true);
                        }}>
                        <CreateButtonSpan>+ New Collection</CreateButtonSpan>
                      </CreateButton>
                    ) : (
                      <h2>Something went wrong</h2>
                    )}
                  </CreateButtonWrapper>
                </ButtonWrapper>
                {renderUserSection()}
                {showCreateCollectionSection()}
              </UserStuffWrapper>
            </PorfileWrapper>
          </>
        )
      ) : (
        <Login
          db={props.db}
          userData={userData}
          setUserData={setUserData}
          firebaseConfig={props.firebaseConfig}
          auth={props.auth}></Login>
      )}
    </ProfileBackgroundDisplay>
  );
}

export default Profile;
