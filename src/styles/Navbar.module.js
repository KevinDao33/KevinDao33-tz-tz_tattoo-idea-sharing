import styled from "styled-components";
import Logo from "../icon/tztz-logo.png";
import NotifyIcon from "../icon/noti.png";
import NotifyIconMove from "../icon/noti-gif.gif";
import Photo from "../icon/profile.png";
import PhotoMove from "../icon/profile-gif.gif";

const NavbarBlank = styled.div`
  width: 100vw;
  height: 100px;
`;

const NavbarWrapper = styled.div`
  width: 100vw;
  height: 110px;
  position: absolute;
  top: 0;
  background-color: rgb(39, 39, 39, 0.9);;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
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
`;

const NavRightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
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
  background: url(${NotifyIcon}) snow;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;

  :hover {
    background: url(${NotifyIconMove}) snow;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80%;
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
  background-size: 80%;

  :hover {
    background: url(${PhotoMove}) snow;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80%;
  }
`;

export {
  NavbarBlank,
  NavbarWrapper,
  LogoWrapper,
  NavRightWrapper,
  Searchbar,
  Notify,
  MemberPictureWrapper,
};
