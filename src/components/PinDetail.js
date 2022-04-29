/* eslint-disable react/prop-types */
import React, {useEffect, useState} from "react";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  // setDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import Masonry from "react-masonry-css";

import "../styles/style.css";
import {
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
} from "../styles/PinDetail.module";

function PinDetail(props) {
  const [pinId, setPinid] = useState("");
  const [pinData, setPinData] = useState("");
  const [authorData, setAuthorData] = useState("");
  const [userCollection, setUserCollection] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [similiarPins, setSimiliarPins] = useState([]);

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
    console.log(e.target.value);
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
      localSimiliarPins.push(doc.data());
    });
    console.log(localSimiliarPins);
    setSimiliarPins(localSimiliarPins);
  };

  useEffect(() => {
    getRelatedPins();
  }, [pinData]);

  return (
    <>
      {pinData && authorData ? (
        <>
          <PinDetailWrapper>
            <PinImageWrapper>
              <PinImage src={pinData.pinImage}></PinImage>
            </PinImageWrapper>

            <PinDetailDataWrapper>
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
              <PinName>{pinData.pinName}</PinName>
              <PinDescription>{pinData.pinDesc}</PinDescription>
              <PinAuthorWrapper>
                <PinAuthorPhoto src={authorData.pic}></PinAuthorPhoto>
                {/* missSpelling : pinAutor, need to be fix later */}
                <PinAuthorName>{authorData.name}</PinAuthorName>
              </PinAuthorWrapper>
              <PinCommentTitle>comment</PinCommentTitle>
              <AllPinCommentWrapper>
                <OtherPinCommentWrapper>
                  <PinCommentWrapper>
                    <UserPhoto
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/pinImages%2Fcat?alt=media&token=b08b7508-c236-4ab5-b785-e93ea0b1feaf"
                      }></UserPhoto>
                    <UserName>kev</UserName>
                    <PinComment>This is soooooo cooooooool~~~</PinComment>
                  </PinCommentWrapper>
                  <PinCommentWrapper>
                    <UserPhoto
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/profileImages%2F%E7%9C%9F%E5%A3%9E%E4%BB%BD%E5%AD%90%E9%98%BF%E7%86%8A.jpg?alt=media&token=d8c84a59-8fcc-429d-8bdc-4707685fd2ec"
                      }></UserPhoto>
                    <UserName>chieh</UserName>
                    <PinComment>Good Work!</PinComment>
                  </PinCommentWrapper>
                </OtherPinCommentWrapper>
              </AllPinCommentWrapper>
              <MyPinCommentWrapper>
                <MyPhoto
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/profileImages%2F%E9%98%BF%E7%86%8A%E7%B2%89.jpg?alt=media&token=522d68aa-ed41-4917-a840-c68861fe8199"
                  }></MyPhoto>
                <PinCommentInput></PinCommentInput>
                <SubmitButton>Send</SubmitButton>
              </MyPinCommentWrapper>
            </PinDetailDataWrapper>
          </PinDetailWrapper>
          <RelatedPinsTitle>Similiar Pins</RelatedPinsTitle>
          <SimiliarPinsWrapper>
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
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default PinDetail;
