/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import Masonry from "react-masonry-css";
import {collection, getDocs, getDoc, doc, setDoc} from "firebase/firestore";
import Swal from "sweetalert2";

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
  MainAllCollectionWrapper,
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
  MyPlanWrapper,
  FullTattooPlanCardWrapper,
  TattooPlanCardWrapper,
  TattooPlanCardImg,
  TattooPlanCardDetailDataMainWrapper,
  TattooPlanCardDetailDataTitle,
  TattooPlanCardDetailData,
  TattooPlanCardArtistMainWrapper,
  TattooPlanCardArtistWrapper,
  TattooPlanCardArtistPic,
  TattooPlanCardArtistInfoWrapper,
  TattooPlanCardArtistName,
  TattooPlanCardArtistMail,
  TattooPlanCardDetailDataDescription,
  ArtistLink,
} from "../styles/Profile.module";
import Login from "./Login";
import {AllPinsWrapper, PinWrapper, PinImage} from "../styles/Homepage.module";
// import {placementsOptions} from "../const";

function Profile(props) {
  // myPin/ myCollection/ myPlan(artist only)
  const MY_PIN = "myPin";
  const MY_COLLECTION = "myCollection";
  const MY_PLAN = "myPlan";

  const [showSection, setShowSection] = useState("");
  const [pins, setPins] = useState([]);
  const [plans, setPlans] = useState([]);
  const [userData, setUserData] = useState(null);
  const [collections, setCollections] = useState([]);
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isShowFollower, setIsShowFollower] = useState(false);
  const [isShowFollowing, setIsShowFollowing] = useState(false);

  const [followingUserData, setFollowingUserData] = useState([]);
  const [followerUserData, setFollowerUserData] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);

  const breakpointColumnsObj = {
    default: 7,
    2580: 6,
    2205: 5,
    1825: 4,
    1455: 3,
    1077: 2,
    715: 1,
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
  const showMyPlan = () => {
    setShowSection(MY_PLAN);
  };

  function logOut() {
    signOut(auth)
      .then(() => {
        props.setIsLogin(false);

        // for the planned functions now, the localStorage would be better be clear out when user logout (including user data and pin image url), so that the next user wouldn't be affected at all.
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
        <MainAllCollectionWrapper>
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
          </AllCollectionsWrapper>
        </MainAllCollectionWrapper>
      );
      // ============================================================
    } else if (showSection === MY_PLAN) {
      return (
        <>
          {plans.length > 0 &&
            plans.map((plan, index) => (
              <MyPlanWrapper key={plan.planId}>
                <FullTattooPlanCardWrapper>
                  <TattooPlanCardWrapper>
                    <TattooPlanCardImg
                      src={plan.reference.pinImage}></TattooPlanCardImg>
                  </TattooPlanCardWrapper>

                  <TattooPlanCardDetailDataMainWrapper>
                    <TattooPlanCardDetailDataTitle>
                      Plan Details
                    </TattooPlanCardDetailDataTitle>
                    <TattooPlanCardDetailData>{`・${plan.city}`}</TattooPlanCardDetailData>
                    <TattooPlanCardDetailData>{`・${plan.budget}`}</TattooPlanCardDetailData>
                    <TattooPlanCardDetailData>{`・${plan.size}`}</TattooPlanCardDetailData>
                    <TattooPlanCardDetailData>{`・${plan.placement}`}</TattooPlanCardDetailData>

                    <TattooPlanCardDetailData>
                      {plan.date.length === 2
                        ? `・${new Date(
                            plan.date[0] * 1000
                          ).getMonth()}/${new Date(
                            plan.date[0] * 1000
                          ).getDate()} - ${new Date(
                            plan.date[1] * 1000
                          ).getMonth()}/${new Date(
                            plan.date[1] * 1000
                          ).getDate()}`
                        : new Date(plan.date[0]) === new Date(-2209017600000)
                        ? "Anytime"
                        : `・${new Date(
                            plan.date[0] * 1000
                          ).getMonth()}/${new Date(
                            plan.date[0] * 1000
                          ).getDate()}`}
                    </TattooPlanCardDetailData>

                    <TattooPlanCardDetailDataDescription>{`${plan.description}`}</TattooPlanCardDetailDataDescription>
                  </TattooPlanCardDetailDataMainWrapper>
                  <TattooPlanCardArtistMainWrapper>
                    <TattooPlanCardDetailDataTitle>
                      Artists
                    </TattooPlanCardDetailDataTitle>

                    {artistData[index] && artistData[index].length > 0 ? (
                      artistData[index].map((artist) => (
                        <TattooPlanCardArtistWrapper key={artist.uid}>
                          <TattooPlanCardArtistPic src={artist.pic} />
                          <TattooPlanCardArtistInfoWrapper>
                            <TattooPlanCardArtistName>
                              {artist.name}
                            </TattooPlanCardArtistName>
                            <TattooPlanCardArtistMail>
                              {artist.email}
                            </TattooPlanCardArtistMail>
                            <ArtistLink href={artist.link}>
                              <TattooPlanCardArtistMail>
                                {/* {artist.link} */}
                                Click to view my work
                              </TattooPlanCardArtistMail>
                            </ArtistLink>
                          </TattooPlanCardArtistInfoWrapper>
                        </TattooPlanCardArtistWrapper>
                      ))
                    ) : (
                      <div>No artists sign up yet</div>
                    )}

                    {/* <TattooPlanCardArtistWrapper>
                      <TattooPlanCardArtistPic />
                      <TattooPlanCardArtistInfoWrapper>
                        <TattooPlanCardArtistName>
                          Kevin
                        </TattooPlanCardArtistName>
                        <TattooPlanCardArtistMail>
                          test06@gmail.com
                        </TattooPlanCardArtistMail>
                        <TattooPlanCardArtistMail>
                          http://hihihi.com
                        </TattooPlanCardArtistMail>
                      </TattooPlanCardArtistInfoWrapper>
                    </TattooPlanCardArtistWrapper> */}
                  </TattooPlanCardArtistMainWrapper>
                </FullTattooPlanCardWrapper>
              </MyPlanWrapper>
            ))}
        </>
      );
    }
  };

  const getPins = async () => {
    const querySnapshot = await getDocs(
      collection(props.db, "user", props.uid, "pin")
    );
    let myPins = [];
    querySnapshot.forEach((doc) => {
      myPins.push({...doc.data()});
    });
    setPins(myPins);
  };

  const getCollections = async (id) => {
    const querySnapshot = await getDocs(
      collection(props.db, "user", id, "collection")
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
    // const docRef = doc(props.db, `user/${userId}`);
    const docRef = doc(props.db, "user", userId);
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

  const getPlans = async () => {
    if (!props.uid) {
      return;
    }

    const querySnapshot = await getDocs(
      collection(props.db, "user", props.uid, "plan")
    );
    let myPlans = [];
    querySnapshot.forEach((doc) => {
      myPlans.push({...doc.data()});
    });
    setPlans(myPlans);
  };

  async function getUserInfoAndPinsAndCollection() {
    getUserData(props.uid);
    getPlans();
    await getPins();
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
    // alert(`collection ${newCollectionName} created!`);
    await Swal.fire(
      `Collection ${newCollectionName} created!`,
      "What a great collection!",
      "success"
    );
    window.location.reload();
  };

  const createNewCollection = () => {
    newCollectionName
      ? setCollection2Firestore(props.uid)
      : // : alert("please enter a name for the new collection");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a name for the new collection :(",
          // footer: '<a href="">Why do I have this issue?</a>'
        });
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
      return;
    }

    const clonedFollowing = [...userData.following];

    let result = [];
    clonedFollowing.map(async (user) => {
      const docRef = doc(props.db, "user", user);

      const docSnap = await getDoc(docRef);
      result.push(docSnap.data());
    });
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

  const getArtistData = async () => {
    if (!plans.length > 0) {
      return;
    }

    let allArtist = [];

    plans.map((plan) => {
      const clonedArtist = [...plan.artists];

      let result = [];
      clonedArtist.map(async (artist) => {
        const docRef = doc(props.db, "user", artist);
        const docSnap = await getDoc(docRef);
        result.push(docSnap.data());
      });
      allArtist.push(result);
    });

    setArtistData(allArtist);
  };

  useEffect(() => {
    plans.length > 0 && getArtistData();
  }, [plans]);

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
          <FollowUser id={"mela"}>
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

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

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
                <FollowTitle>
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
                  <SelectSection
                    $section={showSection === MY_PLAN}
                    onClick={showMyPlan}>
                    my plan
                  </SelectSection>
                  <CreateButtonWrapper>
                    {showSection === MY_PIN ? (
                      <NavLink to='/create-pin'>
                        <CreateButton>
                          <CreateButtonSpan>
                            {" "}
                            {windowWidth > 1141 ? " + New Pin" : "+"}
                          </CreateButtonSpan>
                        </CreateButton>
                      </NavLink>
                    ) : showSection === MY_COLLECTION ? (
                      <CreateButton
                        onClick={() => {
                          setShowCreateCollection(true);
                        }}>
                        <CreateButtonSpan>
                          {windowWidth > 1141 ? " + New Collection" : "+"}
                        </CreateButtonSpan>
                      </CreateButton>
                    ) : showSection === MY_PLAN ? (
                      <CreateButton
                        onClick={() => {
                          // setShowCreateCollection(true);
                          redirect("/start-tattoo-plan");
                        }}>
                        <CreateButtonSpan>
                          {windowWidth > 1141 ? " + New Plan" : "+"}
                        </CreateButtonSpan>
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
