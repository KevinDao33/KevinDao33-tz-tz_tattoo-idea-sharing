import React, {useEffect, useState} from "react";
import {initializeApp} from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

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
} from "../styles/PinDetail.module";

function PinDetail(props) {
  const [pinId, setPinid] = useState("");
  const [pinData, setPinData] = useState("");
  const [authorData, setAuthorData] = useState("");
  const [userCollection, setUserCollection] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");

  const app = initializeApp(props.firebaseConfig);
  const db = getFirestore(app);

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
    getUserCollection(props.uid);
  }, [props.uid]);

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
    console.log(e.target.value);
    setSelectedCollection(e.target.value);
  };

  const addPinToCollection = () => {
    if (selectedCollection === "Choose") {
      alert("Please select a collection~");

      return;
    }
    const collectionRef = doc(
      db,
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

  const getRelatedPins = async() => {
    const pinsRef = collection(db, "pin");

    // Create a query against the collection.
    const q = query(pinsRef, where("pinTags", "array-contains-any", ["Vintage", "Dotwork"]));
    
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  useEffect(() => {
    getRelatedPins();
  }, []);

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
                        "https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/pinImages%2Fraccoon?alt=media&token=bb29b6c0-83ad-40ea-85b8-f7330c5ea153"
                      }></UserPhoto>
                    <UserName>chieh</UserName>
                    <PinComment>Good Work!</PinComment>
                  </PinCommentWrapper>
                </OtherPinCommentWrapper>
              </AllPinCommentWrapper>
              <MyPinCommentWrapper>
                <MyPhoto
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/tz-tz-fa8a7.appspot.com/o/pinImages%2Ftztz?alt=media&token=5dbd2f43-2ef4-4699-832b-ec976f9d1e13"
                  }></MyPhoto>
                <PinCommentInput></PinCommentInput>
                <SubmitButton>Send</SubmitButton>
              </MyPinCommentWrapper>
            </PinDetailDataWrapper>
          </PinDetailWrapper>
          <RelatedPinsTitle>Similiar Pins</RelatedPinsTitle>
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default PinDetail;
