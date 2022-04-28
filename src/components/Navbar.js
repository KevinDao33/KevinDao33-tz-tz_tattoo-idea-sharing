import React from "react";
import { NavLink } from "react-router-dom";
import notifyIcon from "../icon/noti.png";
import photo from "../icon/profile.png";
import {
  NavbarBlank,
  NavbarWrapper,
  LogoWrapper,
  Searchbar,
  Notify,
  MemberPictureWrapper,
} from "../styles/Navbar.module";

function Navbar() {
  return (
    <>
      <NavbarBlank />
      <NavbarWrapper>
        <NavLink to='/'>
          <LogoWrapper />
        </NavLink>
        <Searchbar />
        <Notify src={notifyIcon} />
        <NavLink to='/profile'>
          <MemberPictureWrapper src={photo} />
        </NavLink>
      </NavbarWrapper>
    </>
  );
}

export default Navbar;
