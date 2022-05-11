/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-undef */
import React, {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import Masonry from "react-masonry-css";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import {
  FollowButton,
  UnFollowButton,
  DarkBackgroundDisplay,
} from "../styles/OtherUserProfile.module";
import {
  PorfileWrapper,
  UserImage,
  UserName,
  ShowFollow,
  ButtonWrapper,
  UserStuffWrapper,
} from "../styles/Profile.module";
import {
  AllPinsWrapper,
  PinWrapper,
  PinImage,
  FilterTagLink as PinLink,
} from "../styles/Homepage.module";

function OtherUserProfile(props) {
  const [otherUserUid, setOtherUserUid] = useState("");
  const [otherUserData, setOtherUserData] = useState(null);
  const [otherUserPin, setOtherUserPin] = useState([]);
  const [myData, setMyData] = useState(null);
  const [myFollowingList, setMyFollowingList] = useState([]);
  const [otherUserFollowerList, setOtherUserFollowerList] = useState([]);
  const [isSelf, setIsSelf] = useState(false);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const getMyData = async (uid) => {
    if (!props.uid) {
      return;
    }

    const myDataRef = doc(props.db, "user", uid);
    const myDataDoc = await getDoc(myDataRef);
    setMyData(myDataDoc.data());
    setMyFollowingList(myDataDoc.data().following);
  };

  useEffect(() => {
    props.uid && getMyData(props.uid);
  }, [props.uid]);

  const getOtherUserUid = () => {
    const url = window.location.href;
    const decodeUrl = decodeURI(url);
    const lastSegment = decodeUrl.split("/").pop();

    setOtherUserUid(lastSegment);
  };

  useEffect(() => {
    getOtherUserUid();
  }, []);

  useEffect(() => {
    if (otherUserUid && props.uid && otherUserUid !== props.uid) {
      return;
    } else if (otherUserUid && props.uid && otherUserUid === props.uid) {
      setIsSelf(true);
      return;
    } else if (otherUserUid && !props.uid) {
      setIsSelf(true);
      return;
    }
  }, [otherUserUid, props.uid]);

  const getOtherUserData = async (otherId) => {
    if (!otherUserUid) {
      return;
    }

    const otherUserRef = doc(props.db, "user", otherId);
    const otherUserDoc = await getDoc(otherUserRef);
    setOtherUserData(otherUserDoc.data());
    setOtherUserFollowerList(otherUserDoc.data().follower);
  };

  useEffect(() => {
    otherUserUid && getOtherUserData(otherUserUid);
  }, [otherUserUid]);

  const getOtherUserPin = async (otherId) => {
    if (!otherUserUid) {
      return;
    }

    const otherUserPinRef = collection(props.db, "user", otherId, "pin");
    const otherUserPinData = await getDocs(otherUserPinRef);
    let otherUserAllPins = [];
    otherUserPinData.forEach((doc) => {
      otherUserAllPins.push({...doc.data()});
    });

    setOtherUserPin(otherUserAllPins);
  };

  useEffect(() => {
    otherUserUid && getOtherUserPin(otherUserUid);
  }, [otherUserUid]);

  const handleFollow = async () => {
    console.log("Follow !!");

    const myFollowingRef = doc(props.db, "user", props.uid);
    await updateDoc(myFollowingRef, {
      following: arrayUnion(otherUserUid),
    });

    const otherUserFollowerRef = doc(props.db, "user", otherUserUid);
    await updateDoc(otherUserFollowerRef, {
      follower: arrayUnion(props.uid),
    });

    setMyFollowingList((prev) => [...prev, otherUserUid]);
    setOtherUserFollowerList((prev) => [...prev, props.uid]);
  };

  const handleUnfollow = async () => {
    if (!props.uid) {
      console.log("not login");

      return;
    }
    console.log("Unfollow !!");

    const myFollowingRef = doc(props.db, "user", props.uid);
    await updateDoc(myFollowingRef, {
      following: arrayRemove(otherUserUid),
    });

    const otherUserFollowerRef = doc(props.db, "user", otherUserUid);
    await updateDoc(otherUserFollowerRef, {
      follower: arrayRemove(props.uid),
    });

    let clonedMyFollowingList = [...myFollowingList];
    const filteredMyList = clonedMyFollowingList.filter(
      (user) => user !== otherUserUid
    );
    setMyFollowingList(filteredMyList);

    let clonedOtherUserFollowerList = [...otherUserFollowerList];
    const filteredOtherUserList = clonedOtherUserFollowerList.filter(
      (user) => user !== props.uid
    );
    setOtherUserFollowerList(filteredOtherUserList);
  };

  return (
    <DarkBackgroundDisplay>
      {otherUserData && (
        <PorfileWrapper>
          <UserImage src={otherUserData.pic}></UserImage>
          <UserName>{otherUserData.name}</UserName>
          <ShowFollow>{otherUserData.following.length} following</ShowFollow>
          <ShowFollow>{otherUserFollowerList.length} follower</ShowFollow>
          <ButtonWrapper>
            {myData &&
            otherUserUid &&
            myFollowingList.includes(otherUserUid) ? (
              <UnFollowButton onClick={handleUnfollow}>Unfollow</UnFollowButton>
            ) : (
              // <FollowButton onClick={handleFollow} $self={isSelf}>
              <FollowButton
                onClick={() => {
                  isSelf ? "" : handleFollow();
                }}
                $self={isSelf}>
                Follow
              </FollowButton>
            )}
          </ButtonWrapper>
          <UserStuffWrapper>
            <AllPinsWrapper>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className='my-masonry-grid'
                columnClassName='my-masonry-grid_column'>
                {otherUserPin.length > 0 &&
                  otherUserPin.map((pin) => (
                    <PinLink key={uuid()} to={`/pin-detail/${pin.pinId}`}>
                      <PinWrapper>
                        <PinImage src={pin.pinImage} />
                      </PinWrapper>
                    </PinLink>
                  ))}
              </Masonry>
            </AllPinsWrapper>
          </UserStuffWrapper>
        </PorfileWrapper>
      )}
    </DarkBackgroundDisplay>
  );
}

export default OtherUserProfile;
