import React from "react";
import {NavLink} from "react-router-dom";
import {
  NavbarBlank,
  NavbarWrapper,
  LogoWrapper,
  NavRightWrapper,
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

        <NavRightWrapper>
          <Searchbar placeholder="Search" />
          <Notify />
          <NavLink to='/profile'>
            <MemberPictureWrapper />
          </NavLink>
        </NavRightWrapper>

      </NavbarWrapper>
    </>
  );
}

export default Navbar;
