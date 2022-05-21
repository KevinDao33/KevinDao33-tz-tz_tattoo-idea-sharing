import {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import Masonry from "react-masonry-css";
import PropTypes from "prop-types";
import api from "../util/api";

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

function OtherUserProfile({uid}) {
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

  const handleMyData = (data) => {
    setMyData(data);
    setMyFollowingList(data.following);
  };

  useEffect(() => {
    uid && api.getUserData(uid, handleMyData);
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

  const handleOtherUserData = (data) => {
    setOtherUserData(data);
    setOtherUserFollowerList(data.follower);

    console.log("1", data);
    console.log("2", data.follower);
  };

  useEffect(() => {
    otherUserUid && api.getUserData(otherUserUid, handleOtherUserData);
  }, [otherUserUid]);

  useEffect(() => {
    otherUserUid && api.gitUserPins(otherUserUid, setOtherUserPin);
  }, [otherUserUid]);

  const handleFollow = async () => {
    api.handleMyNewFollowing(uid, otherUserUid);
    api.handleOtherUserNewFollower(uid, otherUserUid);

    setMyFollowingList((prev) => [...prev, otherUserUid]);
    setOtherUserFollowerList((prev) => [...prev, uid]);
  };

  const handleUnfollow = async () => {
    if (!uid) {
      return;
    }

    api.removeFromMyFollowing(uid, otherUserUid);
    api.removeFromOtherUserFollower(uid, otherUserUid);

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
  uid: PropTypes.string,
};

export default OtherUserProfile;
