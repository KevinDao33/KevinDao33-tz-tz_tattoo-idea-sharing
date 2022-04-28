import styled from "styled-components";

const NavbarBlank = styled.div`
  width: 100vw;
  height: 100px;
`;

const NavbarWrapper = styled.div`
  width: 100vw;
  height: 100px;
  position: absolute;
  top: 0;
  background-color: snow;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  width: 70px;
  height: 70px;
  background-color: #8e8d8a;
  border-radius: 50px;
  margin: auto 15px auto 20px;
  cursor: pointer;
`;

const Searchbar = styled.input`
  width: calc(
    100% - 70px - 15px - 20px - 10px - 10px - 20px - 50px - 15px - 15px - 50px -
      15px - 15px
  );
  height: 50px;
  border-radius: 30px;
  border: 1.5px solid #e3e0e0;
  background-color: #e3e0e0;
  margin: auto 10px;
  padding-left: 20px;
  cursor: text;
  -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.2));
  font-size: 1.5rem;
`;

const Notify = styled.img`
  width: 50px;
  height: 50px;
  margin: auto 15px auto 15px;
  cursor: pointer;
`;

const MemberPictureWrapper = styled.img`
  width: 50px;
  height: 50px;
  background-color: lightgray;
  border-radius: 50px;
  margin: auto 15px auto 0;
  cursor: pointer;
`;

export {
  NavbarBlank,
  NavbarWrapper,
  LogoWrapper,
  Searchbar,
  Notify,
  MemberPictureWrapper,
};
