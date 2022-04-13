import React from "react";
import { NavLink } from "react-router-dom";
import chatIcon from "../icon/chat-icon.png";
import {
  NavbarBlank,
  NavbarWrapper,
  LogoWrapper,
  Searchbar,
  Chat,
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
        <Chat src={chatIcon} />
        <NavLink to='/profile'>
          <MemberPictureWrapper />
        </NavLink>
      </NavbarWrapper>
    </>
  );
}

export default Navbar;
