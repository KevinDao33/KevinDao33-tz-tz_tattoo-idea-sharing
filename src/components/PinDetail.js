import {useEffect, useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import Masonry from "react-masonry-css";
import {v4 as uuid} from "uuid";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import api from "../util/api";

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
import {UserContext} from "./App";

function PinDetail({uid}) {
  const [pinId, setPinid] = useState("");
  const [pinData, setPinData] = useState("");
  const [authorData, setAuthorData] = useState("");
  const [userCollection, setUserCollection] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [similiarPins, setSimiliarPins] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [pinCommentData, setPinCommentData] = useState([]);
  const [pinCommentator, setPinCommentator] = useState([]);
  const [isShowSimilarPin, setIsShowSimilarPin] = useState(false);

  const userData = useContext(UserContext);

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

  useEffect(() => {
    pinData && api.getUserData(pinData.pinAutor.uid, setAuthorData);
  }, [pinData]);

  useEffect(() => {
    api.getUserCollection(uid, setUserCollection);
  }, [uid]);

  useEffect(() => {
    api.gitPinData(pinId, setPinData);
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

    api.addPin2Collection(uid, selectedCollection, pinData);

    Swal.fire(
      `Pin added to ${selectedCollection}`,
      "Good choice ~~",
      "success"
    );
  };

  useEffect(() => {
    api.getRelatedPins(pinData, setSimiliarPins);
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

    await api.sendNewCommentMessage(uid, pinId, newComment);

    document.getElementById("commentInputField").value = "";
    setNewComment("");
  };

  useEffect(() => {
    pinId && api.getPinCommentData(pinId, setPinCommentData);
  }, [pinId]);

  useEffect(() => {
    pinCommentData.length > 0 &&
      api.getPinCommentator(pinCommentData, setPinCommentator);
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
  uid: PropTypes.string,
};

export default PinDetail;
