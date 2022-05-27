import {useState, useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import Masonry from "react-masonry-css";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import api from "../util/api";

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
import {AllPinsWrapper, PinWrapper, PinImage} from "../styles/Homepage.module";
import Login from "./Login";

function Profile({firebaseConfig, uid, app, setIsLogin, isLogin}) {
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

  const redirect = useNavigate();

  const breakpointColumnsObj = {
    default: 7,
    2580: 6,
    2205: 5,
    1825: 4,
    1455: 3,
    1077: 2,
    715: 1,
  };
  const auth = getAuth(app);

  useEffect(() => {
    setShowSection(MY_COLLECTION);
  }, []);

  const showMyPin = () => {
    setShowSection(MY_PIN);
  };
  const showMyCollection = () => {
    setShowSection(MY_COLLECTION);
  };
  const showMyPlan = () => {
    setShowSection(MY_PLAN);
  };

  function logOut() {
    signOut(auth)
      .then(() => {
        setIsLogin(false);
        localStorage.clear();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const renderUserSection = () => {
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
                                Click to view my work
                              </TattooPlanCardArtistMail>
                            </ArtistLink>
                          </TattooPlanCardArtistInfoWrapper>
                        </TattooPlanCardArtistWrapper>
                      ))
                    ) : (
                      <div>No artists sign up yet</div>
                    )}
                  </TattooPlanCardArtistMainWrapper>
                </FullTattooPlanCardWrapper>
              </MyPlanWrapper>
            ))}
        </>
      );
    }
  };

  const handleUserData = (userDataFromFirebase) => {
    setUserData({
      name: userDataFromFirebase.name,
      email: userDataFromFirebase.email,
      role: userDataFromFirebase.role,
      following: userDataFromFirebase.following,
      follower: userDataFromFirebase.follower,
      pic: userDataFromFirebase.pic,
      id: userDataFromFirebase.uid,
      link: userDataFromFirebase.link,
      desc: userDataFromFirebase.desc,
    });
  };

  async function getUserInfoAndPinsAndCollection() {
    api.getUserData(uid, handleUserData);
    api.getUserPlan(uid, setPlans);
    await api.gitUserPins(uid, setPins);
    await api.getUserCollection(uid, setCollections);
  }

  useEffect(() => {
    getUserInfoAndPinsAndCollection();
  }, [uid]);

  const setCollection2Firestore = async (uid) => {
    api.createNewCollection(uid, newCollectionName);

    await Swal.fire(
      `Collection ${newCollectionName} created!`,
      "What a great collection!",
      "success"
    );
    window.location.reload();
  };

  const createNewCollection = () => {
    newCollectionName
      ? setCollection2Firestore(uid)
      : Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a name for the new collection :(",
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
    api.getMyFollow(clonedFollowing, setFollowingUserData);
  };

  const getFollowerUserData = async () => {
    if (!userData) {
      return;
    }

    const clonedFollower = [...userData.follower];
    api.getMyFollow(clonedFollower, setFollowerUserData);
  };

  useEffect(() => {
    getFollowingUserData();
    getFollowerUserData();
  }, [userData]);

  const getArtistData = async () => {
    if (!plans.length > 0) {
      return;
    }
    api.getArtistData(plans, setArtistData);
  };

  useEffect(() => {
    plans.length > 0 && getArtistData();
  }, [plans]);

  const renderFollow = () => {
    if (!isShowFollowing && !isShowFollower) {
      return;
    } else if (isShowFollowing && followingUserData.length > 0) {
      return followingUserData.map((data) => (
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
      {isLogin ? (
        userData && (
          <>
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
                  <Button
                    onClick={() => {
                      redirect("/edit-profile");
                    }}>
                    edit
                  </Button>
                  <Button onClick={logOut}>logOut</Button>
                </ButtonWrapper>
              </UserInfoWrapper>
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
          userData={userData}
          setUserData={setUserData}
          firebaseConfig={firebaseConfig}
          auth={auth}></Login>
      )}
    </ProfileBackgroundDisplay>
  );
}

Profile.propTypes = {
  firebaseConfig: PropTypes.object,
  auth: PropTypes.object,
  uid: PropTypes.string,
  app: PropTypes.object,
  setIsLogin: PropTypes.func,
  isLogin: PropTypes.bool,
};

export default Profile;
