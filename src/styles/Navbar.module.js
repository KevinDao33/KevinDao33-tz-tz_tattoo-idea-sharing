import styled from "styled-components";
import Logo from "../icon/tztz-logo.png";
import NotifyIcon from "../icon/noti.png";
import NotifyIconMove from "../icon/noti-gif.gif";
import Photo from "../icon/profile.png";
import PhotoMove from "../icon/profile-gif.gif";

const NavbarBlank = styled.div`
  width: 100vw;
  height: 90px;

  @media (max-width: 1621px) {
    height: 85px;
  }
  @media (max-width: 962px) {
    height: 80px;
  }
  @media (max-width: 637px) {
    height: 70px;
  }
  @media (max-width: 500px) {
    height: 65px;
  }
  @media (max-width: 350px) {
    height: 55px;
  }
`;

const NavbarWrapper = styled.div`
  width: 100vw;
  height: 90px;
  position: absolute;
  top: 0;
  background-color: snow;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  position: fixed;
  z-index: 5000;

  @media (max-width: 1621px) {
    height: 85px;
  }
  @media (max-width: 962px) {
    height: 80px;
  }
  @media (max-width: 637px) {
    height: 70px;
  }
  @media (max-width: 500px) {
    height: 65px;
  }
  @media (max-width: 350px) {
    height: 55px;
  }
`;

const LogoWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  margin: auto 15px auto 40px;
  cursor: pointer;
  background: url(${Logo}) snow;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  transition: 0.4s;
  :hover {
    transform: scale(1.1);
  }
  @media (max-width: 1621px) {
    margin: auto 15px auto 35px;
    width: 70px;
    height: 70px;
  }
  @media (max-width: 962px) {
    margin: auto 15px auto 30px;
    width: 65px;
    height: 65px;
  }
  @media (max-width: 637px) {
    margin: auto 15px auto 25px;
    width: 60px;
    height: 60px;
  }
  @media (max-width: 500px) {
    margin: auto 15px auto 20px;
    width: 55px;
    height: 55px;
  }
  @media (max-width: 350px) {
    margin: auto 15px auto 15px;
    width: 45px;
    height: 45px;
  }
`;

const NavRightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NavLefttWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Searchbar = styled.input`
  width: 400px;
  height: 50px;
  border-radius: 10px;
  border: 1.5px solid #e3e0e0;
  background-color: snow;
  margin: auto 50px;
  padding-left: 20px;
  cursor: text;
  -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.2));
  font-size: 1.5rem;
  transition: 0.4s;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`;

const Notify = styled.div`
  width: 60px;
  height: 60px;
  margin: auto 30px auto 0;
  cursor: pointer;
  border-radius: 50px;
  background: ${(props) =>
    props.$isUnRead
      ? `url(${NotifyIconMove}) snow`
      : `url(${NotifyIcon}) snow`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: 140%;

  :hover {
    background: url(${NotifyIconMove}) snow;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 140%;
  }
  @media (max-width: 1621px) {
    margin: auto 10px auto 0;
    width: 65px;
    height: 65px;
  }
  @media (max-width: 962px) {
    margin: auto 10px auto 0;
    width: 60px;
    height: 60px;
  }
  @media (max-width: 637px) {
    margin: auto 10px auto 0;
    width: 55px;
    height: 55px;
  }
  @media (max-width: 500px) {
    margin: auto 10px auto 0;
    width: 50px;
    height: 50px;
  }
  @media (max-width: 350px) {
    margin: auto 10px auto 0;
    width: 40px;
    height: 40px;
  }
`;

const MemberPictureWrapper = styled.div`
  width: 60px;
  height: 60px;
  background-color: lightgray;
  border-radius: 50px;
  margin: auto 40px auto 0;
  cursor: pointer;
  background: url(${Photo}) snow;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 120%;

  :hover {
    background: url(${PhotoMove}) snow;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 120%;
  }
  @media (max-width: 1621px) {
    margin: auto 10px auto 0;
    width: 65px;
    height: 65px;
  }
  @media (max-width: 962px) {
    margin: auto 10px auto 0;
    width: 60px;
    height: 60px;
  }
  @media (max-width: 637px) {
    margin: auto 10px auto 0;
    width: 55px;
    height: 55px;
  }
  @media (max-width: 500px) {
    margin: auto 10px auto 0;
    width: 50px;
    height: 50px;
  }
  @media (max-width: 350px) {
    margin: auto 10px auto 0;
    width: 40px;
    height: 40px;
  }
`;

const AllNotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: ${(props) => (props.$showNoti ? "scroll" : "hidden")};
  transition: 0.4s;
  width: 400px;
  max-height: 550px;
  height: ${(props) => (props.$showNoti ? "auto" : "0px")};
  padding: 0;

  background-color: white;
  position: absolute;
  right: 30px;
  top: 90px;
  z-index: 1000;
  border-radius: 10px;
  border: ${(props) => (props.$showNoti ? "1px solid gray" : "none")};
`;

const NotificationTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 23px 0;
  background-color: lightgray;
  cursor: default;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid lightgray;
`;

const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  position: relative;
  cursor: pointer;
  border-bottom: 1px solid lightgray;
  transition: 0.4s;

  &:hover {
    background-color: #fffcf9;
  }
`;

const AuthorImageWrapper = styled.img`
  border-radius: 50px;
  width: 60px;
  height: 60px;
  border: 1px solid lightgray;
  margin: auto 15px auto 30px;
`;

const NotificationMessageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: auto 10px auto 0;

  color: black;
`;

const NotificationIsReadMark = styled.div`
  border-radius: 100px;
  background-color: coral;
  width: 15px;
  height: 14px;
  position: absolute;
  left: 10px;
  top: 10px;
`;

const NoNotification = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: auto auto auto 20px;

  color: black;
`;

const NavTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 29px;
  font-weight: 550;
  color: ${(props) => (props.$isPageNow ? "#dc762e" : "darkslategray")};
  margin: 0 15px;
  padding: 20px 5px 2px 5px;
  border-bottom: ${(props) =>
    props.$isPageNow ? "3px solid #dc762e" : "3px solid darkslategray"};
  transition: 0.4s;

  &:hover {
    transform: scale(1.1);
    color: #dc762e;
    border-bottom: 3px solid #dc762e;
    text-shadow: 4px 3px 0px #fff, 9px 8px 0px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1621px) {
    font-size: 27px;
    font-weight: 550;
  }
  @media (max-width: 962px) {
    font-size: 24px;
    font-weight: 550;
  }
  @media (max-width: 637px) {
    font-size: 22px;
    font-weight: 550;
  }
  @media (max-width: 500px) {
    font-size: 20px;
    font-weight: 500;
    margin: 0 10px;
    padding: 15px 5px 2px 5px;
  }
  @media (max-width: 430px) {
    font-size: 18px;
    font-weight: 500;
    margin: 0 5px;
    padding: 15px 2px 2px 2px;
  }
  @media (max-width: 370px) {
    font-size: 16px;
    font-weight: 200;
    margin: 0 5px 0 0;
    padding: 15px 0 2px 0;
  }
`;

export {
  NavbarBlank,
  NavbarWrapper,
  LogoWrapper,
  NavLefttWrapper,
  NavRightWrapper,
  Searchbar,
  Notify,
  MemberPictureWrapper,
  AllNotificationWrapper,
  NotificationTitle,
  NotificationWrapper,
  AuthorImageWrapper,
  NotificationMessageWrapper,
  NotificationIsReadMark,
  NoNotification,
  NavTitle,
};
