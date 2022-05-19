import React, {useEffect, useState} from "react";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  updateDoc,
  arrayUnion,
  orderBy,
} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import Masonry from "react-masonry-css";
import {v4 as uuid} from "uuid";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

import "../styles/style.css";
import {
  DarkBackgroundDisplay,
  PinDetailWrapper,
  PinImageWrapper,
  PinImage,
  PinDetailDataWrapper,
  PinDetailSubNav,
  CollectionSelector,
  CollectionName,
  SaveButton,
  PinName,
  PinDescriptionWrapper,
  PinDescription,
  PinAuthorWrapper,
  PinAuthorPhoto,
  PinAuthorName,
  PinCommentTitle,
  AllPinCommentWrapper,
  OtherPinCommentWrapper,
  PinCommentWrapper,
  NoCommentMessage,
  MyPinCommentWrapper,
  UserPhoto,
  MyPhoto,
  PinCommentInput,
  UserName,
  PinComment,
  RelatedPinsTitle,
  SubmitButton,
  SimiliarPinsWrapper,
  SimiliarPin,
  ViewMoreIconWrapper,
  Link2CommentatorProfile,
  LoginReminder,
} from "../styles/PinDetail.module";
import Loader from "./Loader";

function PinDetail({db, uid}) {
  const [pinId, setPinid] = useState("");
  const [pinData, setPinData] = useState("");
  const [authorData, setAuthorData] = useState("");
  const [userData, setUserData] = useState(null);
  const [userCollection, setUserCollection] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [similiarPins, setSimiliarPins] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [pinCommentData, setPinCommentData] = useState([]);
  const [pinCommentator, setPinCommentator] = useState([]);
  const [isShowSimilarPin, setIsShowSimilarPin] = useState(false);

  const redirect = useNavigate();
  const breakpointColumnsObj = {
    default: 7,
    2678: 6,
    2267: 5,
    1879: 4,
    1495: 3,
    1107: 2,
    400: 1,
  };

  const getPinId = () => {
    const url = window.location.href;
    const lastSegment = url.split("/").pop();
    setPinid(lastSegment);
  };

  useEffect(() => {
    getPinId();
  }, []);

  const getAuthorData = async (authorId) => {
    if (!authorId) {
      return;
    }
    const authorSnapshot = await getDoc(doc(db, "user", authorId));
    setAuthorData(authorSnapshot.data());

    return;
  };

  useEffect(() => {
    pinData && getAuthorData(pinData.pinAutor.uid);
  }, [pinData]);

  const getUserData = async (userId) => {
    if (!uid) {
      return;
    }
    const docRef = doc(db, `user/${userId}`);
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

  useEffect(() => {
    getUserData(uid);
  }, [uid]);

  const getUserCollection = async (userId) => {
    if (!userId) {
      return;
    }
    const collectionSnapshot = await getDocs(
      collection(db, "user", userId, "collection")
    );

    let myCollections = [];
    collectionSnapshot.forEach((doc) => {
      myCollections.push({...doc.data()});
    });
    setUserCollection(myCollections);

    return;
  };

  useEffect(() => {
    getUserCollection(uid);
  }, [uid]);

  const getPin = async () => {
    if (!pinId) {
      return;
    }
    const pinSnapshot = await getDoc(doc(db, "pin", pinId));
    setPinData(pinSnapshot.data());

    return;
  };

  useEffect(() => {
    getPin();
  }, [pinId]);

  const handleCollectionSelector = (e) => {
    setSelectedCollection(e.target.value);
  };

  const addPinToCollection = () => {
    if (selectedCollection === "Choose") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a collection~",
      });

      return;
    }
    const collectionRef = doc(
      db,
      "user",
      uid,
      "collection",
      selectedCollection
    );
    updateDoc(
      collectionRef,
      {
        pins: arrayUnion({
          pinName: pinData.pinName,
          pinId: pinData.pinId,
          pinImage: pinData.pinImage,
        }),
      },
      {merge: true}
    );
    Swal.fire(
      `Pin added to ${selectedCollection}`,
      "Good choice ~~",
      "success"
    );
  };

  const getRelatedPins = async () => {
    if (!pinData) {
      return;
    }

    const pinsRef = collection(db, "pin");
    const q = query(
      pinsRef,
      where("pinTags", "array-contains-any", pinData.pinTags)
    );

    const querySnapshot = await getDocs(q);
    let localSimiliarPins = [];
    querySnapshot.forEach((doc) => {
      pinData.pinName !== doc.data().pinName &&
        localSimiliarPins.push(doc.data());
    });
    setSimiliarPins(localSimiliarPins);
  };

  useEffect(() => {
    getRelatedPins();
  }, [pinData]);

  const sendNewComment = async () => {
    if (!newComment) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please type a comment before sending",
      });
      return;
    }
    await addDoc(collection(db, "pin", pinId, "comment"), {
      commentator: uid,
      commentTime: serverTimestamp(),
      commentMessage: newComment,
    });
    document.getElementById("commentInputField").value = "";
    setNewComment("");
  };

  const getPinCommentData = async () => {
    const allCommentsDataRef = query(
      collection(db, "pin", pinId, "comment"),
      orderBy("commentTime")
    );
    // eslint-disable-next-line no-unused-vars
    const allCommentsData = onSnapshot(allCommentsDataRef, (querySnapshot) => {
      let allComments = [];
      querySnapshot.forEach((doc) => {
        allComments.push(doc.data());
      });
      setPinCommentData(allComments);
    });
  };

  useEffect(() => {
    pinId && getPinCommentData();
  }, [pinId]);

  const getPinCommentator = async () => {
    if (pinCommentData.length < 0) {
      return;
    }

    let commentatorData = [];
    for (let i = 0; i < pinCommentData.length; i++) {
      let test = await getDoc(doc(db, "user", pinCommentData[i].commentator));
      commentatorData.push(test.data());
    }
    setPinCommentator(commentatorData);
  };

  useEffect(() => {
    pinCommentData.length > 0 && getPinCommentator();
  }, [pinCommentData]);

  const handleIsShowSimilar = () => {
    setIsShowSimilarPin((prev) => !prev);
  };

  return (
    <>
      {pinData && authorData ? (
        <DarkBackgroundDisplay>
          <PinDetailWrapper>
            <PinImageWrapper>
              <PinImage src={pinData.pinImage}></PinImage>
            </PinImageWrapper>

            <PinDetailDataWrapper>
              <PinName>{pinData.pinName}</PinName>
              <PinDetailSubNav>
                {uid ? (
                  <>
                    <CollectionSelector
                      value={selectedCollection}
                      onChange={handleCollectionSelector}>
                      <CollectionName>Choose</CollectionName>
                      {userCollection.map((collection, index) => (
                        <CollectionName
                          key={index}
                          value={collection.collectionName}>
                          {collection.collectionName}
                        </CollectionName>
                      ))}
                    </CollectionSelector>
                    <SaveButton onClick={addPinToCollection}>save</SaveButton>
                  </>
                ) : (
                  <></>
                )}
              </PinDetailSubNav>

              <PinDescriptionWrapper>
                <PinDescription>{pinData.pinDesc}</PinDescription>
              </PinDescriptionWrapper>
              <PinAuthorWrapper to={`/user/${authorData.uid}`}>
                <PinAuthorName>- {authorData.name}</PinAuthorName>
                <PinAuthorPhoto src={authorData.pic}></PinAuthorPhoto>
              </PinAuthorWrapper>

              <PinCommentTitle>
                {pinCommentator.length > 0
                  ? `comment (${pinCommentator.length})`
                  : `comment`}
              </PinCommentTitle>
              <AllPinCommentWrapper>
                <OtherPinCommentWrapper>
                  {pinCommentData && pinCommentator.length > 0 ? (
                    pinCommentData.map((data, index) => (
                      <PinCommentWrapper key={uuid()}>
                        {pinCommentator[index] && (
                          <Link2CommentatorProfile
                            to={`/user/${pinCommentator[index].uid}`}>
                            <UserPhoto
                              src={pinCommentator[index].pic}></UserPhoto>
                            <UserName>{pinCommentator[index].name}</UserName>
                          </Link2CommentatorProfile>
                        )}
                        <PinComment>{data.commentMessage}</PinComment>
                      </PinCommentWrapper>
                    ))
                  ) : (
                    <NoCommentMessage>
                      Be the first to leave a comment!
                    </NoCommentMessage>
                  )}
                </OtherPinCommentWrapper>
              </AllPinCommentWrapper>

              {uid && userData ? (
                <MyPinCommentWrapper>
                  <MyPhoto src={userData.pic}></MyPhoto>
                  <PinCommentInput
                    id='commentInputField'
                    vaule={newComment}
                    onChange={(e) => {
                      setNewComment(e.target.value);
                    }}></PinCommentInput>
                  <SubmitButton onClick={sendNewComment}>Send</SubmitButton>
                </MyPinCommentWrapper>
              ) : (
                <MyPinCommentWrapper>
                  <LoginReminder onClick={() => redirect("/profile")}>
                    Login to leave a comment :)
                  </LoginReminder>
                </MyPinCommentWrapper>
              )}
            </PinDetailDataWrapper>
          </PinDetailWrapper>
          <RelatedPinsTitle>Similiar Pins</RelatedPinsTitle>
          <ViewMoreIconWrapper
            onClick={handleIsShowSimilar}
            $similar={isShowSimilarPin}></ViewMoreIconWrapper>
          <SimiliarPinsWrapper $similar={isShowSimilarPin}>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className='my-masonry-grid'
              columnClassName='my-masonry-grid_column'>
              {similiarPins.length > 0 ? (
                similiarPins.map((similiarPin) => (
                  <SimiliarPin
                    key={similiarPin.pinId}
                    src={similiarPin.pinImage}
                    onClick={() => {
                      redirect(`/pin-detail/${similiarPin.pinId}`);
                      window.location.reload();
                    }}></SimiliarPin>
                ))
              ) : (
                <RelatedPinsTitle>
                  sorry, no related pins found :(
                </RelatedPinsTitle>
              )}
            </Masonry>
          </SimiliarPinsWrapper>
        </DarkBackgroundDisplay>
      ) : (
        <Loader />
      )}
    </>
  );
}

PinDetail.propTypes = {
  db: PropTypes.object,
  uid: PropTypes.string,
};

export default PinDetail;
