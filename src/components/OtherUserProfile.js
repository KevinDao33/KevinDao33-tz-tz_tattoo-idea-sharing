import {useEffect, useState} from "react";
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
import PropTypes from "prop-types";

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

function OtherUserProfile({db, uid}) {
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
    if (!uid) {
      return;
    }

    const myDataRef = doc(db, "user", uid);
    const myDataDoc = await getDoc(myDataRef);
    setMyData(myDataDoc.data());
    setMyFollowingList(myDataDoc.data().following);
  };

  useEffect(() => {
    uid && getMyData(uid);
  }, [uid]);

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
    if (otherUserUid && uid && otherUserUid !== uid) {
      return;
    } else if (otherUserUid && uid && otherUserUid === uid) {
      setIsSelf(true);
      return;
    } else if (otherUserUid && !uid) {
      setIsSelf(true);
      return;
    }
  }, [otherUserUid, uid]);

  const getOtherUserData = async (otherId) => {
    if (!otherUserUid) {
      return;
    }

    const otherUserRef = doc(db, "user", otherId);
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

    const otherUserPinRef = collection(db, "user", otherId, "pin");
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
    const myFollowingRef = doc(db, "user", uid);
    await updateDoc(myFollowingRef, {
      following: arrayUnion(otherUserUid),
    });

    const otherUserFollowerRef = doc(db, "user", otherUserUid);
    await updateDoc(otherUserFollowerRef, {
      follower: arrayUnion(uid),
    });

    setMyFollowingList((prev) => [...prev, otherUserUid]);
    setOtherUserFollowerList((prev) => [...prev, uid]);
  };

  const handleUnfollow = async () => {
    if (!uid) {
      return;
    }

    const myFollowingRef = doc(db, "user", uid);
    await updateDoc(myFollowingRef, {
      following: arrayRemove(otherUserUid),
    });

    const otherUserFollowerRef = doc(db, "user", otherUserUid);
    await updateDoc(otherUserFollowerRef, {
      follower: arrayRemove(uid),
    });

    let clonedMyFollowingList = [...myFollowingList];
    const filteredMyList = clonedMyFollowingList.filter(
      (user) => user !== otherUserUid
    );
    setMyFollowingList(filteredMyList);

    let clonedOtherUserFollowerList = [...otherUserFollowerList];
    const filteredOtherUserList = clonedOtherUserFollowerList.filter(
      (user) => user !== uid
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

OtherUserProfile.propTypes = {
  db: PropTypes.object,
  uid: PropTypes.string,
};

export default OtherUserProfile;
