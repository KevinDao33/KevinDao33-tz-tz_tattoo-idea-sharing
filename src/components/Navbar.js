/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";

import {
  NavbarBlank,
  NavbarWrapper,
  LogoWrapper,
  NavRightWrapper,
  Notify,
  MemberPictureWrapper,
  AllNotificationWrapper,
  NotificationTitle,
  NotificationWrapper,
  AuthorImageWrapper,
  NotificationMessageWrapper,
  NotificationIsReadMark,
} from "../styles/Navbar.module";
import {async} from "@firebase/util";

function Navbar(props) {
  const [isShowNotification, setIsShowNotofication] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [isUnRead, setIsUnRead] = useState(false);

  const redirect = useNavigate();

  const handleIsShowNotification = () => {
    setIsShowNotofication((prev) => !prev);
  };

  const listen2NewNotification = async () => {
    const allNotificationDataRef = query(
      collection(props.db, "user", props.uid, "notification"),
      orderBy("timeStamp")
    );

    const allNotificationData = onSnapshot(
      allNotificationDataRef,
      (querySnapshot) => {
        let allNotifications = [];
        querySnapshot.forEach((doc) => {
          allNotifications.push(doc.data());
        });

        setNotificationData(allNotifications.reverse());
      }
    );
  };

  useEffect(() => {
    props.uid && listen2NewNotification();
  }, [props.uid]);

  const upDateNotificationIsRead = async (notiId) => {
    const allNotificationDataRef = doc(
      props.db,
      "user",
      props.uid,
      "notification",
      notiId
    );
    await updateDoc(allNotificationDataRef, {
      isRead: true,
    });
    setNotificationData((prev) => [...prev, {isRead: true}]);
  };

  useEffect(() => {
    notificationData.length > 0 &&
      notificationData.map((noti) => {
        !noti.isRead && setIsUnRead(true);
      });
  }, [notificationData]);

  return (
    <>
      <NavbarBlank />
      <NavbarWrapper>
        <NavLink to='/'>
          <LogoWrapper />
        </NavLink>

        <NavRightWrapper>
          <Notify onClick={handleIsShowNotification} $isUnRead={isUnRead} />
          <NavLink to='/profile'>
            <MemberPictureWrapper />
          </NavLink>

          <AllNotificationWrapper $showNoti={isShowNotification}>
            <NotificationTitle>Notifications</NotificationTitle>
            {notificationData.length > 0 ? (
              notificationData.map((noti) => (
                <NotificationWrapper
                  id='NotificationWrapper'
                  key={noti.pinId}
                  onClick={async () => {
                    !noti.isRead &&
                      (await upDateNotificationIsRead(noti.notificationId));

                    redirect(`/pin-detail/${noti.pinId}`);
                  }}>
                  <AuthorImageWrapper src={noti.authorPic} />
                  <NotificationMessageWrapper>
                    {`${noti.authorName} just created a new pin`}
                  </NotificationMessageWrapper>
                  {noti.isRead ? <></> : <NotificationIsReadMark />}
                </NotificationWrapper>
              ))
            ) : (
              <NotificationWrapper>
                <NotificationMessageWrapper>
                  No Notification :)
                </NotificationMessageWrapper>
              </NotificationWrapper>
            )}

            {/* ==================== */}
          </AllNotificationWrapper>
        </NavRightWrapper>
      </NavbarWrapper>
    </>
  );
}

export default Navbar;
