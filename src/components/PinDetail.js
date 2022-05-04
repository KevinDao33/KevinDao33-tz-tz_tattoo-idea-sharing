/* eslint-disable react/prop-types */
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
  PinDescription,
  PinAuthorWrapper,
  PinAuthorPhoto,
  PinAuthorName,
  PinCommentTitle,
  AllPinCommentWrapper,
  OtherPinCommentWrapper,
  PinCommentWrapper,
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
} from "../styles/PinDetail.module";
// import {BackgroundDisplay} from "../styles/Homepage.module"

function PinDetail(props) {
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
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
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
    const authorSnapshot = await getDoc(doc(props.db, "user", authorId));
    setAuthorData(authorSnapshot.data());

    return;
  };

  useEffect(() => {
    pinData && getAuthorData(pinData.pinAutor.uid);
  }, [pinData]);

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

  useEffect(() => {
    getUserData(props.uid);
  }, [props.uid]);

  const getUserCollection = async (userId) => {
    if (!userId) {
      return;
    }
    const collectionSnapshot = await getDocs(
      collection(props.db, "user", userId, "collection")
    );

    let myCollections = [];
    collectionSnapshot.forEach((doc) => {
      myCollections.push({...doc.data()});
    });
    setUserCollection(myCollections);

    return;
  };

  useEffect(() => {
    getUserCollection(props.uid);
  }, [props.uid]);

  const getPin = async () => {
    if (!pinId) {
      return;
    }
    const pinSnapshot = await getDoc(doc(props.db, "pin", pinId));
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
      alert("Please select a collection~");

      return;
    }
    const collectionRef = doc(
      props.db,
      "user",
      props.uid,
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
    alert(`pin added to ${selectedCollection}`);
  };

  const getRelatedPins = async () => {
    if (!pinData) {
      return;
    }

    const pinsRef = collection(props.db, "pin");
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
      alert("type a comment before sending");
      return;
    }
    await addDoc(collection(props.db, "pin", pinId, "comment"), {
      commentator: props.uid,
      commentTime: serverTimestamp(),
      commentMessage: newComment,
    });
    document.getElementById("commentInputField").value = "";
    setNewComment("");
  };

  const getPinCommentData = async () => {
    const allCommentsDataRef = query(
      collection(props.db, "pin", pinId, "comment"),
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
      console.log("no comment");

      return;
    }

    let commentatorData = [];
    for (let i = 0; i < pinCommentData.length; i++) {
      let test = await getDoc(
        doc(props.db, "user", pinCommentData[i].commentator)
      );
      // console.log('test', test.data());
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
              </PinDetailSubNav>
              {/* <PinName>{pinData.pinName}</PinName> */}
              <PinDescription>{pinData.pinDesc}</PinDescription>
              <PinAuthorWrapper to={`/user/${authorData.uid}`}>
                <PinAuthorPhoto src={authorData.pic}></PinAuthorPhoto>
                <PinAuthorName>{authorData.name}</PinAuthorName>
              </PinAuthorWrapper>
              <PinCommentTitle>comment</PinCommentTitle>
              <AllPinCommentWrapper>
                <OtherPinCommentWrapper>
                  {pinCommentData &&
                    pinCommentator.length > 0 &&
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
                    ))}
                </OtherPinCommentWrapper>
              </AllPinCommentWrapper>
              <MyPinCommentWrapper>
                {userData && <MyPhoto src={userData.pic}></MyPhoto>}
                <PinCommentInput
                  id='commentInputField'
                  vaule={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}></PinCommentInput>
                <SubmitButton onClick={sendNewComment}>Send</SubmitButton>
              </MyPinCommentWrapper>
            </PinDetailDataWrapper>
          </PinDetailWrapper>
          <RelatedPinsTitle>Similiar Pins</RelatedPinsTitle>
          <ViewMoreIconWrapper
            onClick={handleIsShowSimilar}></ViewMoreIconWrapper>
          <SimiliarPinsWrapper $similar={isShowSimilarPin}>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className='my-masonry-grid'
              columnClassName='my-masonry-grid_column'>
              {similiarPins &&
                similiarPins.map((similiarPin) => (
                  <SimiliarPin
                    key={similiarPin.pinId}
                    src={similiarPin.pinImage}
                    onClick={() => {
                      redirect(`/pin-detail/${similiarPin.pinId}`);
                      window.location.reload();
                    }}></SimiliarPin>
                ))}
            </Masonry>
          </SimiliarPinsWrapper>
        </DarkBackgroundDisplay>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default PinDetail;
